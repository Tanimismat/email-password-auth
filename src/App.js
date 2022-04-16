import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import app from "./firebase.init";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from "react";

const auth = getAuth(app);

function App() {

  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    // console.log(e.target.value)
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    // console.log(e.target.value)
    setPassword(e.target.value)
  }

  /* const handleFormSubmit = (event) => {
    console.log('Form submitted', email, password);
    event.preventDefault()
  } */

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
      setError('Password should contain at least one special character')
      return;
    }

    setValidated(true);
    setError('');

    // console.log('Form submitted', email, password);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)
      })
      .catch((error) => {
        console.error(error)
      });
    // event.preventDefault()
  }

  return (
    <div>
      {/* <form onSubmit={handleFormSubmit}>
        <input onChange={handleEmailChange} type="email" name="" id="" />
        <br />
        <input onChange={handlePasswordChange} type="password" name="" id="" />
        <br />
        <input type="submit" value="Login" />
      </form> */}
      <div className="registration w-50 mx-auto">
        <h3 className='text-primary'>Please Register!!</h3>
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmailChange} type="email" placeholder="Enter email" required />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please provide a valid Email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePasswordChange} type="password" placeholder="Password" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid password.
            </Form.Control.Feedback>
          </Form.Group>
          <p className="text-danger">{error}</p>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
