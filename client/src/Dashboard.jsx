import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';


export const Dashboard = () => {
  const navigate = useNavigate();

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
            <Link to='/add' className='text-decoration-none text-reset' style={{ width: '6rem' }}>
              <Button variant='outline-primary'>
                Tambah
              </Button>
            </Link>
          </Row>
          <Table hover responsive className='mt-3'>
            <thead>
              <tr>
                <th>#</th>
                <th>Nama</th>
                <th>Kelas</th>
                <th>Program kerja</th>
                <th colSpan={3}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark Kadal</td>
                <td>XII RPK 2</td>
                <td>Makan siang gratis, Makan sore gratis, sarapan gratis</td>
                <td className='align-start'>
                  <Button className='w-100'>Detail</Button>
                </td>
                <td className='align-start'>
                  <Link to='/edit' className='text-decoration-none text-reset'>
                    <Button variant='warning' className='w-100'>Edit</Button>
                  </Link>
                </td>
                <td className='align-start'>
                  <Button variant='danger' className='w-100'>Hapus</Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  )
}
