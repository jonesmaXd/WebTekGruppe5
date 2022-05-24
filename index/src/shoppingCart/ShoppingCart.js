import {useSelector} from "react-redux";
import {RemoveFromCartButton, DELETE_ALL} from "./RemoveFromCartButton"

export default function ShoppingCart() {

	const cart = useSelector(state => state.cartStore.cart)

	let cartItems = [];
	let totalPrice = 0;
    let totalProducts = 0;

	/**
	 * Loops over all the items in the cart.
	 */
	for (let itemId in cart) {
		const item = cart[itemId];
		const price = item.product.price * item.count;
		totalPrice += price;
		totalProducts += item.count;
		const itemRow =
			<div key={item.product.id}>
				<div className="Cart-Items" key={item.product.id}>

					<div className="about">
						<h1 className="title">{item.product.title}</h1>
					</div>
					<div className="counter">
						<div className="count">{item.count}</div>
					</div>
					<div className="prices">
						<div className="amount">{item.product.price} kr</div>
					</div>

				</div>

				<ul className="Cart-options">
					<li>tid på dagen: {item.product.timeOfDay}</li>
					<li>Språk: {item.product.language}</li>
					<li>Gruppestørrelse: {item.product.groupSize} pers</li>
					<li>Dato: {item.product.date}</li>
					<RemoveFromCartButton className="Action" id={item.product.id} buttonText={"Fjern"}/>
				</ul>

				<hr/>
			</div>

		//Adds the item to the redux store
		cartItems.push(itemRow);
	}


	return (
            <div className="cartContainer">
                <div className="Header">
                   	<h3 className="Heading">Handlekurv</h3>
					<RemoveFromCartButton className="Action" id={DELETE_ALL} buttonText={"Fjern alt"}/>
                </div>

				{cartItems}

            	 <div className="checkout">
            	 <div className="total">
            	 	<div>
            	 		<div className="Subtotal">Total-pris: </div>
            	 		<div className="items">{totalProducts} produkt</div>
            	 	</div>
            	 	<div className="total-amount">{totalPrice} NOK</div>
            	 </div>
            	 <button className="button">Sjekk ut</button></div>
            </div>
        )
}
