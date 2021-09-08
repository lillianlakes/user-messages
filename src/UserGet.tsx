import React, {useState} from "react";
import { gql, useQuery } from '@apollo/client';

interface message {
  ID: string,
  body: string,
  user: user
}

interface user {
  username: string,
  first_name: string,
  last_name: string,
  message: message[]
}

interface userData {
  user:user
}

const GET_USER = gql`
  query GetUser($username: ID!) {
    user(username: $username)
    username
    first_name
    last_name
    message {
      id
      body
      user {
        username
      }
    }
  }
`;

function UserGet() {

  const [queryString, setQueryString] = useState<string>("");

  const {loading, error, data} = useQuery<userData>(GET_USER);

  if (loading || error || !data) { return <div>Loading…</div> };


  <form className="Search-Form" onSubmit={handleSubmit}>
    <label htmlFor="search">Search: </label>
    <input name="term" id="term" 
    onChange={handleChange}>
      
    </input>
    <button type="submit">Get SW Facts</button>
  </form>

  function handleSearch(term: string) {
    setQueryString(term)
  }

  return (
    <div>

      {/* <Search handleSearch={handleSearch} />
 */}


      <p>Username is {data.user.username}.</p>
      <p>First name is {data.user.first_name}.</p>
      <p>Last name is {data.user.last_name}.</p>
      <ul>
        Messages include:
          {data.user.message?.map(m => (
            <li>{m.body}</li>
          ))}
      </ul>
    </div>
  )

}

export default UserGet;