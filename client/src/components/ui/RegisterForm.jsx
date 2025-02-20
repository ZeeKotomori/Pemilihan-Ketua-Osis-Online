import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const RegisterForm = () => {
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [kelas, setKelas] = useState('')
  const [password, setPassword] = useState('')
  const [confPassword, setConfPassword] = useState('')
  const navigate = useNavigate()

  const Register = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/v1/auth/register', {
        email: email,
        fullName: fullName,
        kelas: kelas,
        password: password,
        confirmPassword: confPassword
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
        type="email"
        placeholder="Email"
        className='mb-2 bg-white'
        onChange={(e) => setEmail(e.target.value)}
      />

      <Form.Control
        type="text"
        placeholder="Nama Lengkap"
        className='mb-2 bg-white'
        onChange={(e) => setFullName(e.target.value)}
      />

      <Form.Control
        type="text"
        placeholder="Kelas"
        className='mb-2 bg-white'
        onChange={(e) => setKelas(e.target.value)}
      />

      <Form.Control
        type="password"
        placeholder="Password"
        className='mb-2 bg-white'
        onChange={(e) => setPassword(e.target.value)}
      />

      <Form.Control
        type="password"
        placeholder="Konfirmasi Password"
        className='mb-2 bg-white'
        onChange={(e) => setConfPassword(e.target.value)}
      />

      <Button variant="primary" type="submit" className='w-100'>
        Register
      </Button>
    </Form>
  )
}
