import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import axios from 'axios';

export const AddDataCalonForm = () => {
  const [teamName, setTeamName] = useState('')
  const [leader, setLeader] = useState('')
  const [leaderPhoto, setLeaderPhoto] = useState('')
  const [coLeader, setCoLeader] = useState('')
  const [coLeaderPhoto, setCoLeaderPhoto] = useState('')
  const [proker, setProker] = useState('')
  const navigate = useNavigate()

  const AddData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const token = localStorage.getItem('token')

    formData.append("leaderPhoto", leaderPhoto);
    formData.append("coLeaderPhoto", coLeaderPhoto);
    formData.append("teamName", teamName);
    formData.append("leader", leader);
    formData.append("coLeader", coLeader);
    formData.append("proker", proker);
    try {
      await axios.post("http://localhost:5000/api/v1/add-casis", formData, {
        headers: {
          "Content-type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        },
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
        placeholder="Nama Tim"
        className='mb-2 bg-white'
        onChange={(e) => setTeamName(e.target.value)}
      />

      <Form.Group className='mb-2'>
        <Form.Label className='mb-2 ms-1 text-start'>Ketua Osis</Form.Label>
        <Form.Control
          type="file"
          className='bg-white'
          onChange={(e) => setLeaderPhoto(e.target.files[0])}
        />
      </Form.Group>

      <Form.Control
        type="text"
        placeholder="Ketua"
        className='mb-2 bg-white'
        onChange={(e) => setLeader(e.target.value)}
      />

      <Form.Group className='mb-2'>
        <Form.Label className='mb-2 ms-1 text-start'>Wakil Ketua Osis</Form.Label>
        <Form.Control
          type="file"
          className='bg-white'
          onChange={(e) => setCoLeaderPhoto(e.target.files[0])}
        />
      </Form.Group>

      <Form.Control
        type="text"
        placeholder="Wakil Ketua"
        className='mb-2 bg-white'
        onChange={(e) => setCoLeader(e.target.value)}
      />

      <Form.Control
        as="textarea"
        placeholder="Program Kerja"
        style={{ height: '100px' }}
        className='mb-2 bg-white'
        onChange={(e) => setProker(e.target.value)}
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