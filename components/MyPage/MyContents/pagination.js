import React, { useState } from "react";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";
import Pagination from "@material-ui/lab/Pagination";

const PaginationList = ({ pageCount, page, onChangePage }) => {
  return (
    <Grid container direction="row" justify="center">
      <Pagination count={pageCount} page={page} onChange={onChangePage} />
    </Grid>
  );
};

PaginationList.propTypes = {
  pageCount: PropTypes.number,
  page: PropTypes.number,
  onChangePage: PropTypes.func,
};

export default PaginationList;
