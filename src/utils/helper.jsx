import _ from "lodash";

export const formatPrice = (number) => {
  return new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(number);
};

export const formatPercentage = (number) => {
  return (number * 100).toFixed(1) + "%";
};

//paginate and return paginated data
export const paginate = (items, pageNumber, pageSize) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
};

export const capitalize = (input) => {
  if (typeof input !== "string") return "";
  //capitalize the first char
  return input.charAt(0).toUpperCase() + input.slice(1);
};
