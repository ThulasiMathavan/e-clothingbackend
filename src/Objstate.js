import React, { useState } from "react";

function Obj() {
  const [username, setName] = useState({
    user: { Firstname: "", Lastname: "" },
    age: 25
  });

  const First = (e) => {
    setName(prev => ({
      ...prev,
      user: { ...prev.user, Firstname: e.target.value }
    }));
  };

  const Last = (e) => {
    setName(prev => ({
      ...prev,
      user: { ...prev.user, Lastname: e.target.value }
    }));
  };

  return (
    <>
      <input
        type="text"
        value={username.user.Firstname}
        onChange={First}
        placeholder="Enter first name"
      />
      <input
        type="text"
        value={username.user.Lastname}
        onChange={Last}
        placeholder="Enter last name"
      />
      <p>Firstname: {username.user.Firstname}</p>
      <p>Lastname: {username.user.Lastname}</p>
      <p>Age: {username.age}</p>
    </>
  );
}

export default Obj;
