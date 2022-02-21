import React, { useEffect, useMemo, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import useWindowSize from "../../hooks/useWindowSize";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import "./index.css";
import { numberWithCommas } from "../../utils/function";
import Boxtype from "../boxtype/boxtype";
import { useSelector, useDispatch } from "react-redux";
import {
  selectLoading,
  selectBoxes,
  selectFilteredResults,
} from "../../Redux/slices/azelis/azelisSlice";
import { selectPage, showResults } from "../../Redux/slices/navigationSlice";
import { resetFilter } from "../../Redux/globalActions";
import useLoadSection from "../../utils/hooks/useLoadSection";

// Import Swiper styles

SwiperCore.use([Pagination, Navigation]);

function FormulasBoxFilter() {
  const boxes = useSelector(selectBoxes);
  const section = useSelector(selectPage);

  const totalCount = useSelector(selectFilteredResults)?.length || 0;

  const dispatch = useDispatch();
  const loadingState = useSelector(selectLoading);

  useLoadSection();

  const size = useWindowSize();
  const [breakPoints, setBreakPoints] = useState(4);

  useEffect(() => {
    if (!size) return;
    if (size.width > 1000) {
      setBreakPoints(4);
    } else if (size.width > 768) {
      setBreakPoints(3);
    } else if (size.width > 600) {
      setBreakPoints(2);
    } else {
      setBreakPoints(1);
    }
  }, [size]);

  const SwiperSlides = useMemo(() => {
    return boxes.map((filterBox, i) => (
      <SwiperSlide key={`${section}-${i}`}>
        <Boxtype
          label={filterBox.name}
          terms={filterBox.terms}
          key={filterBox.name}
          isLoading={loadingState.filters !== "loaded"}
        />
      </SwiperSlide>
    ));
  }, [boxes, loadingState, breakPoints]);

  return (
    <div>
      <div>
        <div className="box-number-result">
          <div>
            <a
              className="reset-button"
              onClick={() => {
                dispatch(resetFilter());
              }}
              style={{ fontFamily: "MuseoSans-500" }}
            >
              Reset
            </a>
            <button
              className="button-result"
              onClick={() => {
                dispatch(showResults(true));
              }}
            >
              <span className="view-result-text">View Results</span>
            </button>
          </div>
          <div className="mt-2">
            <span className="box-number-result-span number-result-box-tag">
              Current Selection
            </span>{" "}
            <a className="link-number-result">
              {totalCount ? numberWithCommas(totalCount) : "..."} results{" "}
            </a>
          </div>
        </div>

        {loadingState.filters === "loaded" && Boolean(SwiperSlides.length) ? (
          <Swiper
            spaceBetween={30}
            navigation={true}
            observer={true}
            slidesPerView={breakPoints}
            key={`swiper-${section}`}
          >
            {SwiperSlides}
          </Swiper>
        ) : (
          <div className="d-flex align-items-center" style={{ height: "70vh" }}>
            <Spinner
              animation="border"
              role="status"
              style={{ margin: "auto" }}
              variant="primary"
              size="lg"
            >
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  slideContainer: {
    display: "flex",
    gap: "30px",
    marginBottom: "15px",
  },
};

export default FormulasBoxFilter;
