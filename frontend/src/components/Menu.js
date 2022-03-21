import React from "react";
import { Button } from "react-bootstrap";

function Menu(){
    return(
        <div className="menu">
            <Button href="https://play.google.com/store/apps/details?id=com.foxcity.foxcitycustomer&hl=en&gl=US" className="orderbtn">Order</Button>
        </div>
    )
}

export default Menu;