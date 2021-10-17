import React,{useEffect,useState} from 'react'
import Box from '@mui/material/Box';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import { Link,Redirect } from "react-router-dom";
import Fab from '@mui/material/Fab';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import ProfileIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import BadgeUnstyled from '@mui/core/BadgeUnstyled';
// All APIs
import {getAllMenus, addToCart, removeToCart, getAllCartItems, getAllProductFromCartItems, userOrderFood} from "../helper/api"


export default function Cart({ match }) {



    const [value, setValue] = React.useState(1);    
    const [allmenu, setallmenu] = useState([]);
    const [allCart, setallCart] = useState([]);
    const [count, setCount] = React.useState(1);
    const [invisible, setInvisible] = React.useState(false);
    const [total, settotal] = useState(0)
    const {botId, menu, userId} = match.params
    const [isSuccess, setisSuccess] = useState(false);


    useEffect(() => {
        // console.log(botId, menu, userId);
        if(menu === 'menu'){
            getAllMenus()
            .then((res) => {
                // console.log("Responce: ",res.data.allPro);
                setallmenu(res.data.allPro)
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }, [count,isSuccess])

    useEffect(() => {
      if(userId){
      getAllCartItems(userId)
      .then((data) => {
        // console.log("Cart Data -> ",data.data.gotAll.cart);
        if(data.data.gotAll.cart.length > 0)
        setallCart(data.data.gotAll.cart)
      })
      .catch((err) => {
        console.log(err);
      })
      }
    }, [count,isSuccess])

    const [isEmpty, setisEmpty] = useState(true);
    const [productdataFromCart, setproductdataFromCart] = useState([]);
    useEffect(() => {
        getAllProductFromCartItems(userId).then((res) => {
            console.log("Getting all products from Cart : ",res);
            if(res.data.msg){
                setisEmpty(true);
            }
            else{
                setisEmpty(false);
                setproductdataFromCart(res.data.records)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    const userAddProductToCart = (productId) => {
      setCount(count + 1)
        // console.log("product ID here",productId)
        addToCart({botId, menu, userId, productId})
        .then((res) => {
            console.log(res);
        })  
        .catch((err) => {
            console.log(err);
        })
    }

    const moveToWatsapp = () => {
      if(isSuccess)
      return (<Redirect to ="/towatsapp" />)
    }

    const userRemoveProductToCart = (productId) => {
      setCount(count - 1)
        removeToCart({botId, menu, userId, productId})
        .then((res) => {
            console.log(res);
        })  
        .catch((err) => {
            console.log(err);
        })
    }



    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '80%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
      }));
      
      const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }));

      const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
          padding: theme.spacing(1, 1, 1, 0),
          // vertical padding + font size from searchIcon
          paddingLeft: `calc(1em + ${theme.spacing(4)})`,
          transition: theme.transitions.create('width'),
          width: '100%',
          [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
              width: '20ch',
            },
          },
        },
      }));

      


      const StyledBadge = styled(BadgeUnstyled)`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  font-variant: tabular-nums;
  list-style: none;
  font-feature-settings: 'tnum';
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol';
  position: relative;
  display: inline-block;
  line-height: 1;

  & .MuiBadge-badge {
    z-index: auto;
    min-width: 20px;
    height: 20px;
    padding: 0 6px;
    color: #fff;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    white-space: nowrap;
    text-align: center;
    background: #ff4d4f;
    border-radius: 10px;
    box-shadow: 0 0 0 1px #fff;
  }

  & .MuiBadge-dot {
    padding: 0;
    z-index: auto;
    min-width: 6px;
    width: 6px;
    height: 6px;
    background: #ff4d4f;
    border-radius: 100%;
    box-shadow: 0 0 0 1px #fff;
  }

  & .MuiBadge-anchorOriginTopRightCircular {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
    transform-origin: 100% 0;
  }
`;

function BadgeContent() {
  return (
    <Box
      component="span"
      sx={{
        width: 42,
        height: 42,
        borderRadius: '2px',
        background: '#eee',
        display: 'inline-block',
        verticalAlign: 'middle',
      }}
    />
  );
}

useEffect(() => {
    console.log("Cart length - >",allCart.length)
    console.log("Cart length - >",allCart)
    if(productdataFromCart.length > 0 && allCart.length > 0){
    //   return(
    //     <Link
    //     style={{ textDecoration: "none" }}
    //     to={`/cart/bot/${botId}/user/${userId}`}
    //     >
    //         <Chip  icon={<ShoppingBasketIcon />} label="Order" color="success" variant="outlined" />
    //     </Link>
    //     )
        var total = 0;
    productdataFromCart.map((ele,index) => {
        console.log(ele)
        total = (allCart[index].qty) * (parseInt(ele.price))


    })
    settotal(total)
    
    
    
    }
    else{
      return(
        null
      )
    }
}, [count])

  const submitFinalOrder = (e) => {
            e.preventDefault();
            userOrderFood({userId,allCart})
            .then((res) => {
              console.log(res);
                  if(res.data.order_food){
                    setisSuccess(true)
                  }
                  else{
                    setisSuccess(false)
                  }
            })
            .catch((err) => {
              console.log(err);
            })
    }
 
  const showMenuHere = (pId) => {
    var is_in_cart = allCart.filter((item) => item.productId === pId);
    if(is_in_cart.length !== 0){
    console.log(is_in_cart[0])

      return (
        <StyledBadge badgeContent={is_in_cart[0].qty} overlap="circular" key={pId}>

        <ButtonGroup
        
        >
          <Button
           
            aria-label="reduce"
            onClick={() => 
              userRemoveProductToCart(pId)
            }
          >
            <RemoveIcon fontSize="small" />
          </Button>
         
          
          <Button
            aria-label="increase"
            
            onClick={() => 
              userAddProductToCart(pId)
            }
        
          >
            <AddIcon fontSize="small" />
          </Button>
        </ButtonGroup>
        </StyledBadge>
      )
    }
    else{
      return (
       

        <ButtonGroup>
          <Button
           
            aria-label="reduce"
            onClick={() => 
              userRemoveProductToCart(pId)
            }
          >
            <RemoveIcon fontSize="small" />
          </Button>
         
          
          <Button
            aria-label="increase"
            
            onClick={() => 
              userAddProductToCart(pId)
            }
        
          >
            <AddIcon fontSize="small" />
          </Button>
        </ButtonGroup>
      )
    }
  }
    return (
        <div>
          {moveToWatsapp()}
            <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{
          backgroundColor:'#00931F'
      }}>
        <Toolbar>
         
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{marginRight:12}}>
            Cart
          </Typography>
          {/* <Button color="inherit">Bot</Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  

    <Box
    style={{padding:5,marginTop:30}}
    >
      
     {productdataFromCart && productdataFromCart.map((ele,index) => {
         console.log(ele)
         return(

             <Paper
             elevation={3}
             >
                 <Grid container spacing={2} style={{
                     marginBottom:12
                 }}>
                 <Grid item xs={4}>
                        <img
                        style={{
                            height:80,
                            borderRadius: 12,
                            marginLeft: 12
                        }}
                        src={ele.product_img}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <p>
                        {ele.name}
                        </p>
                        {allCart ? (
                                    <p>
                                    Qty: {allCart[index].qty}
                                    </p>

                        ) : (null)

                        }
                       
                    </Grid>
                    <Grid item xs={5}>
                    <div
                     style={{
                        marginTop:20
                    }}
                    >
                        {showMenuHere(ele._id)}
           
      </div>
                    <div>
                    <p>
                     Price: {(allCart[index].qty) * (parseInt(ele.price))}
                    </p>
                       
                    </div>
                    </Grid>
                 </Grid>
             </Paper>

         )
     })
     
     
     }


    </Box>

     <Box
     style={{
      margin: 0,
      top: 'auto',
      right: 20,
      bottom: 100,
      left: 'auto',
      position: 'fixed',
     }}
     >
     <div>
         {total && total > 0 ? (

<p>
{total}
</p>
         ) : (

            null
         )
  
                  
                
         }
      
     </div>
   
     </Box>
    
       {allCart.length > 0 ? (
          <Box
          onClick={(e) => submitFinalOrder(e)}
          sx={{ position: 'fixed', bottom: 60, left: 0, right: 0 }}
          style={{
              backgroundColor: '#22CB5C',
              height:55,
              width:"100",
              alignItems:'center'
          }}
          >
         <p
         style={{
             fontSize: 18,
             fontWeight: '500',
            justifyItems:'center',
            alignSelf:'center',
             color: 'white',
             marginLeft: 100
         }}
         >
             Complete Order
         </p>
         </Box>

       ) : (
        null

       ) 

       }
         
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
            console.log(newValue);
          setValue(1);
        }}
      >
        
        <BottomNavigationAction component={Link} to={`/menu/bot/${botId}/need/menu/user/${userId}`} label="Home" icon={<HomeIcon />} />
        {/* <BottomNavigationAction label="Explore" icon={<LocationOnIcon />} /> */}
 
        <BottomNavigationAction component={Link} to={`/cart/bot/${botId}/user/${userId}`} label="Cart" icon={<ShoppingBasketIcon />} />
          
        {/* <BottomNavigationAction label="Profile" icon={<ProfileIcon />} /> */}
      </BottomNavigation>
      </Paper>
        </div>
    )
}
