import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { EditDataForm } from './components/ui/EditDataForm'

export const EditData = () => {
  return (
    <Container fluid='md' className="min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <Row className="justify-content-center w-50">
        <Col xs={6}>
          <h2 className="pb-2 text-center">Ubah Data</h2>
          <EditDataForm />
        </Col>
      </Row>
    </Container>
  )
}
