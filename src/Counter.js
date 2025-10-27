import React, { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    const increment = () => {
        if(count<10){
            setCount(prevCount => prevCount + 1);
        }
    }
    const decrement=()=>{
        if(count>0){
        setCount(prevcount => prevcount-1)
    }}

    return (
        <>
            <p>count: {count}</p>
            {count ===10 &&<p>cannot increment futher reached 10</p>}
            <button onClick={decrement}>Decrement</button>
            <button onClick={increment}>Increment</button>
            <br></br>
        </>
    );
}

export default Counter;
