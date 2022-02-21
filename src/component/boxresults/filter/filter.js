import { useDispatch } from "react-redux";
import { resetFilter } from "../../../Redux/globalActions";
import "./filter.css";

function Badge({ name, close }) {
  return (
    <div className="badge-body-filter">
      <pre style={{ marginTop: "revert", fontFamily: "MuseoSans-500" }}>
        {name}
      </pre>
      <i
        style={{ paddingLeft: "10px", marginTop: "-2px", cursor: "pointer" }}
        onClick={() => close(name)}
        className="fa fa-times"
      ></i>
    </div>
  );
}
export default function Filter({ list, onClose, on_click_reset_filter }) {
  const dispatch = useDispatch();

  return (
    <div className="little-filter-main">
      <div
        onClick={() => {
          dispatch(resetFilter());
        }}
        className="filter-reset-button"
      >
        Reset
      </div>
    </div>
  );
}
