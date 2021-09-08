import React, {useState} from "react";
import { gql, useLazyQuery ,useQuery } from '@apollo/client';

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

// const GET_USER = gql`
//   query GetUser($username: ID!) {
//     user(username: $username)
//     username
//     first_name
//     last_name
//     message {
//       id
//       body
//       user {
//         username
//       }
//     }
//   }
// `;


const GET_USER = gql`
  query user($username: ID!) {
    user(username: $username){
      username
      first_name
      last_name
    }
  }
`;

function UserGet() {

  const [username, setUsername] = useState<string>("");

  const [que, {loading, error, data} ]= useLazyQuery<userData>(GET_USER, {variables:{username}});

  console.log(data," IAM")

  function submit(evt:  React.FormEvent){
     evt.preventDefault()
     que({variables:{username}})
  }
  if (loading || error || !data) { return <div>
    
      
    <form className="Search-Form"  onSubmit={ submit } >

      <input name="username" id="username" onChange={(evt) => setUsername(evt.target.value) }/>
      <button type="submit">Get SW Facts</button>
    </form>
      
      
      </div> };




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