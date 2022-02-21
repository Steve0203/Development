import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { goTo, doSearch, resetFilter } from '../../globalActions'
import Api from '../../api'
import Fuse from 'fuse.js';

import boxes from './boxes.js'

export const initStore = createAsyncThunk('/azelis/initStoreStatus', async () => {
  const api = new Api();
  const res = await api.getProfiles()

  return res.data;
})

export const loadItems = createAsyncThunk('/azelis/loadItemsStatus', async (_args, thunkAPI) => {
  const api = new Api();
  const slug = thunkAPI.getState().navigation.page;

  const res = await api.getItems(slug);

  return {
    data: res.data,
    slug
  }
})

export const loadFilterData = createAsyncThunk('/azelis/loadFilterDataStatus', async (_args, thunkAPI) => {
  const api = new Api();
  const slug = thunkAPI.getState().navigation.page;

  const res = await api.initFilters(slug);

  return {
    data: res.data,
    slug
  }
})

const resetFilterBase = (state) => {
  for (const dataSet of Object.values(state.categories)) {
    for (const filter in dataSet.filters) {
      dataSet.filters[filter] = [];
    }
  }

  state.search = "";
}

const azelisSlice = createSlice({
  name: 'azelis',
  initialState: {
    categories: {},
    // product: {
    //   data: [],
    //   filters: boxes.product.reduce((filters, box) => {
    //     filters[box.taxonomy] = [];
    //     return filters;
    //   }, {}),
    //   loading: {
    //     filters: null,
    //     data: null
    //   },
    // },
    search: ""
  },
  reducers: {
    toggleFilter: (state, action) => {
      if (!state.categories[action.payload.slug].filters.hasOwnProperty(action.payload.taxonomy)) {
        state.categories[action.payload.slug].filters[action.payload.taxonomy] = [];
      }

      const filterList = state.categories[action.payload.slug].filters[action.payload.taxonomy];
      const filterIndex = filterList.findIndex(filter => filter === action.payload.termSlug);

      if (filterIndex !== -1) filterList.splice(filterIndex, 1)
      else filterList.push(action.payload.termSlug)
    },
    setFilterExclusive: (state, action) => {
      if (state.categories[action.payload.slug].filters.hasOwnProperty(action.payload.taxonomy) && state.categories[action.payload.slug].filters[action.payload.taxonomy].includes(action.payload.termSlug)) {
        return;
      }
      for (const filterKey of Object.keys(state.categories[action.payload.slug].filters)) {
        delete state.categories[action.payload.slug].filters[filterKey];
      }
      state.categories[action.payload.slug].filters[action.payload.taxonomy] = [action.payload.termSlug];
    },
    setLoad: (state, action) => {
      if (!['formulations', 'product'].includes(action.payload.slug)) return;
      state[action.payload.slug].loading = action.payload.loading;
    },
    setSearchBox: (state, action) => {
      state.search = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loadItems.fulfilled, (state, action) => {
      const { data, slug } = action.payload;
      for (const item of data) {
        const internalItemIndex = state.categories[slug].data.findIndex(internalItem => internalItem.id === item.id)

        if (internalItemIndex === -1) state.categories[slug].data.push(item);
        else state.categories[slug].data.splice(internalItemIndex, 1, {
          ...state.categories[slug].data[internalItemIndex],
          ...item
        })
      }
      state.categories[slug].loading.data = 'fulfilled';
    })
    // builder.addCase(goTo, resetFilterBase)
    builder.addCase(resetFilter, resetFilterBase)
    builder.addCase(doSearch, (state, action) => {
      state.search = action.payload
    })
    builder.addCase(loadFilterData.fulfilled, (state, action) => {
      const { slug, data } = action.payload;
      state.categories[slug].data = data;
      state.categories[slug].loading.filters = 'loaded';
    })
    builder.addCase(initStore.fulfilled, (state, action) => {
      for (const [label, slug] of Object.entries(action.payload.post_types)) {
        state.categories[slug] = {
          label,
          data: [],
          filters: {},
          taxonomies: [... new Set(action.payload.taxonomies[slug])],
          displayType: action.payload.taxonomies[slug].length === 1
            ? 'oneStage'
            : 'twoStage',
          loading: {
            filters: null,
            data: null
          }
        }
      }
    })
  }
})

export default azelisSlice.reducer
export const { setSearchBox, setLoad, toggleFilter, setFilterExclusive } = azelisSlice.actions

export const selectTabs = (state) => {
  return Object.entries(state.azelis.categories).map(([slug, slugData]) => ({
    slug,
    label: slugData.label
  }))
}
export const selectTaxonomies = (state) => {
  const slug = state.navigation.page;
  if (!state.azelis.categories.hasOwnProperty(slug)) return [];

  return state.azelis.categories[slug]?.taxonomies || [];
}

export const selectPageType = (state) => {
  const slug = state.navigation.page;
  if (!slug) return null;

  return state.azelis.categories[slug].displayType;
}
export const selectResults = (state) => {
  const slug = state.navigation.page;
  if (!slug) return [];

  return state.azelis.categories[slug].data;
}
export const selectFilters = (state) => {
  const slug = state.navigation.page;
  if (!slug) return {}

  return state.azelis.categories[slug].filters;
}
export const selectSearch = (state) => state.azelis.search;
export const selectLoading = (state) => {
  const slug = state.navigation.page;
  if (!slug) return {
    filters: 'pending',
    data: 'pending'
  };

  return state.azelis.categories[slug].loading;
}

export const selectFilteredResults = (state) => {
  const slug = state.navigation.page;
  const slugData = state.azelis.categories[slug];

  const baseFiltered =
    slugData.data.filter(item => (
      Object.entries(state.azelis.categories[slug].filters).every(([taxonomy, filterArray]) => (
        filterArray.some(filter => item.tags.some(tag => tag.taxonomy_label === taxonomy && tag.slug === filter)) || !filterArray.length
      ))
    ))

  if (!(state.navigation.isSearching && state.navigation.atResults)) return baseFiltered;
  if (!state.azelis.search.length) return baseFiltered;

  const searchQuery = state.azelis.search;
  const searchKeys =
    [
      {
        name: "title",
        weight: 0.6
      },
      {
        name: "body",
        weight: 0.4
      },
    ]

  const searchOptions = {
    keys: searchKeys,
    threshold: 0.4
  }

  const searchInstance = new Fuse(baseFiltered, searchOptions);
  const searchResults = searchInstance.search(searchQuery)

  return searchResults.map(result => result.item);
}

const selectBoxesFunction = (dynamicTaxonomies, itemsData, globallyFilteredItems, filters) => {
  if (!dynamicTaxonomies.length) return {};

  const output = dynamicTaxonomies.reduce((boxes, box) => {
    boxes[box.label] = {
      taxonomy: box.name,
      name: box.label,
      terms: []
    }
    return boxes;
  }, {});

  const taxonomies = dynamicTaxonomies.map(dynamicTaxonomy => dynamicTaxonomy.label);

  for (const taxonomy of taxonomies) {
    const itemFilters = filters.hasOwnProperty(taxonomy) ? filters[taxonomy] : [];
    const otherFilters = Object.entries(filters).filter(([filterTaxonomy]) => filterTaxonomy !== taxonomy);

    const filteredItems = itemsData.filter(item => (
      otherFilters.every(([filterTaxonomy, filterArray]) => (
        !filterArray.length || filterArray.every(filter => (
          item.tags
            ? item.tags.some(tag => (
              tag.slug === filter && tag.taxonomy_label === filterTaxonomy
            ))
            : true
        ))
      ))
    ))

    const tagSlugs = new Set();
    for (const item of filteredItems) {
      for (const tag of item?.tags || []) {
        if (tag.taxonomy_label !== taxonomy) continue;
        if (!tag.name || !tag.slug) continue;
        if (tagSlugs.has(tag.slug)) {
          continue;
        }

        tagSlugs.add(tag.slug);

        const count = globallyFilteredItems.filter(item => item.tags.some(itemTag =>
          itemTag.slug === tag.slug && itemTag.taxonomy_label === tag.taxonomy_label
        )).length

        output[taxonomy].terms.push({
          name: tag.name.replace('&amp;', '&'),
          slug: tag.slug,
          count,
          checked: itemFilters.includes(tag.slug),
          taxonomy: taxonomy
        })
      }
    }
  }

  return Object.values(output).map(box => {
    const boxCopy = { ...box };
    boxCopy.terms.sort((a, b) => a.name.localeCompare(b.name));
    return boxCopy;
  })
}

export const selectAllTerms = (state) => {
  const slug = state.navigation.page;
  if (!state.azelis.categories.hasOwnProperty(slug)) return [];

  const output = [];
  for (const item of state.azelis.categories[slug].data) {
    for (const tag of item.tags) {
      if (!output.some(outputTag => outputTag.slug === tag.slug && outputTag.taxonomy_label === tag.taxonomy_label)) {
        output.push(tag);
      }
    }
  }

  return output;
}
export const selectBoxes = createSelector([selectTaxonomies, selectResults, selectFilteredResults, selectFilters], selectBoxesFunction)
// export const selectFormulationBoxes = createSelector(
//   [selectFormulations, selectFilteredFormulations, selectFormulationsFilters],
//   selectBoxesFunction(boxes.formulations)
// )
