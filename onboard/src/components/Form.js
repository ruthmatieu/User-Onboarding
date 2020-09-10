import React, { useState } from 'react';
import * as yup from "yup";
import axios from "axios";



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

    return (
        <form>
            <label htmlFor="name"></label>
            <input
                type="text"
                id="name"
                name="name"
                onChange={info}
            />

            <label htmlFor="email"></label>
            <input
                type="text"
                id="email"
                name="email"
                onChange={info}
            />

            <label htmlFor="password"></label>
            <input
                type="password"
                id="password"
                name="password"
                onChange={info}
            />

            <input
                type="checkbox"
                id="checkbox"
                name="checkbox"
                value="terms of service"
            />
            <label htmlFor="checkbox">Terms of service</label>
        
            <button>Submit</button>
        </form>
    )
}

export default Form;