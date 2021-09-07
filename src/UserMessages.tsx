import React, {useState} from "react";
import { gql, useQuery, useMutation } from '@apollo/client';

// const ADD_USER =gql`
// mutation AddUser($username: Username!, $firstName: FirstName!, $lastName: LastName!){
//     createUser(username: $username, first_name: $firstName, last_name: $lastName){
//       username
//       first_name
//       last_name
//     }
//   }
// `;

interface Input  {
  username:string,
  firstName: string,
  lastName: string,

}

const ADD_USER =gql`
mutation AddUser($username:ID!, $firstName: String!, $lastName: String!){
    createUser(username: $username, first_name: $firstName, last_name: $lastName){
      username
      first_name
      last_name
    }
  }
`;

function UserMessages() {

  // Forms
    // add user
  
  // let username ;
  // let first_name;
  // let last_name;



  // const [createUser, {data, loading, error}] = useMutation(ADD_USER, {
  //   variable: {
  //     username: "Username",
  //     first_name: "First Name",
  //     last_name: "Last Name"
  //   },
  // });

  const [ username, setUsername ] = useState<string>("")
  const [ firstName, setFirstName ] = useState<string>("")
  const [ lastName, setLastName ] = useState<string>("")




  const [createUser, {data, loading, error} ] = useMutation(ADD_USER);


  // if (loading) return 'Still loading...';
  // if (error) return `Submission error: ${error.message}`;

  // For each user, form:
    // create message
    // delete message

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
            username: username ,
            firstName: firstName, 
            lastName: lastName
          }});
        }}
        >
   
        <input
          id="username"
          name="username"
          onChange={ (evt) => setUsername(evt.target.value)}
          value={username}
        />

        <input
          id="firstName"
          name="firstName"
          onChange={ (evt) => setFirstName(evt.target.value)}
          value={firstName}
        />

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

export default UserMessages;