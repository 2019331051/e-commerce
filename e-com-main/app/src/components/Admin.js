import React, { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Check, Close } from "@mui/icons-material";
import { useSelector } from "react-redux";
// import { makeStyles } from "@mui/styles";


import axios from "../axios";

const statusMap = [
  { color: "textSecondary", label: "Pending" },
  { color: "primary", label: "Verified" },
  { color: "green", label: "Delivered" },
  { color: "error", label: "Rejected" },
];

export default function Admin() {
  const [value, setValue] = useState(0);
  const [orders, setOrders] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const products = useSelector((state) => state.products);

  useEffect(() => {
    axios.get("admin").then((res) => { 
      setOrders(res.data);
    });
    return () => {
      setOrders([]);
    };
  }, []);

  useEffect(() => { 
    const newSelected = orders.map((item) => {
      const product = products.find((product) => item.product_id === product.id); 
      return {
        ...product,
        ...item
      };
    }); 
    setSelectedProducts(newSelected);
  }, [orders, products]);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  function handleConfirm(id) {
    axios.post("admin", { id, status: 1 }).then(() => {
      setOrders(
        orders.map((order) =>
          order.id === id ? { ...order, status: 1 } : order
        )
      );
    });
  }

  function handleReject(id) {
    axios.post("admin", { id, status: 3 }).then(() => {
      setOrders(
        orders.map((order) =>
          order.id === id ? { ...order, status: 3 } : order
        )
      );
    });
  }

  const selectedOrders = selectedProducts.filter((sp) =>  sp.status === value);
  

  return (
    <Stack p={2} spacing={2} component={Paper} width="100%" maxWidth="600px"
    sx={{ width: "100%" ,
    borderRadius:"10%",      
      backgroundColor: "#E8E8E8",   
      border: "8x solid black",         
   
  }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        sx={{ width: "100%",
        backgroundColor: "#E8E8E800",
        borderRadius:"7%",
        color:"Black",
       }}
      >
        <Tab label="Pending" value={0} />
        <Tab label="Verified" value={1} />
        <Tab label="Delivered" value={2} />
        <Tab label="Rejected" value={3} />
      </Tabs>
      {selectedOrders.map((item) => (
        <Stack key={item.id} p={3} spacing={1}   sx={{
          backgroundColor: "#E8E8E800",
          borderRadius:"7%",
        
        }}
          >
          <Typography variant="h6" mt={1}>
            {item.name}
          </Typography>
          <Typography variant="caption" mt={1}>
           Bank A/C: {item.bank_ac}
          </Typography>
          <Stack direction="row" justifyContent="space-between" width="100%">
            <Typography fontWeight="bold">Quantity: {item.quantity}</Typography>
            <Typography fontWeight="bold">
              Price: {item.price * item.quantity}
            </Typography>
            <Typography fontWeight="bold">
              Status:{" "}
              <Typography
                fontWeight="bold"
                component="span"
                color={statusMap[item.status].color}
              >
                {statusMap[item.status].label}
              </Typography>
            </Typography>
          </Stack>
          <Divider />
          {value === 0 && (
            <Stack direction="row" justifyContent="flex-end" spacing={1}>
              <Button
                variant="contained"
                color="success"
                size="small"
                startIcon={<Check />}
                onClick={() => handleConfirm(item.id)}
              >
                Verify
              </Button>
              <Button
                color="error"
                variant="outlined"
                size="small"
                startIcon={<Close />}
                onClick={() => handleReject(item.id)}
              >
                Reject
              </Button>
            </Stack>
          )}
        </Stack>
      ))}
      {selectedOrders.length === 0 && (
        <Typography
          textAlign="center"
          color="textSecondary"
          py={2}
          className="null"
        >
          No {statusMap[value].label.toLowerCase()} orders found!
        </Typography>
      )}
    </Stack>
  );
}
