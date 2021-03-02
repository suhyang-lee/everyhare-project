import React from "react";
import Link from "next/link";
import styled from "styled-components";

const HeaderLink = styled.a`
  color: black;
  cursor: pointer;
`;

const List = ({ zzim }) => {
  return (
    <Link href={`/view/${zzim.id}`}>
      <li>
        <span>♥</span>
        <HeaderLink>{zzim.title}</HeaderLink>
      </li>
    </Link>
  );
};

export default List;
