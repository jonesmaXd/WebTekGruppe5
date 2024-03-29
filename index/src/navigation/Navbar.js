import React from "react";

import {ActiveLink} from "./ActiveLink";
import {useSelector} from "react-redux";
import {getAuthenticatedUser} from "../api/authentication";
import {getCookie} from "../api/cookies";
import {useNavigate} from "react-router-dom";


/**
 * Navbar which includes navigation to all the pages
 * @returns {JSX.Element}
 * @constructor
 */
export default function Navbar() {


    const cart = useSelector(state => state.cartStore.cart)
    const nav = useNavigate();
    //Gets the total amount of products in the cart
    function getItemCount () {
        let totalProducts = 0;
        for (let itemId in cart) {
            const item = cart[itemId];
            totalProducts += item.count;
        }
        return totalProducts;
    }

    //Displays the amount of products in the cart if they are > 0
    function displayCart() {
        if(getItemCount() > 0) {
            return `Handlekurv (${getItemCount()})`
        }
        else {
            return "Handlekurv"
        }
    }

    /**
     * Shows the User's name in the navbar if the user is logged in.
     * @returns {string}
     */
    function displayUserName() {
        if(getAuthenticatedUser()) {
            return `Hei! ${getCookie("current_username")}`
        } else {
            return "Din side"
        }
    }

    return (
        <nav>
            <div className="navbar">
                <div className="container nav-container">
                    <input className="checkbox" type="checkbox" name={"navigationMenu"}/>
                    <div className="hamburger-lines">
                        <span className="line line1"/>
                        <span className="line line2"/>
                        <span className="line line3"/>
                    </div>

                    <div className="logo">
                        <img onClick={() => nav("/")} id="logoNav" src={require("../pictures/rk.jpg")} alt={"rodeKors"}/>
                    </div>
                     <ul className="menu-items" id={"menuList"}>
                        <li className={"hover-underline-animation"}><ActiveLink to="/">Hjem</ActiveLink></li>
                        <li className={"hover-underline-animation"}><ActiveLink to="/produkter">Produkter</ActiveLink></li>
                        <li className={"hover-underline-animation"}><ActiveLink to="/handlekurv">{displayCart()}</ActiveLink></li>
                        <li className={"hover-underline-animation"}><ActiveLink to="/dinside">{displayUserName()}</ActiveLink></li>
                    </ul>
             </div>
            </div>
        </nav>

    )
}