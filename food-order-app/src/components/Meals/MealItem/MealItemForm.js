import { useRef } from 'react';
import Input from '../../UI/Input';
import styles from './MealItemForm.module.css';

const MealItemForm = (props) => {
    const amountInputref = useRef();
    const submitHandler = event => {
        event.preventDefault();
        const enteredAmount = amountInputref.current.value;
        const enteredAmountNumber = +enteredAmount;
        props.onAddCartHandler(enteredAmountNumber);
    }
    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <Input
                label="Amount"
                ref={amountInputref}
                input={{
                    id: 'amount' + props.id,
                    type: 'number',
                    min: '1',
                    max: '5',
                    set: '1',
                    defaultValue: '1',
                }} />
            <button>+ Add</button>
        </form>
    );
}

export default MealItemForm;