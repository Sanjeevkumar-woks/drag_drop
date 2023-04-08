import React, { useEffect, useState } from "react";
import "./ProductTable.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
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
import PopUpTable from "./PopUpTable";

const ProductTable = () => {
  const [rows, setRows] = useState([
    {
      isActive: true,
      id: 1,
      title: "iPhone 9",
      description: "An apple mobile which is nothing like apple",
      price: 549,
      discountPercentage: 12.96,
      rating: 4.69,
      stock: 94,
      brand: "Apple",
      category: "smartphones",
      thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
      images: [
        "https://i.dummyjson.com/data/products/1/1.jpg",
        "https://i.dummyjson.com/data/products/1/2.jpg",
        "https://i.dummyjson.com/data/products/1/3.jpg",
        "https://i.dummyjson.com/data/products/1/4.jpg",
        "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
      ],
    },
  ]);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(
    rows.reduce((acc, product) => acc + Number(product.price), 0)
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      setProducts(data.products);
    };

    fetchData();
  }, []);

  const handleCheckboxChange = (index) => {
    const newRows = [...rows];
    newRows[index].isActive = !newRows[index].isActive;
    setRows(newRows);
  };

  const handleDropdownChange = (index, value) => {
    const selectedProduct = products.find((product) => product.title === value);
    const newRows = [...rows];
    newRows[index] = { isActive: false, ...selectedProduct };
    setRows(newRows);
    updateTotal(newRows);
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
      isActive: false,
      title: "",
      description: "",
      price: 0,
    });
    setRows(newRows);
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
    setTotal(sum);
  };

  const handlePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen ? (
        <PopUpTable handlePopup={handlePopup} rows={rows} total={total} />
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
                      value={rows[index].title}
                      onChange={(e) =>
                        handleDropdownChange(index, e.target.value)
                      }
                    >
                      {products.map((product, index) => (
                        <MenuItem key={product.id} value={product.title}>
                          {product.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell>
                    <textarea
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
                      <AddBoxIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteRow(index)}>
                      <DeleteForeverIcon color="primary" />
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
