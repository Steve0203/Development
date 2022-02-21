import "./menu.css"
import { useDispatch, useSelector } from "react-redux";
import { selectAllTerms, selectFilters, setFilterExclusive } from "../../../Redux/slices/azelis/azelisSlice";
import { selectPage } from "../../../Redux/slices/navigationSlice";

function MenuTrend() {
  const terms = useSelector(selectAllTerms);
  const filters = useSelector(selectFilters);
  const section = useSelector(selectPage);
  const dispatch = useDispatch();

  console.log(terms);

  const clickHandler = async (term) => {
    dispatch(setFilterExclusive({
      termSlug: term.slug,
      slug: section,
      taxonomy: term.taxonomy_label
    }))
  }

  const isActive = (termSlug) => Object.values(filters).some(filterList => filterList.includes(termSlug))

  return (
    <div className="menu-box">
      {/* {Boolean(terms.length) && ( */}
      {/*   <p */}
      {/*     className={`text-menu ${activeTerm === -1 ? 'menu-text-active' : ''}`} */}
      {/*     onClick={() => clickHandler(-1)} */}
      {/*   > */}
      {/*     All Trends */}
      {/*   </p> */}
      {/* )} */}
      {terms.map((term, i) => (
        <p
          className={`text-menu ${isActive(term.slug) ? 'menu-text-active' : ''}`}
          key={term}
          onClick={() => clickHandler(term)}
        >
          {term.name}
        </p>
      ))}
    </div>
  )
}

export default MenuTrend
