import React, {useState} from "react";
import { gql, useQuery, userMutation } from '@apollo/client';

const ADD_USER =gql`
mutation AddUser($username: Username!, $firstName: FirstName!, $lastName: LastName!){
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
  let username, first_name, last_name;

  const [createUser, {data, loading, error}] = useMutation(ADD_USER, {
    variable: {
      username: "Username",
      first_name: "First Name",
      last_name: "Last Name"
    },
  });

  if (loading) return 'Still loading...';
  if (error) return `Submission error: ${error.message}`;

  // For each user, form:
    // create message
    // delete message

  return (
    <div>
      <form
        onSubmit = { e => {
          e.preventDefault();
          createUser({ variables: { 
            username: username.value, 
            first_name: first_name.value, 
            last_name: last_name.value
          }});
          username.value = '';
          first_name.value = '';
          last_name.value = '';
        }}
        >
        <input
          ref = { node => {
            username = node;
          }}
        />
        <input
          ref = { node => {
            first_name = node;
          }}
        />
        <input
          ref = { node => {
            last_name = node;
          }}
        />
        <button type = "submit">Add User</button>
      </form>
    </div>    
  )
}

export default UserMessages;