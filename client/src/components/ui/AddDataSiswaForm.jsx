import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import axios from 'axios';

export const AddDataSiswaForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [kelas, setKelas] = useState('')
  const navigate = useNavigate()

  const AddData = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/v1/auth/register", {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        fullName: fullName,
        kelas: kelas
      });
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form onSubmit={AddData}>
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
        type="email"
        placeholder="Email"
        className='mb-2 bg-white'
        onChange={(e) => setEmail(e.target.value)}
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
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <Row>
        <Col xs={6}>
          <Link to='/dashboard' className='text-decoration-none text-reset w-100'>
            <Button variant="info" className='w-100'>
              Kembali
            </Button>
          </Link>
        </Col>
        <Col xs={6}>
          <Button variant="primary" type="submit" className='w-100'>
            Tambah
          </Button>
        </Col>
      </Row>
    </Form>
  )
}
