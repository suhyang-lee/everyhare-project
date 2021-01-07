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

export const getMypageTitle = (type) => {
  const titleInfo = {
    owenr: {
      title: "내가 대여해 준 물품",
      discription:
        "회원님께서 다른 회원님께 회원님의 물건을 빌려 준 경우에 대한 거래 내역입니다",
    },
    borrow: {
      title: "내가 대여한 물품",
      discription:
        "회원님께서 다른 회원님께 회원님의 물건을 대여 한 경우에 대한 거래 내역입니다",
    },
    writer: {
      title: "내가 쓴 글 보기",
      discription: "회원님께서 작성하신 게시글 입니다",
    },
    commenter: {
      title: "내가 쓴 댓글 보기",
      discription: "회원님께서 작성하신 댓글 입니다",
    },
    modify: {
      title: "회원정보 수정",
      discription: "회원님의 정보를 수정할 수 있습니다",
    },
    delete: {
      title: "회원탈퇴",
      discription: "에브리쉐어를 탈퇴하고 회원님의 정보를 삭제 합니다.",
    },
  };
  return titleInfo[type];
};
