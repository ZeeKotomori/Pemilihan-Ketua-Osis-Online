import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const RegisterForm = () => {
  const [nisn, setNisn] = useState('')
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const navigate = useNavigate()

  const Register = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/v1/auth/register', {
        nisn: nisn,
        email: email,
        fullName: fullName,
      });
      navigate("/login");
    } catch (error) {
      if (error) {
        console.error(error);
      }
    }
  }

  return (
    <Form onSubmit={Register}>
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

      <Form.Control
        type="text"
        placeholder="Full Name"
        className='mb-2 bg-white'
        onChange={(e) => setFullName(e.target.value)}
      />

      <Button variant="primary" type="submit" className='w-100'>
        Register
      </Button>
    </Form>
  )
}
