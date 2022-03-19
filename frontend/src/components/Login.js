import React, { Component } from 'react'
import { RenderFooter } from './App'
export class Login extends Component {
  render() {
    return (
      <div>
        <h1>Login</h1>
        <p><pre>Anmeldung (admin:password/user:abc)           currently logged in as: <label id="account">not logged in</label></pre></p>
        <label for="user">Username</label>
        <br/>
        <input id="user" type="text"></input>
        <br/>
        <label for="password">Passwort</label>
        <br/>
        <input id="password" type="password"></input>
        <br/>
        <input type="submit" value="log in" onClick={login}></input>
        <input type="submit" value="log out" onClick={logout}></input>
        <RenderFooter />
      </div>
    )
  }
}
function login() {
  let users = { "admin": "password", "user": "abc" };
  let user = document.getElementById("user").value;
  let password = document.getElementById("password").value;

  if (user in users) {
    if (password === users[user]) {
      alert("successfully logged in");
      document.getElementById("account").innerHTML = user
    }
    else {
      alert("wrong password");
    }
  }
  else {
    alert("user does not exist");
  }
}

function logout() {
  document.getElementById("account").innerHTML = "not logged in";
}

export default Login