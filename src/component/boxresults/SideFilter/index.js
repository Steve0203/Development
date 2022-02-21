import React, { useState, useEffect, useMemo } from "react";

import "./checkbox.css";
import { CheckLine } from "./../../boxtype/boxtype";
import { Accordion } from "../../util/Accordion";

export default function SideFilter({ filterBoxes }) {
  const accordionItems = useMemo(() => {
    if (!filterBoxes.length) return [];

    const termToCheckLine = (term) => (
      <CheckLine
        key={term.slug}
        style={{ padding: "0 1.25rem" }}
        slug={term.slug}
        taxonomy={term.taxonomy}
        checked={term.checked}
        name={term.name}
        count={term.count}
      />
    );

    return filterBoxes.map((filterBox) => {
      const checked = filterBox.terms.filter((term) => term.checked);
      const unchecked = filterBox.terms.filter((term) => !term.checked);

      return {
        key: filterBox.name,
        header: `${filterBox.name} (${filterBox.terms.length})`,
        body: (
          <div style={{ paddingBottom: unchecked.length ? "30px" : "0px" }}>
            {unchecked.map(termToCheckLine)}
          </div>
        ),
        alwaysBody: (
          <div style={{ paddingBottom: checked.length ? "30px" : "0px" }}>
            {checked.map(termToCheckLine)}
          </div>
        ),
        expandable: Boolean(unchecked.length),
      };
    });
  }, [filterBoxes]);

  if (!accordionItems?.length) return null;
  return (
    <div style={{ marginTop: "20px" }}>
      <Accordion items={accordionItems} />
    </div>
  );
}
