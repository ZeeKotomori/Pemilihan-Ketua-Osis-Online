import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { AddDataForm } from './components/ui/AddDataForm'

export const AddData = () => {
  return (
    <Container fluid='md' className="min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <Row className="justify-content-center text-center w-50">
        <Col xs={6}>
          <h2 className="pb-2">Tambah Data</h2>
          <AddDataForm />
        </Col>
      </Row>
    </Container>
  )
}
