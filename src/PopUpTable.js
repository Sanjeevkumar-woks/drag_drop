import React from "react";
import "./PopUpTable.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import CloseIcon from "@mui/icons-material/Close";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";

export default function PopUpTable({ handlePopup, rows, total }) {
  const handleDownloadPdf = () => {
    const doc = new jsPDF();
    doc.text("Product Table", 10, 10);
    const columns = ["Active", "Item", "Description", "Price"];
    const data = rows.map((row) => [
      row.isActive ? "Yes" : "No",
      row.title,
      row.description,
      row.price.toFixed(2),
    ]);
    doc.autoTable({
      head: [columns],
      body: data,
    });
    doc.save("product_table.pdf");
  };
  return (
    <div className="popup-table-container">
      <h3>Products</h3>
      <div className="popup-table">
        <div className="action-buttons">
          <IconButton onClick={handleDownloadPdf}>
            <DownloadForOfflineIcon color="primary" fontSize="large" />
          </IconButton>
          <IconButton onClick={handlePopup}>
            <CloseIcon fontSize="large" />
          </IconButton>
        </div>
        <TableContainer sx={{ width: "90%" }} className="TableContainer">
          <TableHead>
            <TableRow>
              <TableCell>isActive</TableCell>
              <TableCell>Item</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price($)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.isActive ? "Yes" : "No"}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.price}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan="3" />
              <TableCell>Total:</TableCell>
              <TableCell>{total}$</TableCell>
            </TableRow>
          </TableBody>
        </TableContainer>
      </div>
    </div>
  );
}
