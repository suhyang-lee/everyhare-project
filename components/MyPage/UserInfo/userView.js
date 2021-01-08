import React, { useCallback, useState } from "react";
import { List, Skeleton } from "antd";
import LoadMore from "../../common/loadMore";

const UserView = () => {
  return (
    <List
      className="demo-loadmore-list"
      itemLayout="horizontal"
      loadMore={<LoadMore />}
      renderItem={(item) => (
        <List.Item
          actions={[
            <a key="list-loadmore-edit">삭제</a>,
            <a key="list-loadmore-more">바로가기</a>,
          ]}
        >
          <Skeleton title={false} loading={item.loading} active>
            <List.Item.Meta
              title={<a href="https://ant.design">{item.name.last}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </Skeleton>
          ' ' '
        </List.Item>
      )}
    />
  );
};

export default UserView;
