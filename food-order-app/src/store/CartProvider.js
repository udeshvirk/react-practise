import { useReducer } from "react";
import CartContext from "./cart-context";

const addItem = 'ADD';
const removeItem = 'REMOVE';
const clear = 'CLEAR';

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    if (action.type === addItem) {
        const newTotalAmount = state.totalAmount + (action.item.amount * action.item.price);
        const existingIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingItem = state.items[existingIndex];
        let updatedItems;
        if (existingItem) {
            const updatedItem = {
                ...existingItem,
                amount: action.item.amount + existingItem.amount
            }
            updatedItems = [...state.items];
            updatedItems[existingIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }

        return {
            items: updatedItems,
            totalAmount: newTotalAmount
        }
    }
    if (action.type === removeItem) {
        const existingIndex = state.items.findIndex(item => item.id === action.id);
        const existingItem = state.items[existingIndex];
        const newTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems;
        if (existingItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id);
        } else {
            const updatedItem = {
                ...existingItem,
                amount: existingItem.amount - 1
            }
            updatedItems = [...state.items];
            updatedItems[existingIndex] = updatedItem;
        }
        return {
            items: updatedItems,
            totalAmount: newTotalAmount
        }
    }
    if (action.type === clear) {
        return defaultCartState;
    }
    return defaultCartState;
};

const CartProvider = props => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemHandler = (item) => {
        dispatchCartAction({
            type: addItem,
            item: item
        });
    }
    const removeItemHandler = (id) => {
        dispatchCartAction({
            type: removeItem,
            id: id
        });
    }

    const clearCartHandler = () => {
        dispatchCartAction({
            type: clear
        });
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        clearCart: clearCartHandler,
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}
export default CartProvider