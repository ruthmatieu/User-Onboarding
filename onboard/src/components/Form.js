import React, { useState } from 'react';
import * as yup from "yup";
import axios from "axios";

const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field."),
    email: yup.string().email().required("Must include a valid email."),
    password: yup.string().required(),
    checkbox: yup.boolean().oneOf([true], "Must agree to Terms and Conditions")
    
})

function Form() {

    const [formInfo, setFormInfo] = useState({
        name: '',
        email: '',
        password: '',
        checkbox: false
    });

    const changeHandler = (e) => {
        e.persist()
        validateForm(e);

        let value = 
            e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormInfo({...formInfo, [e.target.name]: value})
    }
    const onSubmit = (e) => {
        e.preventDefault();
            
    }

    const [errorState, setErrorState] = useState({
        name: '',
        email: '',
        password: '',
        checkbox: ''
    });

    const validate = (e) => {
        yup
            .reach(formSchema, e.target.name)
            .validate(e.target.value)
            .then(valid => {
                setErrorState({
                    ...errorState,
                    [e.target.name]: ''
                });
            })
            .catch(err => {
                setErrorState({
                    ...errorState,
                    [e.target.name]: err.errors[0]
                });
            });
    }
    return (
        <form>
            <label htmlFor="name"></label>
            <input
                type="text"
                id="name"
                name="name"
                value={formInfo.name}
                onChange={changeHandler}
            />

            <label htmlFor="email"></label>
            <input
                type="text"
                id="email"
                name="email"
                value={formInfo.email}
                onChange={changeHandler}
            />

            <label htmlFor="password"></label>
            <input
                type="password"
                id="password"
                name="password"
                value={formInfo.password}
                onChange={changeHandler}
            />

            <input
                type="checkbox"
                id="checkbox"
                name="checkbox"
                checked={formInfo.checkbox}
                onChange={changeHandler}
            />
            <label htmlFor="checkbox">I agree to the Terms and Conditions</label>
        
            <button>Submit</button>
        </form>
    )
}

export default Form;