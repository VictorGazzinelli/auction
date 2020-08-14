import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { Input, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { GlobalContext, IGlobalContext } from '../../App';
import { useDoRequest } from '../../hooks/useDoRequest';
import { RequestUtils } from '../../utils/requestUtils';
import accountRequest from '../../services/account/accountRequest';
import { ILoginAccountOutput } from '../../services/account/accountInterface';

interface ICurrentUser {
    AccountId: number,
    Username: string
}

export default function Login(){
    const [username, setUsername] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const history = useHistory();
    
    const {
        setCurrentUser
    } = useContext<IGlobalContext>(GlobalContext)

    const [
        authenticateUserRequest,
        authenticateUserResponse,
    ] = useDoRequest<ILoginAccountOutput>();

    function submit(){
        if(!username || !password) return;
        authenticateUserRequest( () => accountRequest.LoginAccount({Username: username, Password: password}));
    }

    function authenticateUser(){
        if(!authenticateUserResponse) return;
        RequestUtils.setAuthToken(authenticateUserResponse.AuthToken)
        const currentUser : ICurrentUser = {
            AccountId:  authenticateUserResponse.Account.AccountId,
            Username:  authenticateUserResponse.Account.Username,
        }
        setCurrentUser(currentUser)
        history.push("/auction");
    }
    useEffect(authenticateUser, [authenticateUserResponse])

    return(
        <Wrapper>
            <div className='card-wrapper'>
             <span className="title">Login</span>             
            
            <Input placeholder="Username" onChange={e => setUsername(e.target.value)}/>
            <Input placeholder="Senha" type="password" onChange={e => setPassword(e.target.value)}/>
            <Button onClick={submit} type="primary">Login</Button>
            <Button onClick={() => history.push("/signup")} type="link">Criar Conta</Button>
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
        height: 325px;
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