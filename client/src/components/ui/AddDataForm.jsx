import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

export const AddDataForm = () => {
  return (
    <Form>
      <Form.Control
        type="text"
        placeholder="Nama Tim"
        className='mb-2 bg-white'
      />

      <Form.Control
        type="text"
        placeholder="Ketua"
        className='mb-2 bg-white'
      />

      <Form.Control
        type="text"
        placeholder="Wakil Ketua"
        className='mb-2 bg-white'
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
