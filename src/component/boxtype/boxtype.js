import React, { useRef } from "react";
import "./boxtype.css";
import { numberWithCommas, pageToSlug } from "../../utils/function";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleFilter } from "../../Redux/slices/azelis/azelisSlice";
import { selectPage } from "../../Redux/slices/navigationSlice";

export function CheckLineLittle({
  style,
  slug,
  taxonomy,
  checked,
  name,
  count,
}) {
  const dispatch = useDispatch();

  const section = useSelector(selectPage);

  const handleChange = () => {
    dispatch(
      toggleFilter({
        taxonomy,
        termSlug: slug,
        slug: section,
      })
    );
    return null;
  };

  return (
    <div className="checkline-main" style={style}>
      <div className="checkline-left-container">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          className="checkline-checkbox"
        />
        <span className="checkline-name-product">{name}</span>
      </div>
      <span className="checkline-number-result">
        {" "}
        ({numberWithCommas(count)})
      </span>
    </div>
  );
}
export function CheckLine({ style, name, count, checked, slug, taxonomy }) {
  const dispatch = useDispatch();

  const section = useSelector(selectPage);

  const handleChange = () => {
    dispatch(
      toggleFilter({
        termSlug: slug,
        taxonomy: taxonomy,
        slug: section,
      })
    );
  };

  return (
    <div className="checkline-main" style={style}>
      <div className="checkline-left-container">
        <input
          checked={checked}
          onChange={handleChange}
          type="checkbox"
          className="checkline-checkbox"
          id={slug}
        />
        <label htmlFor={slug} className="checkline-name-product">
          {name}
        </label>
      </div>
      <span className="checkline-number-result">
        {" "}
        ({numberWithCommas(count)})
      </span>
    </div>
  );
}

function Boxtype({ label, terms, isLoading }) {
  return (
    <div
      className="boxtype-main"
      style={
        !isLoading && !terms?.length
          ? {
              border: "2px solid gray",
              opacity: "60%",
            }
          : {}
      }
    >
      <div className="boxtype-body">
        <div className="boxtype-header">{label}</div>
        {isLoading ? (
          <div style={{ paddingTop: "10px" }}>
            <Skeleton count={15} style={{ marginTop: "5px" }} />
          </div>
        ) : (
          terms.map((term) => (
            <CheckLine
              key={term.slug}
              slug={term.slug}
              taxonomy={term.taxonomy}
              checked={term.checked}
              name={term.name}
              count={term.count}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Boxtype;
