import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { AddDataSiswaForm } from './components/ui/AddDataSiswaForm'

export const AddDataSiswa = () => {
  return (
    <Container fluid='md' className="min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <Row className="justify-content-center w-50">
        <Col xs={6}>
          <h2 className="pb-2 text-center">Tambah Data</h2>
          <AddDataSiswaForm />
        </Col>
      </Row>
    </Container>
  )
}
