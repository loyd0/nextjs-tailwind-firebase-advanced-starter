import PropTypes from 'prop-types'
import { useForm } from "react-hook-form";
import { validateEmail } from '../../utils/general/validation';
import { Input, SubmitButton, DisabledButton, FormError, Label, FormGroup } from '../elements/Forms';
import handleFormErrors from '../../utils/general/handleFormErrors';


const Login = ({ 
        onSubmit=((d) => console.log(d)),
        onSuccess,
        className,
        labelClassName,
        submitClassName,
        inputClassName,
        errorClassName,
        disabledClassName,
        ...restProps
    }) => {

    const { register, handleSubmit, watch, setError, errors, formState } = useForm({ mode: 'onBlur', });
    const { isSubmitting, isValid } = formState;

    // Remove the confirmPassword data
    const cleanData = async (data) => {
        const response = await onSubmit(data)
        if ( !response) {
            throw new Error("Submit function failed. Probably didn't add one as a prop.")  
        }

        // Check for error
        if (response.code) {
            // handle errors
            return handleFormErrors(response.code, setError)
        }
        // if no errors use the onSuccess function
        return onSuccess && onSuccess(response) 
    }
    return (
        < form  
            { ...restProps}
            className={`space-y-4 ${className}`} 
            name="login" 
            onSubmit={handleSubmit(cleanData)} >
            {/* register your input into the hook by invoking the "register" function */}
            <FormGroup>
                <Label className={labelClassName} for="email">Enter your email</Label>
                <Input
                    className={inputClassName}
                    name="email"
                    type="email"
                    placeholder="email@example.com"
                    ref={register({ required: true, validate: email => validateEmail(email) })}
                />
                {errors.email?.type === "validate" && <FormError className={errorClassName}>Please enter a valid email</FormError>}
                {errors.email && <FormError className={errorClassName}>Your email is required</FormError>}
            </ FormGroup>


            <FormGroup>
                <Label className={labelClassName} for="password">Enter your password</Label>
                <Input
                    className={inputClassName}
                    name="password"
                    type="password"
                    placeholder="*********"
                    ref={register({ required: true })} />
                {/* errors will return when field validation fails  */}
                {errors.password && <FormError className={errorClassName}>Please enter your password</FormError>}
            </FormGroup>

            { errors.login  && <FormError className={errorClassName}>{errors.notFound.message}</FormError>}

            {!isValid || isSubmitting ?
                <DisabledButton className={disabledClassName}>{isSubmitting ? "Logging In..." : "Login"}</DisabledButton> :
                <SubmitButton className={submitClassName} type="submit" >Login</SubmitButton>}
        </form >
    )
}

Login.propTypes = {

}

export default Login
