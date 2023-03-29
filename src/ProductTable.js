import React, { useEffect, useState } from "react";
import "./ProductTable.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import CloseIcon from "@mui/icons-material/Close";

const ProductTable = () => {
  const [rows, setRows] = useState([
    {
      isActive: true,
      item: "iPhone9",
      description: "An apple mobile which is nothing like apple",
      price: 549,
    },
    {
      isActive: false,
      item: "iPhoneX",
      description: "SIM-Free, Model A19211 6.5-inch ",
      price: 899,
    },
    {
      isActive: true,
      item: "SamsungU9",
      description:
        "Samsung's new variant which goes beyond Galaxy to the Universe",
      price: 1249,
    },
  ]);
  const [total, setTotal] = useState(rows.reduce((acc, product) => acc + product.price, 0));
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      console.log(data);
    };

    fetchData();
  }, []);

  const handleCheckboxChange = (index) => {
    const newRows = [...rows];
    newRows[index].isActive = !newRows[index].isActive;
    setRows(newRows);
  };

  const handleDropdownChange = (index, value) => {
    const newRows = [...rows];
    newRows[index].item = value;
    setRows(newRows);
  };

  const handleTextareaChange = (index, value) => {
    const newRows = [...rows];
    newRows[index].description = value;
    setRows(newRows);
  };

  const handleNumberChange = (index, value) => {
    const newRows = [...rows];
    newRows[index].price = value;
    setRows(newRows);
    updateTotal(newRows);
  };

  const handleAddRow = (index) => {
    const newRows = [...rows];
    newRows.splice(index + 1, 0, {
      isActive: true,
      item: "",
      description: "",
      price: 0,
    });
    setRows(newRows);
    updateTotal(newRows);
  };

  const handleDeleteRow = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
    updateTotal(newRows);
  };

  const updateTotal = (rows) => {
    const prices = rows.map((row) => row.price);
    const sum = prices.reduce((total, price) => total + price, 0);
    console.log(sum);
    setTotal(sum);
  };

  const handleDownloadPdf = () => {
    const doc = new jsPDF();
    doc.text("Product Table", 10, 10);
    const columns = ["Active", "Item", "Description", "Price"];
    const data = rows.map((row) => [
      row.isActive ? "Yes" : "No",
      row.item,
      row.description,
      row.price.toFixed(2),
    ]);
    doc.autoTable({
      head: [columns],
      body: data,
    });
    doc.save("product_table.pdf");
  };

  const handlePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen ? (
        <div className="popup-table-container">
          <h3>Products</h3>
          <div className="popup-table">
            <div className="action-buttons">
              <IconButton onClick={handleDownloadPdf}>
                <DownloadForOfflineIcon fontSize="large" />
              </IconButton>
              <IconButton onClick={handlePopup}>
                <CloseIcon fontSize="large" />
              </IconButton>
            </div>
            <TableContainer sx={{ width: "70%" }} className="TableContainer">
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
                    <TableCell>{row.item}</TableCell>
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
      ) : (
        <TableContainer
          sx={{ width: "70%" }}
          className="TableContainer"
          component={Paper}
        >
          <h3>Products</h3>
          <Table sx={{ width: "100%" }} aria-label="caption table">
            <TableHead>
              <TableRow>
                <TableCell>isActive</TableCell>
                <TableCell>Item</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Price($)</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Checkbox
                      type="checkbox"
                      checked={row.isActive}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      value={row.item}
                      onChange={(e) =>
                        handleDropdownChange(index, e.target.value)
                      }
                    >
                      <MenuItem value="iPhone9">iPhone9</MenuItem>
                      <MenuItem value="iPhoneX">iPhoneX</MenuItem>
                      <MenuItem value="SamsungU9">SamsungU9</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <TextareaAutosize
                      value={row.description}
                      onChange={(e) =>
                        handleTextareaChange(index, e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      value={row.price}
                      onChange={(e) =>
                        handleNumberChange(index, e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleAddRow(index)}>
                      <AddBoxIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteRow(index)}>
                      <DeleteForeverIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan="3" />
                <TableCell>Total:</TableCell>
                <TableCell>{total}$</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan="4" />
                <TableCell>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handlePopup}
                  >
                    Save
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default ProductTable;
