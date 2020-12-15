export const getCategory = (type) => {
  const category = {
    digital: "디지털/가전",
    kids: "유아동",
    goods: "생활용품",
    clothing: "의류/잡화",
    sports: "스포츠/레저",
    hobby: "도서/취미",
    etc: "기타용품",
  };
  return category[type];
};
