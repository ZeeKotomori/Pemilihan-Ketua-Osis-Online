import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const Dashboard = () => {
  const [calon, setCalon] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    getCalon()
  }, [])

  const getCalon = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:5000/api/v1/', {
        headers: {
          "Authorization" : `Bearer ${token}`
        },
      });
      setCalon(response.data.data);
    } catch (error) {
      console.error(error.message);
    }
  }

  const deleteData = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/delete/${id}`)
      getCalon()
    } catch (error) {
      console.error(error)
    }
  }

  const Logout = async () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <>
      <p className='text-end mt-3 me-4'>
        <a onClick={Logout} href='' className='link-offset-1 text-black'>Log Out</a>
      </p>
      <Card className='m-3'>
        <Card.Body>
          <Row className='justify-content-end me-0'>
            <Link to='/add-siswa' className='text-decoration-none text-reset' style={{ width: '10rem' }}>
              <Button variant='outline-primary' className='w-100'>
                Tambah Siswa
              </Button>
            </Link>
            <Link to='/add-calon' className='text-decoration-none text-reset' style={{ width: '10rem' }}>
              <Button variant='outline-primary' className='w-100'>
                Tambah Calon
              </Button>
            </Link>
          </Row>
          <Table hover responsive className='mt-3'>
            <thead>
              <tr>
                <th>Nama Tim</th>
                <th>Caketos</th>
                <th>Cawaketos</th>
                <th>Program kerja</th>
                <th colSpan={3}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              { calon.map((calon, index) => (
              <tr key={index}>
                <td>{calon.teamName}</td>
                <td>{calon.leader.fullName}</td>
                <td>{ calon.coLeader.fullName }</td>
                <td>{ calon.proker }</td>
                <td className='align-start'>
                  <Button className='w-100'>Foto</Button>
                </td>
                <td className='align-start'>
                  <Link to={`/edit/${calon.teamName}`} className='text-decoration-none text-reset'>
                    <Button variant='warning' className='w-100'>Edit</Button>
                  </Link>
                </td>
                <td className='align-start'>
                  <Button variant='danger' className='w-100' onClick={() => deleteData(calon.id)}>Hapus</Button>
                </td>
              </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  )
}
