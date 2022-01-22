import React, { useContext, useEffect, useState } from "react";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const [btnHIghlighted, setBtnHighLighted] = useState(false);
  const cartCtx = useContext(CartContext);

  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);

  const btcClasses = `${classes.button} ${btnHIghlighted ? classes.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnHighLighted(true);

    const timer = setTimeout(() => {
      setBtnHighLighted(false);
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <>
      <button className={btcClasses} onClick={props.onClick}>
        <span className={classes.icon}>
          <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numberOfCartItems}</span>
      </button>
    </>
  );
};

export default HeaderCartButton;
