import React, {useState} from "react";
import { gql, useMutation } from '@apollo/client';

const ADD_USER =gql`
mutation AddUser($username:ID!, $firstName: String!, $lastName: String!){
    createUser(username: $username, first_name: $firstName, last_name: $lastName){
      username
      first_name
      last_name
    }
  }
`;

function UserNew() {

  const [ username, setUsername ] = useState<string>("")
  const [ firstName, setFirstName ] = useState<string>("")
  const [ lastName, setLastName ] = useState<string>("")

  const [createUser, {data, loading, error} ] = useMutation(ADD_USER);

  function onSubmit(evt:React.FormEvent){
    evt.preventDefault();
    createUser( {variables:{username, firstName, lastName }} )
  }

  return (
    <div>
      <form
        onSubmit = { e => {
          e.preventDefault();
          createUser({ variables: { 
            username,
            firstName, 
            lastName
          }});
        }}
        >
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          onChange={ (evt) => setUsername(evt.target.value)}
          value={username}
        />

        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          onChange={ (evt) => setFirstName(evt.target.value)}
          value={firstName}
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          name="lastName"
          onChange={ (evt) => setLastName(evt.target.value)}
          value={lastName}
        />

        <button type = "submit">Add User</button>
      </form>
    </div>    
  )
}

export default UserNew;