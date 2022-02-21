import React from "react"
import "./loading.css"

export default function requestloader({ loaderActive }) {
  return (
    <>
      <div
        hidden={loaderActive === false}
        style={{
          top: "30%",
          left: 0,
          right: "-0.1%",
          position: "fixed",
          zIndex: 999,
        }}
      >
        <div className="requestloader"></div>
      </div>
    </>
  )
}
