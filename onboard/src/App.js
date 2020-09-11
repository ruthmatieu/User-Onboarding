import React, { useState } from 'react';
import './App.css';

//component import
import Form from './components/Form';
import FormData from './components/FormData';

function App() {

  const [data, setData] = useState([])

  const addNewData = (item) => {

    const newData = {
      id: Date.now(),
      name: item.name,
      email: item.email,
      password: item.password
    };
    setData([...data, newData])
  }
  return (
    <div className="App">
      <Form addNewData={addNewData}/>
      <FormData results={data}/>
    </div>
  );
}

export default App;
