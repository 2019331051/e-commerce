import React from "react";
import { Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";

// import prod1 from "../assets/prod1.jpg";
import prod1 from "../assets/keybord.jpeg";
import prod2 from "../assets/Small.jpg";
import prod3 from "../assets/iphone.jpeg";


import axios from "../axios";
import { addToCart } from "../services/slices/cart";
// const productImages = [headphone.jpeg, keyboard.jpeg, smartwatch.jpeg];
const productImages = [prod1, prod2, prod3];

export default function Customer() {
  const products = useSelector((state) => state.products);

  const dispatch = useDispatch();

  function handleAddToCart(id) {
    dispatch(addToCart(id));
    axios.post("/carts", { product_id: id, quantity: 1 });
  }
  return (
    <Stack direction={{ xs: "column", md: "row" }} spacing={2}  
    sx={{
      // color:"#fffffff",
        }

    } 
           >
      {products.map((product, idx) => (
        <Stack
          key={product.id}
          component={Paper}
          p={4}
          // ml={10}
          spacing={1}
          sx={{
            backgroundColor: "#E8E8E880",
          
            borderRadius:"7%",
            // Replace with your desired background color
            "& img": {
              width: "300px",
              height: "300px",
              objectFit: "cover",
              borderRadius:"50%",
              backgroundColor: "#00000080",

            }
          }}
        >
          <img src={productImages[idx]}/>
          <Typography variant="h6" px={0} py={1}
           sx={{
            // color:"white",
              }
      
          } >
            {product.name}
          </Typography>
          <Divider />
          <Stack
            direction="row"
            justifyContent="space-between"
            // gap="10px"
            alignItems="center"
          >
            <Typography variant="body1" fontWeight="bold" px={5}  sx={{
            // color:"white",
              }
      
          }>
              ${product.price}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="small"
              startIcon={<ShoppingCart />}
              onClick={() => handleAddToCart(product.id)}
            >
              cart
            </Button>
          </Stack>
        </Stack>
      ))}
    </Stack>
    
    
  );
}
