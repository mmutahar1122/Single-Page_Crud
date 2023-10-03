import '../Style/style.css'

const Data_list = ({arrState,dispatch}) => {

    console.log("arrState.....",arrState);
    const handleDelete = (userID) => () => {
        alert("done")
        const filtered = arrState.filter((users) => users.id !== userID)
        console.log(filtered,'filtered');
        dispatch({ type: 'DELETE_USER', payload: filtered });
    }
    

    return (
        <>
            <div id='main-Container'>
                {arrState && arrState.map((user)=>{
                    return<>
            <div id='Discription-Container'>
                <h3 id="Title">{user.title}</h3>
                <p id='Description'>{user.description}</p>
                <button id='Delete-btn'  onClick={handleDelete(user.id)}><i className="fa fa-trash-o" style={{fontSize:'20px', color:'white'}}></i></button>
                <button id='Update-btn'><i className="fa fa-edit" style={{fontSize:'20px', color:'white'}}></i></button>
            </div>

                </>
            })}
            </div>


        </>
    );
}

export default Data_list;