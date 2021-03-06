import React from 'react';
import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';


const burger = props => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />
            })
        })
        .reduce((arr, ele) => {
            return arr.concat(ele);
        }, []);
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients</p>;
    }
    return (
        <div className={styles.Burger}>
            <BurgerIngredient type="burger-top" />
            {transformedIngredients}
            <BurgerIngredient type="burger-bottom" />
        </div>
    );
}

export default burger;