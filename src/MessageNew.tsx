import React, {useState} from "react";
import { gql, useQuery, useMutation } from '@apollo/client';

const ADD_MESSAGE=gql`
  mutation AddMessage($username: ID!, $body: String!) {
    createMessage(username: $username, body: $body) {
      id
      body
      user {
        username
      }
    }
  }
`;

function MessageNew() {

  const [ body, setBody ] = useState<string>("");
  const [ username, setUsername ] = useState<string>("");

  const [ createMessage, {data, loading, error} ] = useMutation(ADD_MESSAGE);

  function onSubmit(evt: React.FormEvent) {
    evt.preventDefault();
    createMessage( {variables: { username, body }})
  }

  return (
    <div>
      <form
        onSubmit = { e => {
          e.preventDefault();
          createMessage( { variables: {
            username,
            body
          }});
        }}
      >

        <label htmlFor="username">Username</label>
        <input
          id = "username"
          name = "username"
          onChange = { evt => setUsername(evt.target.value)}
          value = {username}
        />

        <label htmlFor="body">Body</label>
        <input
          id = "body"
          name = "body"
          onChange = {evt => setBody(evt.target.value)}
          value = {body}
        />

        <button type = "submit">Add Message</button>

      </form>
    </div>
  )
}

export default MessageNew;