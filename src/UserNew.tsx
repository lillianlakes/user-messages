import React, {useState} from "react";

function UserNew() {

  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name:""
  });

  function handleSubmit(evt: React.FormEvent) {
    evt.preventDefault();
    
  }

  function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const {name, value} = evt.target;
    setFormData(d => ({...d, [name]: value}));
  }
}

export default UserNew;