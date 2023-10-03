import Data_list from "./JSX Components/data-list";
import { useReducer,useEffect, useState } from "react";
// import Form from "./JSX Components/Form";
import Form from "./Crud";

const initialState = {
  arrState:[]
}

export function formReducer(state, action){
switch (action.type){
case 'Title':
    return{...state,title:action.value};
case 'Description':
  return{...state,description:action.value};
  case 'Submit':
    console.log(state,'======')
    initialState.arrState.push(state);
    console.log( initialState.arrState,'---arrstate---')
      return{
        ...state,
        arrState: [...(state.arrState || []),{title: state.title, description: state.description }]
      };
    case 'DELETE_USER':
      console.log('===delete====', action.payload)
      return {
        ...state,
        arrState:action.payload, 
        // arrState: state.arrState.filter((user) => user !== action.payload)
      };
      case 'SET_STATE':
        return { ...action.value };
  default:
    return state
}
}
function App() {
  const [state, dispatch]=useReducer(formReducer,initialState)

 const handleDataFromChild = (childState) => {
    dispatch({ type: 'SET_STATE', value: childState });
  };
 return (
    <>
    {/* <Form dispatch={dispatch} sendDataToParent={handleDataFromChild} />
    <Data_list arrState={initialState.arrState} dispatch={dispatch} /> */}
    <Form/>
    </> 
  );

}

export default App;
