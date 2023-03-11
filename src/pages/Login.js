import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../axios";

function Login() {

  const [token, setToken] = useState("")
  const [session, setSession] = useState("")

  useEffect(() => {
    axios
    .get("/authentication/token/new")
    .then(function(response) {
      setToken(response.data.request_token);
    })
    .catch(function(error) {
      console.log(error);
    })
  }, [])

  function sendLoginDetails(e) {
    e.preventDefault()
    const request = {
      username: "daniloromano5932",
      password: "blessed88BE",
      request_token: token
    }
    axios
    .post("/authentication/token/validate_with_login", request)
    .then(function() {
      const request = {
        request_token: token
      }
      axios
      .post("/authentication/session/new", request)
      .then(function(response) {
        console.log(response)
        setSession(response.data.session_id);
      })
      .catch(function(error) {
        console.log(error);
      })
    })
    .catch(function(error) {
      console.log(error);
    })
    
  }

 

  console.log("token", token)
  console.log("session",session)

  return (
    <div className="signup">
     <h2>Login to your account</h2>
     <p>In order to use the editing and rating capabilities of TMDB, as well as get personal recommendations you will need to login to your account. If you do not have an account, registering for an account is free and simple. Click here to get started.</p>
     <p>If you signed up but didn't get your verification email, click here to have it resent.</p>
     <form onSubmit={sendLoginDetails}>
      <label htmlFor="username">Username</label><br/>
      <input type="text" id="username" name="usename" /><br/>
      <label htmlFor="password">Password</label><br/>
      <input type="text" id="password" name="password" /><br/><br/>
      <input type="submit" value="Login" /><br/>
      <Link to="/"><button className="">Reset password</button></Link>
     </form>
    </div>
  );
}

export default Login;
