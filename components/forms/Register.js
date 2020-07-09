import PropTypes from 'prop-types'
import { useForm } from "react-hook-form";
import { validateEmail } from '../../utils/general/validation';
import { Input, SubmitButton, DisabledButton, Label, FormError, FormGroup } from '../elements/Forms';
import handleFormErrors from '../../utils/general/handleFormErrors';


const Register = ({
    onSubmit = ((d) => console.log(d)),
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

    const cleanData = async (data) => {
        const { confirmPassword, ...restData } = data

        const response = await onSubmit(restData)
        
        if ( !response) {
            throw new Error("Submit function failed. Probably didn't add one as a prop.")  
        }
        // Check for error
        if (response.code) {
            // handle errors
            return handleFormErrors(response.code, setError)
        }
        // if no errors use the onSuccess function
        return onSuccess(response)
    }
    return (
        < form
            {...restProps}
            className={`space-y-4 ${className}`}
            name="Register"
            onSubmit={handleSubmit(cleanData)}
        >

            <FormGroup>
                <Label className={labelClassName} for="email">Enter your name</Label>
                <Input
                    className={inputClassName}
                    name="name"
                    type="text"
                    placeholder="First Last"
                    ref={register({ required: true, validate: name => name && /(\W\w+)/.test(name) })}
                />
                {errors.name && <FormError className={errorClassName}>Your full name is required</FormError>}
            </FormGroup>
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
                {errors.email && errors.email.alreadyExists && <FormError className={errorClassName}>{errors.email.alreadyExists.message}</FormError>}

            </FormGroup>

            <FormGroup>
                <Label className={labelClassName} for="password">Enter a password</Label>
                < Input
                    className={inputClassName}
                    name="password"
                    type="password"
                    placeholder="*********"
                    ref={register({ required: true, min: 6 })} />
                {errors.password && <FormError className={errorClassName}>Please enter your password</FormError>}
            </FormGroup>

            <FormGroup>
                <Label className={labelClassName} for="confirmPassword">Please confirm your password</Label>

                < Input
                    className={inputClassName}
                    name="confirmPassword"
                    type="password"
                    placeholder="*********"
                    ref={register({ required: true, validate: value => watch('password') === value })} />
                {errors.confirmPassword?.type === "required" && <FormError className={errorClassName}>Please confirm your password</FormError>}
                {errors.confirmPassword?.type === "validate" && <FormError className={errorClassName}>Please make sure both your passwords are the same.</FormError>}
            </FormGroup>

            {!isValid || isSubmitting ?
                <DisabledButton className={disabledClassName}>{isSubmitting ? "Logging In..." : "Register"}</DisabledButton> :
                <SubmitButton className={submitClassName} type="submit" >Register</SubmitButton>}
        </form >
    )
}

Register.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired,
    className: PropTypes.string,
    labelClassName: PropTypes.string,
    submitClassName: PropTypes.string,
    inputClassName: PropTypes.string,
    errorClassName: PropTypes.string,
    disabledClassName: PropTypes.string,
}

export default Register
