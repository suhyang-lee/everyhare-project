import React, { useCallback, useEffect, useState } from "react";
import styles from "./userView.module.scss";
import PaginationList from "./pagination";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MYPOSTS_REQUEST } from "../../../actions/mypageAction";
import UserViewItem from "./userViewItem";

const UserView = () => {
  const dispatch = useDispatch();
  const [pageNum, setPageNum] = useState(1);

  const { myPosts, myPostsTotalCount } = useSelector((state) => state.mypage);

  const onChangePage = useCallback(
    (e, value) => {
      e.preventDefault();
      setPageNum(value);
      dispatch({
        type: LOAD_MYPOSTS_REQUEST,
        pageNum: value,
      });
    },
    [pageNum, setPageNum],
  );

  useEffect(() => {
    dispatch({
      type: LOAD_MYPOSTS_REQUEST,
      pageNum: pageNum,
    });
  }, []);

  return (
    <table className={styles.myTable}>
      <thead>
        <tr>
          <th>
            <input type="checkbox" name="allChecked" />
          </th>
          <th>제목</th>
          <th>작성일</th>
        </tr>
      </thead>
      <tbody>
        {myPosts.map((item) => (
          <UserViewItem key={item.id} item={item} />
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="4">
            <PaginationList
              pageCount={Math.ceil(myPostsTotalCount / 10)}
              page={pageNum}
              onChangePage={onChangePage}
            />
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default UserView;
