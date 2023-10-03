import React, { useState } from 'react';
import '../Style/style.css';

const initialState = {
  title: '',
  description: ''
};

const Form = ({dispatch,sendDataToParent}) => {

  const [state, setState] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    const id=Math.random() * 100;
    const payload={id,...state};
    if (typeof dispatch === 'function') {
      dispatch({ type: 'Submit', value: {payload}});
      sendDataToParent(payload);
      // console.log(state,'i am state');
    } else {
      console.error('dispatch is not a function');
    }
    setState(initialState);
  };

  const handleChange = (e, field) => {
    setState({
      ...state,
      [field]: e.target.value
    });
  };

  return (
    <>
    <nav id='navbar'><h1>TODO</h1></nav>
      <form id='myForm' onSubmit={handleSubmit}>
        <h2>Todo App</h2>
        <input
          className='input-field'
          placeholder='Title'
          value={state.title}
          onChange={(e) => handleChange(e, 'title')}
        />
        <input
          className='input-field'
          placeholder='Description'
          value={state.description}
          onChange={(e) => handleChange(e, 'description')}
        />
        <button id='submit-btn' className='fa fa-plus'></button>
      </form>
    </>
  );
};

export default Form;
