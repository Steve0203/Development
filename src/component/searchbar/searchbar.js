import React, { createRef, useEffect, useState } from "react"
import "./searchbar.css"
import { useDispatch, useSelector } from 'react-redux'
import { doSearch } from '../../Redux/globalActions'
import { setSearchBox, selectSearch } from '../../Redux/slices/azelis/azelisSlice'

function Topresult({ from, list, all, text, helper = false }) {
  return (
    <div>
      <span className="top-result-found">Top results found from {from}</span>
      <hr style={{ margin: 0 }} />
      <div style={{ padding: "5px" }}>
        {all ? (
          <span className="all-result-from">All results for "{text}"</span>
        ) : (
          ""
        )}
        {list.map((e, i) => (
          <div
            key={e}
            onMouseDown={() => console.log(e)}
            className="text-top-result"
          >
            {e}
            &nbsp;
            {helper ? <span className="little-helper">little helper</span> : ""}
          </div>
        ))}
      </div>
    </div>
  )
}
function Searchbar() {
  const dispatch = useDispatch();

  const query = useSelector(selectSearch);
  const [localQuery, setLocalQuery] = useState(query);

  const handleSubmit = (evt) => {
    evt.preventDefault()

    dispatch(doSearch(localQuery))
  }

  useEffect(() => {
    if (query !== localQuery) setLocalQuery(query);
  }, [query]);
  return (
    <div>
      <div className="search-main">
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Search Keyword, Tradename, INCI"
            type="text"
            className="searchbar-text"
            onChange={(e) => { setLocalQuery(e.target.value) }}
            value={localQuery}
          />
          <button
            type="submit"
            className="search-buttonsearch"
          >
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>

      {/* <div */}
      {/*   id="sodjlf" */}
      {/*   tabIndex="0" */}
      {/*   ref={focusDiv} */}
      {/*   className="box-result-search" */}
      {/*   hidden={!boxVisible} */}
      {/* > */}
      {/*   <Topresult */}
      {/*     from="Formulas" */}
      {/*     list={["Hair cut", "Hair shop", "Hair ser", "hd kdo"]} */}
      {/*     text={itemSearch} */}
      {/*   /> */}

      {/*   <Topresult */}
      {/*     from="Ingredients" */}
      {/*     list={["Hair cut", "Hair shop", "Hair ser", "hd kdo"]} */}
      {/*     text={itemSearch} */}
      {/*     all={true} */}
      {/*     helper={true} */}
      {/*   /> */}

      {/*   <Topresult */}
      {/*     from="Trends" */}
      {/*     list={["Hair cut", "Hair shop", "Hair ser", "hd kdo"]} */}
      {/*     text={itemSearch} */}
      {/*     all={true} */}
      {/*   /> */}
      {/* </div> */}
    </div>
  )
}

export default Searchbar
