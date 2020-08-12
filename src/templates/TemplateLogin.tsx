import React, { ReactElement } from 'react';
import ReactCardFlip from 'react-card-flip';

import styled from 'styled-components';

import backgroundLogin from '../images/backgroundLogin.svg';
import LogoSYSDAM from '../images/LogoSYSDAM.png';

interface IProps {
    isFlipped?: boolean,
    frontComponent: ReactElement,
    backComponent: ReactElement,
}

const TemplateLogin: React.FC<IProps> = ({ isFlipped = false, frontComponent, backComponent }) => (

    <SLoginWrapper>
        <BoxWrapper>
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                <div className="login-box-wrapper">
                    {frontComponent}
                </div>
                <div className="login-box-wrapper">
                    {backComponent}
                </div>
            </ReactCardFlip>
        </BoxWrapper>
        <SLogo src={LogoSYSDAM} />
    </SLoginWrapper>
);
export default TemplateLogin;

const BoxWrapper = styled.div`

    display:flex;
    flex:1;
    justify-content:center;
    align-items:center;
    flex-direction:row;

    .login-box-wrapper {
        background: white;
        width: 500px;
        height: auto;
        min-height: 450px;
        
        box-shadow: 0 25px 75px rgba(16,30,54,.25);
        border-radius: 5px;
        padding:30px;

        display:flex;
        flex-direction:column;
    }

    .form-box-wrapper{
        display:flex;
        flex:1;
        flex-direction:column;

        margin-top: 10px;
    }
`;

const SLoginWrapper = styled.div`

    display:flex;
    flex:1;
    background-image: url(${backgroundLogin});
    background-repeat: no-repeat; 
    background-color:#f5f5f5;
    background-position: center;
    background-size: cover;
`;

const SLogo = styled.img`
    display: flex;
    position: absolute;
    width: 9%;
    bottom: 0;
    right: 0;
    padding: 20px;
`;
