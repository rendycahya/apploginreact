import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import {  Button, Container } from 'reactstrap';
import { AuthContext } from '../App';
const HomeComp = () => {
    let navigate = useNavigate()
    const {state} = useContext(AuthContext);  
    
    useEffect(()=>{
        if(!state.isAuthenticated){
            navigate('/login')
        }
    },[state,navigate])


    return (
        <div>
            <Container>
                <h1 className="display-3">Hello, {state.user}</h1>
                <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
                <hr className="my-2" />
                <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                <p className="lead">
                <Button color="primary">Learn More</Button>
                </p>
            </Container>
        </div>
    )
}

export default HomeComp