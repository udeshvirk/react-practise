import useInput from '../hooks/use-input';
const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const SimpleInput = (props) => {
    const { value: enteredName, hasError: nameInputHasError, isValid: enteredNameIsValid, reset: resetNameInput,
        valueChangeHandler: nameInputChangeHandler, inputBlurHandler: nameInputBlurHandler } = useInput((value) => {
            return value.trimEnd() !== '';
        });
    const { value: enteredEmail, hasError: emailInputHasError, isValid: enteredEmailIsValid, reset: resetEmailInput,
        valueChangeHandler: emailInputChangeHandler, inputBlurHandler: emailInputBlurHandler } = useInput((value) => {
            return value.trimEnd() !== '' && validEmailRegex.test(value);
        });
    const formIsValid = enteredNameIsValid && enteredEmailIsValid;
    const formSubmitHandler = event => {
        event.preventDefault();
        if (!enteredNameIsValid || !enteredNameIsValid) {
            return;
        }
        console.log({ enteredName, enteredEmail });
        resetNameInput();
        resetEmailInput();
    };
    const nameInputClasses = !nameInputHasError ? 'form-control' : 'form-control invalid';
    const emailInputClasses = !emailInputHasError ? 'form-control' : 'form-control invalid';
    return (
        <form onSubmit={formSubmitHandler}>
            <div className={nameInputClasses}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' value={enteredName} id='name' onBlur={nameInputBlurHandler} onChange={nameInputChangeHandler} />
                {nameInputHasError && <p className="error-text">Name must not be empty</p>}
            </div>
            <div className={emailInputClasses}>
                <label htmlFor='email'>Your Email</label>
                <input type='email' value={enteredEmail} id='email' onBlur={emailInputBlurHandler} onChange={emailInputChangeHandler} />
                {emailInputHasError && <p className="error-text">Email is not valid</p>}
            </div>
            <div className="form-actions">
                <button disabled={!formIsValid}>Submit</button>
            </div>
        </form>
    );
};

export default SimpleInput;
