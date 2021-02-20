import React from "react";
import { getFormatDate } from "../../../utils/format";

const UserViewItem = ({ item }) => {
  return (
    <tr>
      <th>
        <input type="checkbox" name="updateChecked" />
      </th>
      <td>
        <a href="">{item[Object.keys(item)[1]]}</a>
      </td>
      <td>{getFormatDate(item.createdAt)}</td>
    </tr>
  );
};

export default UserViewItem;
