import "./ExcelGrid.css";
import { getColumnLetter } from "./ColumnLetter";
import { useState, useEffect } from "react";

const ExcelGrid = ({ rows, cols }) => {
  const [selectedCell, setSelectedCell] = useState("A1");
  const [selectedRow, setSelectedRow] = useState(0);
  const [selectedColumn, setSelectedColumn] = useState(0);

  useEffect(() => {
    setSelectedCell("A1");
    setSelectedRow(0);
    setSelectedColumn(0);
  }, [rows, cols]);

  useEffect(() => {
    const selector = `input[data-rid="${selectedRow}"][data-cid="${selectedColumn}"]`;
    const activeInput = document.querySelector(selector);
    if (activeInput) activeInput.focus();
  }, [selectedRow, selectedColumn]);

  const handler = (e) => {
    let cid = Number(e.target.dataset.cid);
    let rid = Number(e.target.dataset.rid);
    let colId = String.fromCharCode(cid + 65);
    let rowId = rid + 1;
    setSelectedCell(colId + rowId);
    setSelectedRow(rid);
    setSelectedColumn(cid);
  };

  const handleKeyDown = (e) => {
    let newRow = selectedRow;
    let newCol = selectedColumn;

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (newRow == 0) {
        newRow = selectedRow;
      } else {
        newRow = selectedRow - 1;
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (rows == newRow + 1) {
        newRow = selectedRow;
      } else {
        newRow = selectedRow + 1;
      }
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      if (newCol == 0) {
        newCol = selectedColumn;
      } else {
        newCol = selectedColumn - 1;
      }
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      if (rows == newCol + 1) {
        newCol = selectedColumn;
      } else {
        newCol = selectedColumn + 1;
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (rows == newCol + 1) {
        newRow = selectedRow + 1;
        newCol = 0;
      } else {
        newCol = selectedColumn +1 ;
      }
    }

    setSelectedRow(newRow);
    setSelectedColumn(newCol);
    setSelectedCell(getColumnLetter(newCol) + (newRow + 1));
  };

  return (
    <div className="excel-grid-cont">
      <div className="header-cont">
        <div className="left-corner">{selectedCell}</div>
        <div className="right-header">
          {Array.from({ length: cols }, (_, i) => (
            <div
              className={`cols ${selectedColumn === i ? "active" : ""}`}
              key={i}
            >
              {getColumnLetter(i)}
            </div>
          ))}
        </div>
      </div>
      <div className="main-grid-cont">
        <div className="left-index">
          {Array.from({ length: rows }, (_, i) => (
            <div
              className={`rows ${selectedRow === i ? "active" : ""}`}
              key={i}
            >
              {i + 1}
            </div>
          ))}
        </div>
        <div className="grid">
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div key={rowIndex} className="rows">
              {Array.from({ length: cols }).map((_, colIndex) => {
                const isActive =
                  rowIndex === selectedRow && colIndex === selectedColumn;
                return (
                  <div key={colIndex} className="cols" onClick={handler}>
                    <input
                      data-rid={rowIndex}
                      data-cid={colIndex}
                      className={`input-box ${isActive ? "active" : ""}`}
                      onKeyDown={handleKeyDown}
                    ></input>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExcelGrid;
