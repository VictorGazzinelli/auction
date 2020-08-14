import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { Input, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { GlobalContext, IGlobalContext } from '../../App';
import { useDoRequest } from '../../hooks/useDoRequest';
import { RequestUtils } from '../../utils/requestUtils';
import accountRequest from '../../services/account/accountRequest';
import { ICreateAccountOutput } from '../../services/account/accountInterface';

export default function SignUp(){
    const [username, setUsername] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [passwordConfirmation, setPasswordConfirmation] = useState<string | null>(null);
    const history = useHistory();
    
    const {
        setCurrentUser: setCurrentUser
    } = useContext<IGlobalContext>(GlobalContext)

    const [
        authenticateUserRequest,
        authenticateUserResponse,
        authenticateUserError,
        authenticateUserLoading
    ] = useDoRequest<ICreateAccountOutput>();

    function submit(){
        if(!username || !password || !passwordConfirmation) return;
        authenticateUserRequest( () => accountRequest.CreateAccount({Username: username, Password: password, PasswordConfirmation: passwordConfirmation}));
    }

    function authenticateUser(){
        if(!authenticateUserResponse) return;
        RequestUtils.setAuthToken(authenticateUserResponse.AuthToken)
        setCurrentUser(authenticateUserResponse.Account)
        history.push("/auction");
    }
    useEffect(authenticateUser, [authenticateUserResponse])

    return(
        <Wrapper>
            <div className='card-wrapper'>
             <span className="title">Criar uma conta</span>             
            
            <Input placeholder="Username" onChange={e => setUsername(e.target.value)}/>
            <Input placeholder="Senha" type="password" onChange={e => setPassword(e.target.value)}/>
            <Input placeholder="Confirmar Senha" type="password" onChange={e => setPasswordConfirmation(e.target.value)}/>
            <Button onClick={submit} type="primary">Criar</Button>
            <Button onClick={() => history.push("/login")} type="link">Login</Button>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display:flex;
  	flex:1;
    align-items:center;
    justify-content:center;

    .card-wrapper{
        display:flex;
        flex-direction:column;
        width: 400px;
        height: 375px;
        border:1px solid #e8e8e8;
        border-radius: 10px;
        align-items:center;
        padding: 10px;

        .title{
            font-size: 30px;
            font-weight: bold;
            color:#333;
            margin-bottom: 50px;
        }

        input + input {
            margin-top: 10px;
        }

        button {
            margin-top: 30px;
        }
    }

`;