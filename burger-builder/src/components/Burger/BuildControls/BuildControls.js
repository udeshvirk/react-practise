import React from 'react';
import styles from './BuildControls.module.css';
import BuildControl from './BuildControls/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Meat', type: 'meat' }
]

const buildControls = props => {
    return (
        <div className={styles.BuildControls}>
        <p>Current Price: {props.price.toFixed(2)}</p>
            {controls.map(control => {
                return <BuildControl
                    key={control.type}
                    label={control.label}
                    added={() => props.ingredientAdded(control.type)}
                    removed={() => props.ingredientRemoved(control.type)}
                    disabled={props.disabled[control.type]}
                />;
            })}
            <button className={styles.OrderButton} onClick={props.ordered} disabled={!props.purchasable}>ORDER NOW</button>
        </div>
    );
}

export default buildControls;