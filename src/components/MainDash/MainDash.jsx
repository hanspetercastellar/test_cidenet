import React from "react";
import Table from "../Table/Table";
import "./MainDash.css";
import {FormControl, InputLabel, NativeSelect, Select} from "@mui/material";
const MainDash = () => {

  return (
    <div className="MainDash">
      <h1>Dashboard</h1>
      <Table />
    </div>
  );
};

export default MainDash;
