import React, { useState } from 'react';
import * as yup from "yup";
import axios from "axios";

const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field."),
    email: yup.string().email().required("Must enter a valid email."),
    role: yup.string(),
    password: yup.string().required(),
    checkbox: yup.boolean().oneOf([true], "Must agree to Terms and Conditions")
    
})

function Form(props) {
    
    const [users, setUsers] = useState([]);

    const [formInfo, setFormInfo] = useState({
        name: '',
        email: '',
        role: '',
        password: '',
        checkbox: false
    });

    const changeHandler = (e) => {
        e.persist()
        validate(e);

        let value = 
            e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormInfo({...formInfo, [e.target.name]: value})
        setUsers({
            ...users, [e.target.name]: e.target.value
        });
    }
    const onFormSubmit = (e) => {
        e.preventDefault();
        console.log('We have received your application.');
        axios
            .post('https://reqres.in/api/users', formInfo)
            .then(res => setUsers(res))
            .catch(err => console.log(err))
        props.addNewData(users);
        setFormInfo({
            name: '',
            email: '',
            role: '',
            password: '',
            checkbox: false
        })
    }

    const [errorState, setErrorState] = useState({
        name: '',
        email: '',
        role: '',
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
        <form onSubmit={onFormSubmit}>
            <div className="form-info">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formInfo.name}
                    onChange={changeHandler}
                />
                {errorState.name.length > 0 ? (<p className="error">{errorState.name}</p>) : null}
            </div>

            <div className="form-info">
                <label htmlFor="email">Email
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={formInfo.email}
                        onChange={changeHandler}
                    />
                    {errorState.email.length > 0 ? (<p className="error">{errorState.email}</p>) : null}
            
                    {errorState.email.includes('waffle@syrup.com' ) ? (<p className="error">This email already exists</p>) : null}
                </label>
            </div>

            <div className="form-info">
                <label htmlFor="role">Department
                    <select
                        id="role"
                        name="role"
                        value={formInfo.role}
                        onChange={changeHandler}>

                        <option value={null}></option>    
                        <option value="Sales">Sales</option>
                        <option value="Customer Service">Customer Service</option>
                        <option value="Information Technology">Information Technology</option>
                        <option value="Finance">Finance</option>
                    </select>
                </label>
            </div>

            <div className="form-info">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formInfo.password}
                    onChange={changeHandler}
                />
            </div>

            <div className="form-info">
                <label htmlFor="checkbox">
                    <input
                        type="checkbox"
                        id="checkbox"
                        name="checkbox"
                        checked={formInfo.checkbox}
                        onChange={changeHandler}
                    />
                    I agree to the Terms and Conditions
                </label>
            </div>
        
            <button>Submit</button>

        </form>
    )
}

export default Form;