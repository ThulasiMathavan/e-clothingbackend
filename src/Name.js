import React,{useState} from 'react'
function Name(){
    const[name,setName]=useState("ThulsiMathavan")
    const change=(e)=>{
        setName(e.target.value)
    }
    return(
        <>
        <input type="text" value={name} onChange={change}/>
        <p>{name}</p>
        </>
    );
}
export default Name