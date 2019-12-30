import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation, Redirect } from "react-router-dom";
import { login } from "../actions/index";
function LoginPage(props) {
  let location = useLocation();
//    let [isLoggedin,setLoggedin] = useState(props.isLoggedin)
let { from } = location.state || { from: { pathname: "/" } };
  let authenticate = e => {
    e.preventDefault();
    console.log('data')
    const data = new FormData(e.target);
    console.log(data)
    props.login(Object.fromEntries(data));
  };
  console.log("props", props.isLoggedIn);
//   useEffect(() => {
//     console.log("hiac", props.isLoggedIn);
//     setLoggedin(props.isLoggedIn);
//   }, [props.isLoggedIn]);
  if (props.isLoggedIn) {
    return (
      <Redirect
        to={{
          pathname: props.isAdmin?'/admin': "/projects",
          state: { from }
        }}
      />
    );
  }
  return (
    <div className="row">
      <div className="col-sm-8 col-xs-12"></div>
      <div className="col-xs-12 col-sm-4">
        <form onSubmit={authenticate}>
          <div class="form-group">
            <label for="email">Email address:</label>
            <input type="email" class="form-control" name='email' />
          </div>
          <div class="form-group">
            <label for="pwd">Password:</label>
            <input type="password" class="form-control"  name='password'/>
          </div>

          <button type="submit" class="btn btn-info">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};
const mapStateToProps = (state, props) => {
    console.log('stated',state.user)
  return {
    isLoggedIn: state.user.isLoggedIn,
    isAdmin:state.user.isAdmin
  };
};
const mapDisptachToProps = dispatch => {
  return {
    login:(payload)=>dispatch(login(payload))
  };
};
export default connect(mapStateToProps, mapDisptachToProps)(LoginPage);
