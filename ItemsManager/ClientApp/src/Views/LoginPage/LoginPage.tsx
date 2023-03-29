import { Button, Card, Col, Form } from "react-bootstrap";
import { infoNotification } from "../../utils/notifications/notificationFactory";

const LoginPage: React.FC = () => {
    function setShowRegisterModal(arg0: boolean) {
        throw new Error("Function not implemented.");
    }

    return (
        <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center">
            <Card style={{ width: "23rem" }}>
                <Card.Body>
                    <Form className={`row g-3`} id="loginForm">
                        <Col lg="12">
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="email"
                                    placeholder="Enter email"
                                />
                                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group></Form.Group>
                        </Col>

                        <Col lg="12">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                id="password"
                                placeholder="Enter password"
                            />
                            <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                        </Col>

                        <Col lg="12">
                            <div className="d-grid">
                                <Button variant="success" type="submit">
                                    <i className="bs bxs-lock-green" />
                                    Sign in
                                </Button>
                            </div>
                        </Col>

                        <Col lg="12" className="d-flex justify-content-center">
                            Don&apos;t have an account yet?{" "}
                            <span className="ms-1" style={{ color: "green" }}>
                                <p
                                    onClick={() =>
                                        infoNotification("Jest dobrze")
                                    }
                                >
                                    Sign Up!
                                </p>
                            </span>
                        </Col>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};
export default LoginPage;
