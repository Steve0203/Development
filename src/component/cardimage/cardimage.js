import "./cardimage.css";
import { makeShorter } from "../../utils/function";

export default function CardImage(e) {
  return (
    <div className="col-md-4 col-sm-12" style={{ marginBottom: "30px" }}>
      <a
        href={e.item.url}
        target="_blank"
        rel="noreferrer"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div
          className="main-card"
          style={{ height: "300px", marginRight: "5px" }}
        >
          <div
            className="card-image"
            style={{ backgroundImage: "url(" + e.item.thumbnail + ")" }}
          ></div>
          <div className="card-content">
            <div className="card-title">{e.item.title}</div>
            <div className="card-inci">{makeShorter(e.item.inci, 60)}</div>
            <div className="card-des">{makeShorter(e.item.body, 120)}</div>
          </div>
        </div>
      </a>
    </div>
  );
}
