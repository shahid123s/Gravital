

const validate = (data) => {
    const errors = {};

    console.log(data)

    if (data?.fullName) {
        // Name validation (alphabets only, no spaces)
        const nameRegex = /^[A-Za-z\s]{3,}$/;
        if (!data.fullName || !nameRegex.test(data.fullName)) {
            errors.fullName = "Name should only contain alphabets";
        }
    }
    if (data?.username) {
        console.log('okay')
        // Username validation (alphabets, numbers, underscores, no spaces)
        const usernameRegex = /^[A-Za-z0-9_]{5,}$/;
        if (!data.username || !usernameRegex.test(data.username)) {
            errors.username = "Username should only contain letters, numbers, and underscores (no spaces).";
        }
    }


    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        errors.email = "Please provide a valid email address.";
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!data.password || !passwordRegex.test(data.password)) {
        errors.password = "Password must be at least 8 characters long, include uppercase, lowercase, a number, and a special character.";
    }

    return errors;
};

export default validate;