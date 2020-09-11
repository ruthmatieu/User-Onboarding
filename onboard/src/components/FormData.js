  
import React from 'react';

const FormData = (props) => {

  return (
    <div className="display-results">
      {props.results.map((item) => (
        
        <div key={item.id}>
          <h2>{item.name}</h2>
          <p>{item.email}</p>
          <p>{item.role}</p>
          <p>{item.password}</p>
        </div>
      ))}
    </div>
  );
}

export default FormData;