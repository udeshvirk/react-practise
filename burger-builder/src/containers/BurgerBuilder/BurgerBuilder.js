import React, { Component } from 'react';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.2
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasing: false,
        loading: false
    }

    addIngredienthandler = (type) => {
        const ingredients = { ...this.state.ingredients };
        ingredients[type] = ingredients[type] + 1;
        const oldPrice = this.state.totalPrice;
        const priceAddition = INGREDIENT_PRICES[type];
        const newPrice = oldPrice + priceAddition;
        this.setState({
            ingredients: ingredients,
            totalPrice: newPrice
        });
    }

    removeIngredienthandler = (type) => {
        const ingredients = { ...this.state.ingredients };
        if (ingredients[type] > 0) {
            ingredients[type] = ingredients[type] - 1;
            const oldPrice = this.state.totalPrice;
            const priceDeduction = INGREDIENT_PRICES[type];
            const newPrice = oldPrice - priceDeduction;
            this.setState({
                ingredients: ingredients,
                totalPrice: newPrice
            });
        }
    }

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(request => {
                this.setState({ ingredients: request.data })
            })
            .catch(error => {
                console.log(error);
            })
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        });
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        });
    }

    purchaseContinueHandler = () => {
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: "Udesh Kumar",
                address: {
                    city: "bangalore",
                    country: "India",
                    zipcode: "560100"
                },
                email: "udeshvirk@gmail.com"
            },
            deliveryMethod: "fastest"
        }
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({ loading: false, purchasing: false });
            })
            .catch(error => {
                console.log(error);
                this.setState({ loading: false, purchasing: false });
            });
    }

    render() {

        const disableInfo = { ...this.state.ingredients };
        let purchasable = false;
        for (let key in disableInfo) {
            if (disableInfo[key] > 0) {
                purchasable = true;
            }
            disableInfo[key] = disableInfo[key] <= 0;
        }
        let burger = <Spinner />;
        let orderSummaryContent = null;
        if (this.state.ingredients) {
            orderSummaryContent = <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                purchaseCancel={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler} />;
            if (this.state.loading) {
                orderSummaryContent = <Spinner />;
            }
            burger = (
                <>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredienthandler}
                        ingredientRemoved={this.removeIngredienthandler}
                        disabled={disableInfo}
                        purchasable={purchasable}
                        price={this.state.totalPrice}
                        ordered={this.purchaseHandler}
                    />
                </>
            );
        }
        return (
            <>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummaryContent}
                </Modal>
                {burger}
            </>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);