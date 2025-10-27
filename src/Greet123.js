import { useEffect } from 'react';

function Greet123({ name }) {

const message = `Hello, ${name}!`;

useEffect(() => {

// Runs once, after mounting

document.title = `Greetings to ${name}`;

console.log(`Greetings to ${name}`)

}, []);

return <div>{message}</div>;

}

export default Greet123;