import React from 'react';

import { Modal, Result, Button } from 'antd';
import styled from 'styled-components';

interface IProps{
    visible: boolean,
    status: 'success' | 'error' | 'info' | 'warning',
    title:string,
    subTitle:string,
    onClick: () => void,
}

const ModalResult: React.FC<IProps> = ({
    visible, status, title, subTitle, onClick,
}) => {

    return (
        <Modal
            visible={visible}
            footer={null}
            style={{
                position: 'fixed', left: 0, right: 0, top: 0, bottom: 0,
            }}
            closable={false}
            width="100%"
        >
            <ResultWrapper>
                <Result
                    style={{ marginTop: '-100px' }}
                    status={status}
                    title={title}
                    subTitle={subTitle}
                    extra={(
                        <Button type="primary" onClick={onClick}>
                            {'Fechar'}
                        </Button>
                    )}
                />
            </ResultWrapper>
        </Modal>
    );
};

export default ModalResult;

const ResultWrapper = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
