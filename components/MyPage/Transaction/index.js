import React, { useEffect } from "react";

import styles from "./transaction.module.scss";
import TransactionList from "components/myPage/transaction/transactionList";
import { useDispatch, useSelector } from "react-redux";

import MYPAGE from "actions/mypageAction";
import NoneProduct from "./none";

const Transaction = ({ path }) => {
  const dispatch = useDispatch();
  const { myOwnerList, myRentalList } = useSelector((state) => state.mypage);

  useEffect(() => {
    if (path === "owner") {
      dispatch({
        type: MYPAGE.LOAD_MY_OWNER_ITEM_REQUEST,
      });
    } else {
      dispatch({
        type: MYPAGE.LOAD_MY_RENTAL_ITEM_REQUEST,
      });
    }
  }, [path]);

  return (
    <>
      <p>총 {myRentalList ? myRentalList.length : myOwnerList.length}건</p>
      <ul className={styles.transactionList}>
        {myRentalList ? (
          myRentalList.length === 0 ? (
            <NoneProduct />
          ) : (
            myRentalList.map((data) => {
              return <TransactionList key={data.id} data={data} />;
            })
          )
        ) : myOwnerList.length === 0 ? (
          <NoneProduct />
        ) : (
          myOwnerList.map((data) => {
            return <TransactionList key={data.id} data={data} />;
          })
        )}
      </ul>
    </>
  );
};

export default Transaction;
