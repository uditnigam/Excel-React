import React, { useState, useRef } from "react";
import "./Excel.css";
import ExcelGrid from "./ExcelGrid";

const Excel = () => {
  const [row, setRow] = useState(20);
  const [col, setCol] = useState(20);
  const [row1, setRow1] = useState(20);
  const [col1, setCol1] = useState(20);

  const handleChangeRow = (e) => {
    setRow1(e.target.value);
  };
  const handleChangeCol = (e) => {
    setCol1(e.target.value);
  };

  const handleClick = (e) => {
    if (row1 > 0 && col1 > 0) {
      setRow(row1);
      setCol(col1);
    } else {
      alert("Enter value greater than 0");
    }
  };

  const handleClickEnter = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };
  return (
    <div className="excel-container">
      <div className="excel-info-cont" onKeyDown={handleClickEnter}>
        Rows
        <input
          className="input-data"
          type="number"
          value={row1}
          onChange={handleChangeRow}
        />{" "}
        Columns{" "}
        <input
          className="input-data"
          type="number"
          value={col1}
          onChange={handleChangeCol}
        />{" "}
        <button
          className="create-sheet-btn"
          onClick={handleClick}
          onKeyDown={handleClick}
        >
          Create
        </button>
      </div>
      <ExcelGrid rows={row} cols={col} />
    </div>
  );
};

export default Excel;
