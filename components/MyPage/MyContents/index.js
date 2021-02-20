import React, { useCallback, useEffect, useState } from "react";
import styles from "./userView.module.scss";
import PaginationList from "./pagination";
import { useDispatch, useSelector } from "react-redux";
import MYPAGE from "../../../actions/mypageAction";
import UserViewItem from "./userViewItem";

const MyContents = ({ path }) => {
  const dispatch = useDispatch();
  const [pageNum, setPageNum] = useState(1);

  const { myContents, myContentsTotalCount } = useSelector(
    (state) => state.mypage,
  );

  useEffect(() => {
    dispatch({
      type: MYPAGE.LOAD_MYCONTENTS_REQUEST,
      data: {
        pageNum: pageNum,
        type: path,
      },
    });
  }, [path]);

  const onChangePage = useCallback(
    (e, value) => {
      e.preventDefault();
      dispatch({
        type: MYPAGE.LOAD_MYCONTENTS_REQUEST,
        data: {
          pageNum: value,
          type: path,
        },
      });
      setPageNum(value);
    },
    [pageNum, setPageNum],
  );

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
        {myContents.length !== 0 ? (
          myContents.map((item) => <UserViewItem key={item.id} item={item} />)
        ) : (
          <tr>
            <th></th>
            <td>작성된 내용이 없습니다</td>
            <td></td>
          </tr>
        )}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="4">
            <PaginationList
              pageCount={Math.ceil(myContentsTotalCount / 5)}
              page={pageNum}
              onChangePage={onChangePage}
            />
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default MyContents;
