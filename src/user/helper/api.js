import axios from 'axios';

const MENU_API = 'http://localhost:8000/api'

export const getAllMenus = () => {
    return axios.get(`https://foodosv1.herokuapp.com/api/product/getallproducts`)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log(err);
        })
}



export const addToCart = userData => {
    console.log("UserData Add Product : ", userData.userId);
    return axios.post(`https://foodosv1.herokuapp.com/rasaapi/user/addtocart/${userData.userId}`, userData)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log(err)
        })
}


export const removeToCart = userData => {
    console.log("UserData Remove Product : ", userData);
    return axios.post(`https://foodosv1.herokuapp.com/rasaapi/user/removefromcart/${userData.userId}`, userData)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log(err)
        })
}



export const getAllCartItems = (userId) => {
    return axios.get(`https://foodosv1.herokuapp.com/rasaapi/user/${userId}/getallproductfromcart`)
        .then((res) => {
            return res
        })
        .catch(err => {
            console.log(err)
        })

}



export const getAllProductFromCartItems = (userId) => {
    return axios.get(`https://foodosv1.herokuapp.com/rasaapi/user/${userId}/getallproductdatafromcart`)
        .then((res) => {
            return res
        })
        .catch((err) => {
            console.log(err)
        })

    ;
}



export const userOrderFood = (data) => {
    return axios.post(`https://foodosv1.herokuapp.com/rasaapi/user/${data.userId}/ordernow`, data)
        .then((res) => {
            return res
        })
        .catch((err) => {
            console.log(err)
        })
}