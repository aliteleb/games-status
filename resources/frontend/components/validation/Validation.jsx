function Validation(formValues) {

    let username_pattern = /^[A-Za-z][A-Za-z\d]{7,24}$/
    let password_pattern = /^.{8,}$/
    let email_pattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/

    return {
        username: formValues.username === "" ? "" :
            username_pattern.test(formValues.username) ? "Valid username" : "Invalid username",

        password: formValues.password === "" || password_pattern.test(formValues.password) ? "" :
            "Password must be at least 8 characters",

        email: formValues.email === "" ? "" :
            email_pattern.test(formValues.email) ? "Valid email address" : "Invalid email address",
    }

}

export default Validation
