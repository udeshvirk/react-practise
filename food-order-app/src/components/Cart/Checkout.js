import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;

const Checkout = (props) => {

    const [formValidity, setFormValidity] = useState({
        name: true,
        street: true,
        city: true,
        postal: true,
    });

    const nameRef = useRef();
    const streetRef = useRef();
    const postalRef = useRef();
    const cityRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();
        const name = nameRef.current.value;
        const street = streetRef.current.value;
        const postal = postalRef.current.value;
        const city = cityRef.current.value;

        const nameIsValid = !isEmpty(name);
        const streetIsValid = !isEmpty(street);
        const postalIsValid = isFiveChars(postal);
        const cityIsValid = !isEmpty(city);

        setFormValidity({
            name: nameIsValid,
            street: streetIsValid,
            postal: postalIsValid,
            city: cityIsValid,
        })

        const formIsValid = nameIsValid && streetIsValid && postalIsValid && cityIsValid;
        if (!formIsValid) {
            return;
        }
        props.onConfirm({
            name, street, postal, city
        })
    };

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={`${classes.control} ${!formValidity.name && classes.invalid}`}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' ref={nameRef} id='name' />
                {!formValidity.name && <p>Please enter valid name!</p>}
            </div>
            <div className={`${classes.control} ${!formValidity.street && classes.invalid}`}>
                <label htmlFor='street'>Street</label>
                <input type='text' ref={streetRef} id='street' />
                {!formValidity.street && <p>Please enter valid street!</p>}
            </div>
            <div className={`${classes.control} ${!formValidity.postal && classes.invalid}`}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' ref={postalRef} id='postal' />
                {!formValidity.postal && <p>Please enter valid postal!</p>}
            </div>
            <div className={`${classes.control} ${!formValidity.city && classes.invalid}`}>
                <label htmlFor='city'>City</label>
                <input type='text' ref={cityRef} id='city' />
                {!formValidity.city && <p>Please enter valid city!</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;