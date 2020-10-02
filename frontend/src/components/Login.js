import React from "react";
import Cookies from "js-cookie";

class Login extends React.Component {
  constructor() {
    super();
    // Check if user is already logged in 
    let username = Cookies.get('username') || ''
    if (username.length > 1) {
      window.location.assign('/inbox')
      return;
    }
    this.state = {
      username: "",
    };
  }
  handleUsername = (e) => {
    let newusername = e.target.value;
    this.setState({ username: newusername });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    Cookies.set("username", this.state.username);
    window.location.assign("/inbox");
  };
  render() {
    return (
      <div style={style.main}>
        <div style={style.loginBox}>
          <center>
            <h1>Welcome</h1>
            <br />
            <form>
              <p>Enter your username to enter chat</p>
              <input
                style={style.input}
                value={this.state.username}
                name="username"
                onChange={this.handleUsername}
                placeholder="Username"
              />
              <br />
              <input
                style={style.button}
                type="submit"
                onClick={this.handleSubmit}
                name="submit"
              />
            </form>
          </center>
        </div>
      </div>
    );
  }
}

const style = {
  main: {
    position: "fixed",
    backgroundColor: "#9900cc",
    width: "100%",
    height: "100vh",
    fontWeight: 500,
  },
  loginBox: {
    backgroundColor: "white",
    width: "50%",
    color: "black",
    height: "200",
    float: "none",
    marginTop: 100,
    marginRight: "auto",
    marginLeft: "auto",
    padding: 20,
  },
  input: {
    padding: 10,
    borderWidth: "5",
    borderColor: "#9900cc",
    margin: 10,
  },
  button: {
    backgroundColor: "#9900cc",
    padding: 10,
    color: "white",
  },
};

export default Login;
