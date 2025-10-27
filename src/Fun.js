import React ,{useState} from 'react';
const cal=()=>{
    let num=10
    return num
};
function Fun(){
    const[value,setvalue]=useState(()=>cal())
    return(

               <>
                 <p>value:{value}</p>
                </>
);
};
export default Fun