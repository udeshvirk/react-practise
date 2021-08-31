import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon"
import styles from './HeaderCartButton.module.css';
const HeaderCartButton = props => {

    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

    const cartCtx = useContext(CartContext);

    const numberOfItems = cartCtx.items.reduce((currentNumber, item) => {
        return currentNumber + item.amount;
    }, 0);

    useEffect(() => {
        if (cartCtx.items.length === 0) {
            return
        }
        setBtnIsHighlighted(true);
        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300)
        return () => {
            clearTimeout(timer);
        }
    }, [cartCtx.items]);

    const btnClasses = `${styles.button} ${btnIsHighlighted && styles.bump}`;

    return <button className={btnClasses} onClick={props.onClick}>
        <span className={styles.icon}><CartIcon /></span>
        <span>Your Cart</span>
        <span className={styles.badge}>{numberOfItems}</span>
    </button>;
}

export default HeaderCartButton;