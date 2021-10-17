import React from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./user/screens/Home"
import Cart from "./user/screens/Cart"

export default function Routes() {
    return (
    <BrowserRouter>
        <Switch>
            <Route path="/menu/bot/:botId/need/:menu/user/:userId" exact component={Home} exact/>

            <Route path="/cart/bot/:botId/user/:userId" exact component={Cart} exact/>

            // Watsapp opwn
            <Route path='/towatsapp' component={() => { 
                    window.location.href = 'https://wa.me/919943479641?text=logicorder'; 
                    return null;
                }}/>
        </Switch>
    </BrowserRouter>
    )
}
