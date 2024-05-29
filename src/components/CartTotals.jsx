import React from "react";
import { useSelector } from "react-redux";
import { formatPrice } from "../utils";

const CartTotals = () => {
  const { tax, shipping, orderTotal, cartTotal } = useSelector(
    (state) => state.cartState
  );
  return (
    <div className="card bg-base-200">
      <div className="card-body">
        {/*SUBTOTAL*/}
        <p className="flex justify-between text-xs border-b border-base-300 pb-2">
          <span>SubTotal</span>
          <span className="font-medium">{formatPrice(cartTotal)}</span>
        </p>

        {/*SHIPPING*/}
        <p className="flex justify-between text-xs border-b border-base-300 pb-2">
          <span>Shipping</span>
          <span className="font-medium">{formatPrice(shipping)}</span>
        </p>

        {/*Tax*/}
        <p className="flex justify-between text-xs border-b border-base-300 pb-2">
          <span>Tax</span>
          <span className="font-medium">{formatPrice(tax)}</span>
        </p>

        {/*TOTAL*/}
        <p className="flex justify-between text-xs border-b border-base-300 pb-2">
          <span>Order Total</span>
          <span className="font-medium">{formatPrice(orderTotal)}</span>
        </p>
      </div>
    </div>
  );
};

export default CartTotals;