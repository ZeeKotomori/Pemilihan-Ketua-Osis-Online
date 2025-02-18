import { Link } from "react-router-dom"
import { RegisterForm } from "./components/ui/RegisterForm"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export const Register = () => {
  return (
    <Container fluid='md' className="min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <Row className="justify-content-center text-center w-50">
        <Col xs={6}>
          <h2 className="pb-2">Register</h2>
          <RegisterForm />
          <p className="text-body-tertiary pt-3">
            Sudah punya akun?
            <Link to="/login" className="link-underline link-offset-1 ms-1">Login</Link>
          </p>
        </Col>
      </Row>
    </Container>
  )
}