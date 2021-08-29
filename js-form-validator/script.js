window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirm = document.getElementById('confirm');

    //Show input error message
    const showError = (input, message) => {
        const formControl = input.parentElement;
        formControl.classList.add('error');
        formControl.classList.remove('success');

        const small = formControl.querySelector('small');
        small.innerText = message;
    }

    //Show success outline
    const showSuccess = (input, message) => {
        const formControl = input.parentElement;
        formControl.classList.add('success');
        formControl.classList.remove('error');
    }

    //Check email is valid

    const checkEmail = (input) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        re.test(input.value.trim()) ?
            showSuccess(input) :
            showError(input, 'Email is not valid')
    }

    //Check password match

    const checkPasswordMatch = (input, match) => {
        input.value !== match.value ?
            showError(match, 'Passwords do not match') :
            ''
    }

    //Get fieldname

    const getFieldName = input =>
        input.id.charAt(0).toUpperCase() + input.id.slice(1);

    //Check required fields

    const checkRequired = inputArr => {
        inputArr.forEach((input) => {
            input.value.trim() === '' ?
                showError(input, `${getFieldName(input)} is required`) :
                showSuccess(input);
        });
    }

    //Check input length

    const checkLength = (input, min, max) => {
        input.value.length < min ?
            showError(input, `${getFieldName(input)} must be at least ${min} characters`) :
            input.value.length > max ?
                showError(input, `${getFieldName(input)} must be less than ${max} characters`) :
                showSuccess(input);
    }

    //Event listeners
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        checkRequired([username, email, password, confirm]);
        checkLength(username, 3, 16);
        checkLength(password, 4, 24);
        checkEmail(email);
        checkPasswordMatch(password, confirm);
    })
});