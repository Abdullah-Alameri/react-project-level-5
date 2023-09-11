import React, { useRef, useState } from "react";
import "./product-details.css";
import { useGetOneProductQuery } from "Redux/productsAPI";
import { useParams } from "react-router-dom";
import { Badge, Box, Button, CircularProgress, IconButton, Typography, styled } from "@mui/material";
import DetailsThumb from "./DetailsThumb";
import { Add, Remove } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseQuantity, increaseQuantity } from "Redux/cartSlice";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
  
  },
}));

const ProductDetails = () => {
  let { id } = useParams();
  const { data, error, isLoading } = useGetOneProductQuery(id);
  
  const [index, setIndex] = useState(0);
  const myRef = useRef(null)
  const handleTab = (index) => {
    setIndex(index)
      const images = myRef.current.children;
      for(let i=0; i<images.length; i++){
        images[i].className = images[i].className.replace("active", "");
      }
      images[index].className = "active";
  }

  // eslint-disable-next-line no-undef
  const { selectedProducts, selectedProductsID } = useSelector((state) => state.cart);
  const dispatch = useDispatch()

  const productQuantity = (itemAPI) => {
    const myproduct = selectedProducts.find((itemUser) => {
      return itemUser.id === itemAPI.id;
    })

    return myproduct.quantity
  }

  if (isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex" }}>
        <Typography variant="h1" color="error">
          ERROR
        </Typography>
      </Box>
    );
  }

  if (data) {
    return (
      <div className="app details-page">
        <div className="details">
          <div className="big-img">
            <img src={data.imageLink[index]} alt="" />
          </div>

          <div className="box">
            <div className="row">
              <h2 style={{fontSize: "29px"}}>{data.productName}</h2>
              <span style={{fontSize: "19px"}}>${data.price}</span>
            </div>
            {/* <Colors colors={item.colors} /> */}
            <p style={{fontSize: "16px"}}>Lorem ipsum dolor sit amet consectetur.</p>
            <p>{data.description}</p>

            <DetailsThumb
              images={data.imageLink}
              tab={handleTab}
              myRef={myRef}
            />


          {selectedProductsID.includes(data.id) ? (
             <div   style={{ display: "flex", alignItems: "center", marginTop: "33px " }}>
              <IconButton
              color="primary"
                sx={{  mr: "10px" }}
                onClick={() => {
                  dispatch(decreaseQuantity(data));
                }}
              >
                <Remove fontSize="small"/>
              </IconButton>

              <StyledBadge badgeContent={productQuantity(data)} color="secondary" />
              <IconButton color="primary"
                sx={{ ml: "10px" }}
                onClick={() => {
                  dispatch(increaseQuantity(data));
                }}
              >
                <Add fontSize="small" />
              </IconButton>
            
            </div>) : (      <Button
                  sx={{ marginTop: "33px", textTransform: "capitalize", p: 1, lineHeight: 1.1 }}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    dispatch(addToCart(data))
                  }}
                >
                  Add to cart
                </Button>)}
          </div>
        </div>
      </div>
    );
  }
};

export default ProductDetails;
