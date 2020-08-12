import React, { useState, useEffect } from 'react';
import { useBoolean } from 'react-hanger';
import { useHistory, useLocation } from 'react-router-dom';

import {
    Input, Button, Spin,
} from 'antd';
import styled from 'styled-components';

import { useDoRequest } from '../../hooks/useDoRequest';
import useKeyPress from '../../hooks/useKeyPress';

import paths from '../../routes/paths';

import defaultAppConfig from '../../appConfig';
import ClickableText from '../../components/ClickableText';
import servicoEnum from '../../enums/servicoEnum';
import { Aplicacao } from '../../services/application/aplicacaoInterfaces';
import aplicacaoRequests from '../../services/application/aplicacaoRequests';
import usuarioRequest from '../../services/usuario/usuarioRequest';
import notificationUtils from '../../utils/notificationUtils';

let queryObject: any = {};
let applicationId = 0;
let tokken = 0;
let redirectUrl = '';
let idServico = '';

const ScreenLogin: React.FC = () => {
    const history = useHistory();
    const location = useLocation();
    const [loginText, setLoginText] = useState('');
    const [loading, setLoading] = useState(false);
    const [passwordText, setPasswordText] = useState('');
    const [error, setError] = useState('');
    const urlValid = useBoolean(true);
    const enterPress = useKeyPress('Enter');

    const [
        authRequest,
        tokkenFromAPI,
        errorAuth,
    ] = useDoRequest();

    const [
        applicationRequest,
        applicationFromApi,
        errorApplicationFromApi,
    ] = useDoRequest<Aplicacao>();

    const onRequestAplicationError = () => {
        if (!errorApplicationFromApi) return;
        setLoading(false);
    };
    useEffect(onRequestAplicationError, [errorApplicationFromApi]);

    const onRequestAuthError = () => {
        if (!errorAuth) return;
        setLoading(false);
        setError('Usuário ou senha inválidos');
    };
    useEffect(onRequestAuthError, [errorAuth]);


    const onComponentMount = () => {
        if (!location.search) {
            urlValid.setFalse();
            return;
        }

        const queryParams = JSON.parse(`{"${decodeURI(location.search.substring(1))
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"')
        }"}`);
        if (!queryParams || !queryParams.ids) {
            urlValid.setFalse();
            applicationId = 0;
        } else if (isNaN(queryParams.ids)) {
            urlValid.setFalse();
            applicationId = 0;
        } else {
            urlValid.setTrue();
            applicationId = +queryParams.ids;
            queryObject = queryParams;
            history.push(paths.login);
        }
    };
    useEffect(onComponentMount, []);


    const authenticate = () => {
        const dto: string = `grant_type=password&username=${loginText}&password=${passwordText}&client_id=${idServico}`;
        authRequest(() => usuarioRequest.AutenticarUsuario(dto));
    };

    const onReceiveApplicationFromApi = () => {
        if (!applicationFromApi) return;
        redirectUrl = applicationFromApi.Url;
        idServico = `${applicationFromApi.Client_ID}:${applicationFromApi.AccessKey}`;
        authenticate();
    };
    useEffect(onReceiveApplicationFromApi, [applicationFromApi]);

    const getApplicationFromApi = () => {
        if (!applicationId) return;
        applicationRequest(() => aplicacaoRequests.Obter(applicationId));
    };

    const redirectForgotPassword = () => {
        history.push(paths.senha.recuperar);
    };


    const checkIfHasApplicationCode = () => {
        if (applicationId) {
            setLoading(true);
            getApplicationFromApi();
        } else {
            setLoading(true);
            applicationRequest(() => aplicacaoRequests.Obter(servicoEnum.SYSDAM));
        }
    };

    const onReceiveTokenFromApi = () => {
        if (!tokkenFromAPI) return;
        // @ts-ignore
        tokken = tokkenFromAPI?.access_token;
        if (applicationId) {
            window.location.href = `${redirectUrl}/redirecionar?code=${tokken}`;
        } else {
            window.location.href = `${defaultAppConfig.PortalURL}/redirecionar?code=${tokken}`;
        }
    };
    useEffect(onReceiveTokenFromApi, [tokkenFromAPI]);

    const changeLoginText = (event: any) => {
        setLoginText(event.target.value);
    };

    const changePasswordText = (event: any) => {
        setPasswordText(event.target.value);
    };

    const validateLogin = (): boolean => {
        if (!loginText || !passwordText) {
            notificationUtils.error(translate({ id: 'Insira os campos de usuário e senha' }), 5);
            setError('Insira os campos de usuário e senha');
            return false;
        }
        return true;
    };

    const login = () => {
        if (!validateLogin()) return;
        checkIfHasApplicationCode();
    };

    const onEnterPress = () => {
        if (!enterPress) return;
        login();
    };
    useEffect(onEnterPress, [enterPress]);

    return (
        <Wrapper>
            {
                !loading ? (
                    <div>
                        <h2>{'Seja bem vindo!'}</h2>
                        <h4>{'Faça login na sua conta'}</h4>

                        <label>{'Login'}</label>
                        <Input
                            size="middle"
                            placeholder={'Username'}
                            autoFocus
                            value={loginText}
                            onChange={changeLoginText}
                        />
                        <label>{'Senha'}</label>
                        <Input
                            type="password"
                            size="middle"
                            placeholder={'Senha'}
                            value={passwordText}
                            onChange={changePasswordText}
                        />
                        {
                            !!error.length && <span className="invalid-field-value">{error}</span>
                        }
                        <div className="buttons-wrapper">
                            <Button onClick={login} type="primary">{'Entrar'}</Button>
                        </div>
                    </div>
                ) : (
                    <div className="loading-wrapper">
                        <Spin />
                    </div>
                )
            }


        </Wrapper>
    );
};
export default ScreenLogin;
const Wrapper = styled.div`
    display:flex;
    flex:1;
    flex-direction:column;
    position: relative;

    .buttons-wrapper{
        position: absolute;
        bottom: 0px;
        left: 0px;
        right: 0px;

        display:flex;
        flex:1;
        flex-direction:column;
    }

    .invalid-field-value{
        color:#f5222d;
    }
    .forgot{
        font-weight: 600;
    }

    .loading-wrapper{
        display:flex;
        flex:1;
        align-content:center;
        justify-content:center;
    }
`;
