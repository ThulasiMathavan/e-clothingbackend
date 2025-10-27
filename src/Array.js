import React,{useState} from 'react'
function Array(){
    const[list,setlist]=useState([])
    const add=()=>{
        setlist([...list,{name:"mathavan",id:111}])
    }
    return(
        <>
        <button onClick={add}>click to see the array details</button>
        <p>list of array</p>
        <ul>
            {list.map(list=>(
                <li key={list.id}>{list.name}</li>
                
            ))}
        </ul>
        </>
    );
}
export default Array