import "./BoxResults.css";
import Card from "../card/card";
import CardImage from "../cardimage/cardimage";
import { numberWithCommas } from "../../utils/function";
import LittleFilter from "./filter/filter";
import SideFilter from "./SideFilter";
import TrendsFilter from "./TrendsFilter";
import ReactLoading from "react-loading";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  goBack,
  selectPage,
  showResults,
} from "../../Redux/slices/navigationSlice";
import {
  loadItems,
  selectLoading,
  selectBoxes,
  selectFilteredResults,
  selectPageType,
} from "../../Redux/slices/azelis/azelisSlice";
import useLoadSection from "../../utils/hooks/useLoadSection";

export default function BoxResults({}) {
  const dispatch = useDispatch();
  const section = useSelector(selectPage);

  const filterBoxes = useSelector(selectBoxes);

  const results = useSelector(selectFilteredResults);
  const loadState = useSelector(selectLoading);
  const pageType = useSelector(selectPageType);

  const useImageCard = results.some((result) => result?.thumbnail);

  useLoadSection();

  const moveTopSearch = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div>
        <div className="box-results-main">
          <div className="d-flex align-items-center justify-content-between btn-area">
            <div className="d-flex align-items-center results-btn">
              <button
                className="results-back"
                onClick={() => {
                  if (pageType === "oneStage") dispatch(goBack());
                  else dispatch(showResults(false));
                }}
              >
                <i
                  className="fa fa-chevron-left"
                  style={{ fontSize: "12px" }}
                ></i>{" "}
                Back to search
              </button>
              <div>{section !== "Trends" && <LittleFilter />}</div>
            </div>
            <div className="d-flex align-items-center selection-btn">
              <span className="number-result-box-tag">Current Selection</span>{" "}
              &nbsp;
              <a className="number-result-box-results">
                {loadState.data === "fulfilled"
                  ? numberWithCommas(results.length)
                  : ""}
                &nbsp; results
              </a>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 order-1 order-lg-1 left-box-results">
              {pageType === "twoStage" ? (
                <SideFilter filterBoxes={filterBoxes} />
              ) : (
                <TrendsFilter />
              )}
            </div>
            <div
              className="col-lg-9  order-2 order-lg-2 mb-5 mb-lg-0 right-box-results"
              style={{ paddingLeft: "40px", paddingTop: "20px" }}
            >
              <div className="row">
                {loadState.data === "fulfilled" ? (
                  results.map((result, i) =>
                    useImageCard ? (
                      <CardImage
                        item={result}
                        key={result.id.toString() + result.title}
                      />
                    ) : (
                      <Card item={result} key={result.id + i.toString()} />
                    )
                  )
                ) : (
                  <>
                    <div className="box-results-loading-container">
                      <ReactLoading type="spin" color="#59b8ec" />
                    </div>
                  </>
                )}
              </div>
              <Button
                variant="primary"
                size="sm"
                className="back-to-top-btn"
                onClick={moveTopSearch}
              >
                Back To Top
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
