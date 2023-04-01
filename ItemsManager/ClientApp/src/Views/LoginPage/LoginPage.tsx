import { useFormik } from "formik";
import { useEffect } from "react";
import { Button, Card, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { login } from "../../store/userSession/api";
import { getAccessToken } from "../../utils/authUtils";
import { ApplicationState } from "../../store";

const LoginPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const userSessionToken = useAppSelector(
        (state: ApplicationState) => state.userSession.currentToken
    );

    useEffect(() => {
        const token = getAccessToken();
        console.log("login token", token);

        if (token !== "") {
            navigate("/home");
        }
    }, [userSessionToken]);

    const getInitialValues = () => {
        return {
            email: "",
            password: "",
        };
    };

    const getLoginValidationSchema = () =>
        Yup.object().shape({
            email: Yup.string().trim().required("Email is required"),
            password: Yup.string().trim().required("Password is required"),
        });

    const formik = useFormik({
        initialValues: getInitialValues(),
        validationSchema: getLoginValidationSchema(),
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: (values) => {
            console.log(values);
            dispatch(
                login({
                    email: values.email,
                    password: values.password,
                })
            );
        },
    });

    return (
        <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center">
            <Card style={{ width: "23rem" }}>
                <Card.Body>
                    <Form
                        className={`row g-3`}
                        id="loginForm"
                        onSubmit={formik.handleSubmit}
                    >
                        <Col lg="12">
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="email"
                                    value={formik.values.email}
                                    isInvalid={!!formik.errors.email}
                                    placeholder="Enter email"
                                    onChange={formik.handleChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group></Form.Group>
                        </Col>

                        <Col lg="12">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                id="password"
                                value={formik.values.password}
                                isInvalid={!!formik.errors.password}
                                placeholder="Enter password"
                                onChange={formik.handleChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.password}
                            </Form.Control.Feedback>
                        </Col>

                        <Col lg="12">
                            <div className="d-grid">
                                <Button variant="success" type="submit">
                                    <i className="bs bxs-lock-green" />
                                    Sign in
                                </Button>
                            </div>
                        </Col>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};
export default LoginPage;
