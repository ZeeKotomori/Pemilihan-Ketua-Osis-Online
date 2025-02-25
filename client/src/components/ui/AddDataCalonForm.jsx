import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import axios from 'axios';

export const AddDataCalonForm = () => {
  const [users, setUsers] = useState([])
  const [teamName, setTeamName] = useState('')
  const [leaderEmail, setLeaderEmail] = useState('')
  const [leaderPhoto, setLeaderPhoto] = useState('')
  const [coLeaderEmail, setCoLeaderEmail] = useState('')
  const [coLeaderPhoto, setCoLeaderPhoto] = useState('')
  const [proker, setProker] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    getUsers()
  }, []);

  const AddData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const token = localStorage.getItem('token');

    formData.append("leaderPhoto", leaderPhoto);
    formData.append("coLeaderPhoto", coLeaderPhoto);
    formData.append("teamName", teamName);
    formData.append("leaderEmail", leaderEmail);
    formData.append("coLeaderEmail", coLeaderEmail);
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

  const getUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/v1/user/get-users', {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  }

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

      <Form.Select className='mb-2 bg-white' onChange={(e) => setLeaderEmail(e.target.value)}>
        <option>Pilih Ketua</option>
        {users.map((user) => (
          <option value={user.email} key={user.id}>
            {user.fullName}
          </option>
        ))}
      </Form.Select>

      <Form.Group className='mb-2'>
        <Form.Label className='mb-2 ms-1 text-start'>Wakil Ketua Osis</Form.Label>
        <Form.Control
          type="file"
          className='bg-white'
          onChange={(e) => setCoLeaderPhoto(e.target.files[0])}
        />
      </Form.Group>

      <Form.Select className='mb-2 bg-white' onChange={(e) => setCoLeaderEmail(e.target.value)}>
        <option>Pilih Wakil Ketua</option>
        {users.map((user) => (
          <option value={user.email} key={user.id}>
            {user.fullName}
          </option>
        ))}
      </Form.Select>

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