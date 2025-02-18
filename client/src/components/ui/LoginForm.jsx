import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const LoginForm = () => {
  const [nisn, setNisn] = useState('')
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const Login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/v1/auth/login', {
        nisn: nisn,
        email: email
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      navigate("/dashboard");
    } catch (error) {
      if (error) {
        console.error(error);
      }
    }
  }

  return (
    <Form onSubmit={Login}>
      <Form.Control
        type="text"
        placeholder="NISN"
        className='mb-2 bg-white'
        onChange={(e) => setNisn(e.target.value)}
      />

      <Form.Control
        type="email"
        placeholder="Email"
        className='mb-2 bg-white'
        onChange={(e) => setEmail(e.target.value)}
      />

      <Button variant="primary" type="submit" className='w-100'>
        Login
      </Button>
    </Form>
  )
}
