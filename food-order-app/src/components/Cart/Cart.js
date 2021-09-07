import React, { useContext, useState } from 'react';
import CartItem from './CartItem';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import styles from './Cart.module.css';
import Checkout from './Checkout';

const Cart = props => {

    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };
    const cartItemAddHandler = item => {
        cartCtx.addItem({ ...item, amount: 1 });
    };

    const cartItems = (
        <ul className={styles['cart-items']}>
            {cartCtx.items.map(item => (
                <CartItem key={item.id}
                    name={item.name}
                    price={item.price}
                    amount={item.amount}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                >
                    {item.name}
                </CartItem>
            ))}
        </ul>);

    const orderHandler = () => {
        setIsCheckout(true);
    }
    const submitCarthandler = async (userData) => {
        setIsSubmitting(true);
        const response = await fetch('https://react-http-a3344-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        })
        setIsSubmitting(false);
        setSubmitSuccess(true);
        cartCtx.clearCart();
    };
    const modalActions = <div className={styles.actions}>
        <button className={styles['button--alt']} onClick={props.onClose}>Close</button>
        {hasItems && <button className={styles.button} onClick={orderHandler}>Order</button>}
    </div>;

    const cartModalContent = (
        <React.Fragment>
            {cartItems}
            <div className={styles.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onConfirm={submitCarthandler} onCancel={props.onClose} />}
            {!isCheckout && modalActions}
        </React.Fragment>
    );
    const isSubmittingContent = <p>Sending order data....</p>;
    const submitSuccessContent = (
        <React.Fragment>
            <p>Successfully sent the order!</p>
            <div className={styles.actions}>
                <button className={styles['button--alt']} onClick={props.onClose}>Close</button>
            </div>
        </React.Fragment>
    );
    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !submitSuccess && cartModalContent}
            {isSubmitting && isSubmittingContent}
            {!isSubmitting && submitSuccess && submitSuccessContent}
        </Modal>
    );
};

export default Cart;