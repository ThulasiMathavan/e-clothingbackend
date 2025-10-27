import React, { useState, useEffect } from "react";

function Test() {
  const [count, setCount] = useState(0);
  const [cal, setCal] = useState(0);

  useEffect(() => {
    setCal(count + 1);
  }, [count]);

  return (
    <>
      <p>cal: {cal}</p>
      <button onClick={() => setCount(count + 1)}>count: {count}</button>
    </>
  );
}

export default Test;
