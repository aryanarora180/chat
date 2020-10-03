import React from "react";
import Cookies from "js-cookie";
import { PrimaryButton, TextField } from "@fluentui/react";
import { Card } from "@uifabric/react-cards";
import "office-ui-fabric-react/dist/css/fabric.css";

class Login extends React.Component {
  constructor() {
    super();
    // Check if user is already logged in
    let username = Cookies.get("username") || "";
    if (username.length > 1) {
      window.location.assign("/inbox");
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
    if (this.state.username.length < 3) {
      alert("Please enter a valid username");
      return;
    }
    Cookies.set("username", this.state.username);
    window.location.assign("/inbox");
  };
  render() {
    return (
      <Card
        style={{
          float: "none",
          margin: "auto",
          marginTop: 100,
          padding: 40,
          width: "60%",
          backgroundColor: "white",
        }}
      >
        <h1>Login</h1>
        <form>
          <TextField
            label="username"
            name="username"
            onChange={this.handleUsername}
            placeholder="username"
            value={this.state.username}
          />
          <br/>
          <PrimaryButton
            type="submit"
            name="submit"
            onClick={this.handleSubmit}
          >
            Login
          </PrimaryButton>
        </form>
      </Card>
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
