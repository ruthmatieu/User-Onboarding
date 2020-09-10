import React, { useState } from 'react';

function Form() {
    const [info, setInfo] = useState('');
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