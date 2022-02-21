import { makeShorter } from "../../utils/function";
import styles from "./card.module.css";

export default function Card(e) {
  return (
    <div className="col-md-4 col-sm-12" style={{ marginBottom: "30px" }}>
      <a
        href={e.item.url}
        target="_blank"
        rel="noreferrer"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div
          className={styles["main-card"]}
          style={{ height: "150px", marginRight: "5px" }}
        >
          <div className={styles["header-card"]}>{e.item.title}</div>
          <div className={styles["card-des"]}>
            {makeShorter(e.item.body.replace(e.item.title, ""), 170)}
          </div>
        </div>
      </a>
    </div>
  );
}
