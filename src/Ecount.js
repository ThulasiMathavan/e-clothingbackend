import React,{useState,useEffect} from "react";
function Ecount(){
    const[count,setcount]=useState(0)
    useEffect(()=>{
        document.title=`count ${count}`;
      
    },[count]);

return(
    <>
    <p>count:{count}</p>
    <button onClick={()=>setcount(count +1)}>increment</button>
    <button onClick={()=>setcount(count -1)}>decrement</button>
</>
);
}
export default Ecount