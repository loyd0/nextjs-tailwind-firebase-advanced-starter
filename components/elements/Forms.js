import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';




export const FormGroup = (props) => {
    const { className, ...restProps } = props;
    return <div
        {...restProps}
        className={`font-light ${className}`}
    />
}


export const Input = React.forwardRef((props, ref) => {
    const { className="text-gray-800", ...restProps } = props;
    return <input
        ref={ref}
        {...restProps}
        className={`block border border-gray-200 rounded w-full py-2 pl-3 pr-1 my-2 ${className}`}
    />
})

export const SubmitButton = React.forwardRef((props, ref) => {
    const { className="bg-gray-200 hover:bg-gray-300 my-2", ...restProps } = props;
    return <button
        ref={ref}
        {...restProps}
        className={`block w-full py-2 rounded ${className}`}
        type="submit"
    />
})

export const DisabledButton = React.forwardRef((props, ref) => {
    const { className="border border-gray-200 my-2", ...restProps } = props;
    return <button
        ref={ref}
        disabled
        {...restProps}
        className={`block w-full rounded cursor-default opacity-50 py-2 ${className}`}
    />
})


export const Label = React.forwardRef((props, ref) => {
    const { className="text-sm", children } = props;
    return <label
        htmlFor={props.for}
        ref={ref}
        className={`block w-full font-thin ${className}`}
    >{children}</label>
})

export const FormError = ({ className="text-xs text-red-800", children, ...restProps }) =>
    <span className={`block ${className}`} {...restProps}>
        <FontAwesomeIcon className="mr-1" icon={faExclamationTriangle} />
        {children}
    </span>