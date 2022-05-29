import React, { useContext, useState } from 'react'
import axios from 'axios'
import qs from 'querystring'
import { AuthContext } from '../App';
import { CardImg, Col, Container, Row } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Link } from 'react-router-dom';


const api = 'http://localhost:3001';

const LoginComp = () => {

    const {dispatch} = useContext(AuthContext);

    const initialState = {
        email: "",
        password: "",
        isSubmitting: false,
        errorMessage: null
    }

    const [data, setData] = useState(initialState);

    const handleInputChange = event => {
        setData({
            ...data,
            [event.target.name] : event.target.value
        })
    }

    const handleformSubmit = event => {
        event.preventDefault()
        setData({
            ...data,
            isSubmitting: true,
            errorMessage: null
        })
        const requestBody = {
            email: data.email,
            password: data.password
        }

        const config = {
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }

        axios.post(api + '/auth/api/v1/login', qs.stringify(requestBody), config)
        .then(res =>{
            if(res.data.success === true){
                dispatch({
                    type: "LOGIN",
                    payload: res.data
                })
            }else{
                setData({
                    ...data,
                    isSubmitting: false,
                    errorMessage: res.data.Message
                })
            }
        })

    }

    return (
            <Container>
                <br />
                <Row>
                    <Col>
                        <CardImg src="https://placeimg.com/640/480/tech" alt="" width='100%' />
                    </Col>
                    <Col>
                        <h1>Login Form</h1>
                        <hr />
                        <Form onSubmit={handleformSubmit}>
                            <FormGroup>
                                <Label for="exampleEmail">Email</Label>
                                <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" value={data.email} onChange={handleInputChange}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword">Password</Label>
                                <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" value={data.password} onChange={handleInputChange}/>
                            </FormGroup>
                            {
                                data.errorMessage && (
                                    <div className='alert alert-danger'>
                                        {data.errorMessage}
                                    </div>
                                )
                            }
                            <Button disabled={data.isSubmitting}>
                                {data.isSubmitting ? (
                                    "...Laoding"
                                ) : 
                                    (
                                        "LOGIN"
                                    )
                                }
                            </Button>
                        </Form>
                        <p>Belum Punya Akun ? <Link to={'/register'}>Register</Link></p>
                    </Col>
                </Row>
            </Container>
    )
}

export default LoginComp