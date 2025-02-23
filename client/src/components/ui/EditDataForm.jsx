import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const EditDataForm = () => {
  const [id, setId] = useState('')
  const [teamName, setTeamName] = useState('')
  const [leader, setLeader] = useState('')
  const [leaderEmail, setLeaderEmail] = useState('')
  const [leaderPhoto, setLeaderPhoto] = useState('')
  const [coLeader, setCoLeader] = useState('')
  const [coLeaderEmail, setCoLeaderEmail] = useState('')
  const [coLeaderPhoto, setCoLeaderPhoto] = useState('')
  const [proker, setProker] = useState('')
  const navigate = useNavigate()
  const { teamNameInit } = useParams();

  useEffect(() => {
    getCalon()
  }, [])
  
  const getCalon = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/team/${teamNameInit}`);
      setTeamName(response.data.data.teamName);
      setLeader(response.data.data.leader.fullName);
      setCoLeader(response.data.data.coLeader.fullName);
      setProker(response.data.data.proker);
      setId(response.data.data.id)
    } catch (error) {
      console.error(error);
    }
  }  

  const EditData = async (e) => {
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
      await axios.patch(`http://localhost:5000/api/v1/update-casis/${id}`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
          "Authorization": `${token}`
        },
      });
      navigate("/dashboard");
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <Form onSubmit={ EditData }>
      <Form.Control
        type="text"
        placeholder="Nama Tim"
        className='mb-2 bg-white'
        value={teamName}
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
        value={leader}
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
        value={coLeader}
        onChange={(e) => setCoLeader(e.target.value)}
      />

      <Form.Control
        as="textarea"
        placeholder="Program Kerja"
        style={{ height: '100px' }}
        className='mb-2'
        value={proker}
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
            Ubah
          </Button>
        </Col>
      </Row>
    </Form>
  )
}
