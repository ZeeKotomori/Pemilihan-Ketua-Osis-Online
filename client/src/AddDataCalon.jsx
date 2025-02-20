import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { AddDataCalonForm } from './components/ui/AddDataCalonForm'

export const AddDataCalon = () => {
  return (
    <Container fluid='md' className="min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <Row className="justify-content-center w-50">
        <Col xs={6}>
          <h2 className="pb-2 text-center">Tambah Data</h2>
          <AddDataCalonForm />
        </Col>
      </Row>
    </Container>
  )
}
