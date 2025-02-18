import { Link } from "react-router-dom"
import { LoginForm } from "./components/ui/LoginForm"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export const Login = () => {
  return (
    <Container fluid='md' className="min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <Row className="justify-content-center text-center w-50">
        <Col xs={6}>
          <h2 className="pb-2">Login</h2>
          <LoginForm />
          <p className="text-body-tertiary pt-3">
            Tidak punya akun?
            <Link to="/" className="link-underline link-offset-1 ms-1">Register</Link>
          </p>
        </Col>
      </Row>
    </Container>
  )
}