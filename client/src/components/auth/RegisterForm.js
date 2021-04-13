import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../layout/AlertMessage";

RegisterForm.propTypes = {};

function RegisterForm(props) {
  // context
  const { registerUser } = useContext(AuthContext);

  // router
  const history = useHistory();

  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [alert, setAlert] = useState(null);
  const { username, password, confirmPassword } = registerForm;

  const onChangeRegisterForm = (e) => {
    const { name, value } = e.target;
    setRegisterForm({
      ...registerForm,
      [name]: value,
    });
  };

  const onRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlert({
        type: "danger",
        message: "Password do not match",
      });
      setTimeout(() => setAlert(null), 5000);
      return;
    }

    try {
      const data = await registerUser(registerForm);
      if (data.success) {
        // history.push('/dashboard')
      } else {
        setAlert({
          type: "danger",
          message: data.message,
        });
        setTimeout(() => setAlert(null), 5000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Form onSubmit={onRegister}>
        <AlertMessage info={alert} />
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={onChangeRegisterForm}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChangeRegisterForm}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChangeRegisterForm}
            required
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Register
        </Button>
      </Form>
      <p>
        Already have an account?
        <Link to="/login">
          <Button variant="info" size="sm" className="ml-2">
            Login
          </Button>
        </Link>
      </p>
    </>
  );
}

export default RegisterForm;
