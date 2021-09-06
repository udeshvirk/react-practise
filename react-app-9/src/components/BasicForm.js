import useInput from "../hooks/use-input";
const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const isEmpty = value => value.trim() !== '';
const isValidEmail = value => validEmailRegex.test(value);
const BasicForm = (props) => {

    const {
        value: firstName,
        inputBlurHandler: firstNameBlurHandler,
        valueChangeHandler: firstNameChangeHandler,
        isValid: firstNameIsValid,
        hasError: firstNameHasError,
        reset: resetFirstName
    } = useInput(isEmpty)
    const {
        value: lastName,
        inputBlurHandler: lastNameBlurHandler,
        valueChangeHandler: lastNameChangeHandler,
        isValid: lastNameIsValid,
        hasError: lastNameHasError,
        reset: resetLastName
    } = useInput(isEmpty)
    const {
        value: email,
        inputBlurHandler: emailBlurHandler,
        valueChangeHandler: emailChangeHandler,
        isValid: emailIsValid,
        hasError: emailHasError,
        reset: resetEmail
    } = useInput((val) => {
        return isEmpty(val) && isValidEmail(val);
    })
    const isFormValid = firstNameIsValid && lastNameIsValid && emailIsValid;

    const fomSubmitHandler = event => {
        event.preventDefault();
        if (!isFormValid) {
            return true;
        }
        console.log({ firstName, lastName, email });
        resetFirstName();
        resetLastName();
        resetEmail();
    };
    return (
        <form onSubmit={fomSubmitHandler}>
            <div className='control-group'>
                <div className={`form-control ${firstNameHasError && 'invalid'}`}>
                    <label htmlFor='firstname'>First Name</label>
                    <input type='text' value={firstName} onBlur={firstNameBlurHandler}
                        onChange={firstNameChangeHandler} id='firstname' />
                    {firstNameHasError && <p className="error-text">First name can't be empty</p>}
                </div>
                <div className={`form-control ${lastNameHasError && 'invalid'}`}>
                    <label htmlFor='lastname'>Last Name</label>
                    <input type='text' id='lastname' value={lastName} onChange={lastNameChangeHandler}
                        onBlur={lastNameBlurHandler} />
                    {lastNameHasError && <p className="error-text">Last name can't be empty</p>}
                </div>
            </div>
            <div className={`form-control ${emailHasError && 'invalid'}`}>
                <label htmlFor='email'>E-Mail Address</label>
                <input type='text' id='email' value={email} onChange={emailChangeHandler}
                    onBlur={emailBlurHandler} />
                {emailHasError && <p className="error-text">Email is not valid</p>}
            </div>
            <div className='form-actions'>
                <button disabled={!isFormValid}>Submit</button>
            </div>
        </form>
    );
};

export default BasicForm;
