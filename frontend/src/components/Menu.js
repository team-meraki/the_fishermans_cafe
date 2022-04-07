import React from "react";
import { Button } from "react-bootstrap";
import '../styles/Menu.scss';

function Menu(){
    return(
        <div className="menu">
            <Button target={"_blank"} rel={"noreferrer"} href="https://play.google.com/store/apps/details?id=com.foxcity.foxcitycustomer&hl=en&gl=US" className="orderbtn">Order</Button>
        </div>
    )
}

export default Menu