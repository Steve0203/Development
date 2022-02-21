export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const makeShorter = (item, character) => {
  let ellipsis2 = " ...";
  let description = "";
  if (item.length > character) {
    const words = item.split(" ");
    let index = 0;
    while (description.length < character) {
      description += words[index] + " ";
      index++;
    }
    return description + ellipsis2;
  }

  return item;
};

export const pageToSlug = (page) => {
  const map = {
    Ingredients: "product",
    Formulas: "formulations",
    Trends: "trends",
  };

  return map[page];
};
