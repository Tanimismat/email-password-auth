import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import app from "./firebase.init";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from "react";

const auth = getAuth(app);

function App() {

  const [validated, setValidated] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameBlur = e => {
    setName(e.target.value);
  }

  const handleEmailChange = (e) => {
    // console.log(e.target.value)
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    // console.log(e.target.value)
    setPassword(e.target.value);
  }

  const handleRegisteredChange = (event) => {
    // console.log(event.target.checked)
    setRegistered(event.target.checked);
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

    console.log('Form submitted', name, email, password);

    if (registered) {
      console.log('login :', email, password);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in successful
          const user = userCredential.user;
          console.log(user)
        })
        .catch((error) => {
          console.error("my error", error)
          setError(error.message)
        });
    }
    else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in successful
          const user = userCredential.user;
          console.log(user)
          setEmail('');
          setPassword('');
          verifyEmail();
          setUserName()
        })
        .catch((error) => {
          console.error("my error", error)
          setError(error.message)
        });
    }

    // event.preventDefault()
  }

  const setUserName = () => {
    updateProfile(auth.currentUser, {
      displayName: name
    })
      .then(() => {
        console.log('updating name');
      })
      .catch((error) => {
        console.error('my error ', error)
        setError(error.message);
      });
  }

  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log('Email verification sent!');

      });
  }

  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('Password reset email sent!');
      })
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
        <h3 className='text-primary'>Please {registered ? 'Login' : 'Register'}!!</h3>
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>

          {
            !registered &&
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Your Name</Form.Label>
              <Form.Control onBlur={handleNameBlur} type="text" placeholder="Name" required />
              <Form.Control.Feedback type="invalid">
                Please provide your name
              </Form.Control.Feedback>
            </Form.Group>
          }

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmailChange} type="email" placeholder="Enter email" required />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please provide a valid Email
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePasswordChange} type="password" placeholder="Password" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid password
            </Form.Control.Feedback>
          </Form.Group>

          <p className="text-success">{'Success!!'}</p>
          <p className="text-danger">{error}</p>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={handleRegisteredChange} type="checkbox" label="Already Registered?" />
          </Form.Group>
          <Button onClick={handlePasswordReset} variant="link">Forget Password?</Button>
          <br />
          <Button variant="primary" type="submit">
            {/* Submit */} {registered ? 'Login' : 'Register'}
          </Button>
        </Form>
      </div>

    </div>
  );
}

export default App;
