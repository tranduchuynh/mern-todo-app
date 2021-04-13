import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../layout/AlertMessage";

LoginForm.propTypes = {};

function LoginForm(props) {
  // context
  const { loginUser } = useContext(AuthContext);

  // router
  const history = useHistory();

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const [alert, setAlert] = useState(null);

  const onChangeLoginForm = (e) => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(loginForm);
      if (data.success) {
        // history.push('/dashboard')
      } else {
        setAlert({
          type: "danger",
          message: data.message,
        });
        setTimeout(() => setAlert(null), 5000)
      }
    } catch (err) {
      console.log(err);
    }
  };

  const { username, password } = loginForm;
  return (
    <>
      <Form className="my-4" onSubmit={onLogin}>
        <AlertMessage info={alert} />
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={onChangeLoginForm}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChangeLoginForm}
            required
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Login
        </Button>
      </Form>
      <p>
        Don't have an account?
        <Link to="/register">
          <Button variant="info" size="sm" className="ml-2">
            Register
          </Button>
        </Link>
      </p>
    </>
  );
}

export default LoginForm;
