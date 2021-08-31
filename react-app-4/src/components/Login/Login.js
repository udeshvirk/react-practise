import React, { useContext, useEffect, useReducer, useRef, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';

const userInput = 'USER_INPUT';
const blurInput = 'BLUR_INPUT';

const emailReducer = (state, action) => {
    if (action.type === userInput) {
        return { value: action.val, isValid: action.val.includes('@') }
    }
    if (action.type === blurInput) {
        return { value: state.value, isValid: state.value.includes('@') }
    }
    return { value: '', isValid: null };
}

const passwordReducer = (state, action) => {
    if (action.type === userInput) {
        return { value: action.val, isValid: action.val.trim().length > 6 }
    }
    if (action.type === blurInput) {
        return { value: state.value, isValid: state.value.trim().length > 6 }
    }
    return { value: '', isValid: null };
}

const Login = () => {
    const ctx = useContext(AuthContext);
    const [formIsValid, setFormIsValid] = useState(false);
    const [emailState, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: null });
    const [passwordState, dispatchPassword] = useReducer(passwordReducer, { value: '', isValid: null });

    const emailInputRef = useRef();
    const passwordInputRef = useRef();


    const { isValid: emailIsValid } = emailState;
    const { isValid: passwordIsValid } = passwordState;

    useEffect(() => {
        const identifier = setTimeout(() => {
            setFormIsValid(
                emailIsValid && passwordIsValid
            );
        }, 500);
        return () => {
            clearTimeout(identifier);
        };

    }, [emailIsValid, passwordIsValid])

    const emailChangeHandler = (event) => {
        dispatchEmail({ type: userInput, val: event.target.value });
        setFormIsValid(
            event.target.value.includes('@') && passwordState.isValid
        );
    };

    const passwordChangeHandler = (event) => {
        dispatchPassword({ type: userInput, val: event.target.value });
        setFormIsValid(
            event.target.value.trim().length > 6 && emailState.isValid
        );
    };

    const validateEmailHandler = () => {
        dispatchEmail({ type: blurInput });
    };

    const validatePasswordHandler = () => {
        dispatchPassword({ type: blurInput });
    };

    const submitHandler = (event) => {
        event.preventDefault();
        if (formIsValid) {
            ctx.onLogin(emailState.value, passwordState.value);
        } else if (!emailIsValid) {
            emailInputRef.current.focus();
        } else {
            passwordInputRef.current.focus();
        }
    };

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <Input isValid={emailState.isValid} label="E-Mail" id="email" type="email" value={emailState.value}
                    onChange={emailChangeHandler}
                    onBlur={validateEmailHandler}
                    ref={emailInputRef} />
                <Input isValid={passwordState.isValid} label="Password" id="password" type="password" value={passwordState.value}
                    onChange={passwordChangeHandler}
                    onBlur={validatePasswordHandler}
                    ref={passwordInputRef} />
                <div className={classes.actions}>
                    <Button type="submit" className={classes.btn}>
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;
