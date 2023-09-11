import "./Home.css";
import Card from "@mui/material/Card";

import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import { Badge, Box, CircularProgress, IconButton, Stack, styled } from "@mui/material";

import { useGetproductsByNameQuery } from '../../Redux/productsAPI'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, decreaseQuantity, increaseQuantity } from "Redux/cartSlice";
import { Add, Remove, ShoppingCart } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";


const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
  
  },
}));

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { data, error, isLoading } = useGetproductsByNameQuery('bulbasaur')
  const dispatch = useDispatch()
  const { selectedProducts, selectedProductsID } = useSelector((state) => state.cart);


  const productQuantity = (itemAPI) => {
    const myproduct = selectedProducts.find((itemUser) => {
      return itemUser.id === itemAPI.id;
    })

    return myproduct.quantity
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
    )
  }

  if (error) {
    return (
    <Box sx={{display: "flex"}}>
      <Typography variant="h1" color="error">ERROR</Typography>
    </Box>
    )
  }

  if (data) {
    return (
      <Stack direction="row" 
      sx={{flexWrap: "wrap", justifyContent: "center"}}>
        {data.map((item) => {
          return (
            <Card className="card" sx={{ maxWidth: 277, mb: 6, mx: 2 }}>
              <CardMedia
                component="img"
                height="277"
                image={item.imageLink[0]}
                alt="Paella dish"
                onClick={() => {
                  navigate(`product-details/${item.id}`)
                }}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
              <CardActions
                sx={{ justifyContent: "space-between" }}
                disableSpacing
              >

                {selectedProductsID.includes(item.id) ? ( <div dir="rtl" style={{ display: "flex", alignItems: "center" }}>
              <IconButton color="primary"
                sx={{ ml: "10px" }}
                onClick={() => {
                  dispatch(increaseQuantity(item));
                }}
              >
                <Add />
              </IconButton>

              <StyledBadge badgeContent={productQuantity(item)} color="secondary" />

              <IconButton
              color="primary"
                sx={{  mr: "10px" }}
                onClick={() => {
                  dispatch(decreaseQuantity(item));
                }}
              >
                <Remove />
              </IconButton>
            </div>) : (      <Button
                  sx={{ textTransform: "capitalize", p: 1, lineHeight: 1.1 }}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    dispatch(addToCart(item))
                  }}
                >
                <ShoppingCart sx={{fontSize: "18px", mr: 1}}/>  Add to cart
                </Button>)}
          
  
                <Typography
                  mr={1}
                  variant="body1"
                  color={theme.palette.error.light}
                >
                  ${item.price}
                </Typography>
              </CardActions>
            </Card>
          );
        })}
      </Stack>
    );
  }

};

export default Home;
