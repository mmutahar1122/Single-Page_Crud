import React, { useEffect, useState } from 'react'
import '../Style/style.css'



const getData=()=>{
 const data= localStorage.getItem('Products');
if(data){
  return JSON.parse(localStorage.getItem("Products"));
}else{
  return [];
}
}
const initialState={
    title:'',
    description:'',
    editMood:false,
}

const Form = () => {
    const [state,setState]=useState(initialState)
    const [arrState,setArrState]=useState(getData)
    const [errmsg,setErrMsg]=useState(initialState)
    const handleChange=(e)=>{
        setState({
            ...state,[e.target.name]: e.target.value
        }) 
        const Title=state?.title;
        const Description=state?.description;
        const titleRegex=/^[a-zA-Z -_ ]{3}[A-Za-z0-9-_ @.()]{0,20}$/;
        const descriptionRegex=/^[A-Za-z0-9@#$*& ()]{10,}$/;
        const errormessage={};
        
          if(Title.length <3){
            errormessage['title']='Title Must Greater Than 3 Character must start with letter';
          }else if(!titleRegex.test(Title)){
          errormessage['title']='Enter Valid Title';
        }

        if (!descriptionRegex.test(Description)){
          errormessage['description'] = 'Description Greater than 10 Charater'
        }
        setErrMsg(errormessage)
      
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        const {title,description,editMood,id}=state;
        if(editMood){
          const index = arrState.findIndex((users)=> users.id === state.id)
          console.log(index,'index');
            if(index !== -1){
              const obj={title,description,id};
              arrState[index]=obj;
              setState(initialState);
            }
          }else{

            const id=Math.random() * 100;
            const payload={id,...state};
            setArrState([...arrState,payload]);
            setState(initialState);
            console.log(arrState,'arrState');
          }
        }
    const updateHandle=(user)=>{
      setState({
        ...state,
        ...user,
        editMood:true
      })

    }
    const DeleteHandle = (user) => {
    const alertMessage =prompt("Are You Sure To Delete Your Message Plz Enter 'YES' ");
    if(alertMessage === 'YES' || 'yes'){
      const Filterd = arrState.filter((users) =>users.id !== user.id)
      setArrState(Filterd);}

  }
    const handleFocus=()=>{
       
    }
    useEffect(() => {
      localStorage.setItem('Products',JSON.stringify(arrState));
  }, [arrState]);
 
  return (
    <>
    <nav id='navbar'><h1>TODO</h1></nav>
      <form id='myForm' onSubmit={handleSubmit}>
        <h2>Todo App</h2>
        <input
          className='input-field'
          type='text'
          placeholder='Title'
          value={state.title}
          name='title'
          onChange={handleChange}
          required
        /> <span className='errMessage'>{errmsg?.title}</span>
        <input
          className='input-field'
          type='text'
          placeholder='Description'
          value={state.description}
          name='description'
          onChange={handleChange}
          required
        /> <span  className='errMessage'>{errmsg?.description}</span>
       {state.title && state.description && !Object.keys(errmsg).length ?
           <button 
        type='submit' 
        id='submit-btn' 
        className='fa fa-plus'
        >
          </button> 
       : 
        <button 
        type='submit' 
        id='submit-btn' 
        className='fa fa-plus'
        disabled
        style={{opacity:'80%'}}
        >
          </button>
        }
      </form>
      <div id='main-Container'>
{arrState && arrState.map((user)=>{ 
    return <>
      <div id='Discription-Container'>
                <h3 id="Title">{user.title}</h3>
                <p id='Description'>{user.description}</p>
                <button type='button' id='Delete-btn'onClick={()=> DeleteHandle(user)}  ><i className="fa fa-trash-o" style={{fontSize:'20px', color:'white'}}></i></button>
                <button type='button' id='Update-btn' onClick={() => updateHandle(user)} ><i className="fa fa-edit" style={{fontSize:'20px', color:'white'}}></i></button>
            </div>
            </>})}
            </div>
    
    </>
  )
}

export default Form