import React,{useEffect} from "react";
function Greet({name}){
    useEffect(()=>{
        document.title=`welcome ${name}`;},[name]
    )
    return <>Hello,{name}!</>

}
export default Greet