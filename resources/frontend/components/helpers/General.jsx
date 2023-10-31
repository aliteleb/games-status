

export const inputValidation = (input, errors) => {
    return errors ? (errors[input] !== undefined && <div className='text-orange-400 text-sm mt-1'>{errors[input][0]}</div>) : <></>
}