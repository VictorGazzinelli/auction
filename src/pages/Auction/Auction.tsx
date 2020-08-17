import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { Input, Button, Checkbox, Table, Drawer, DatePicker, Space } from 'antd';
import { useHistory } from 'react-router-dom';
import ClickableText from '../../components/ClickableText';
import { GlobalContext, IGlobalContext } from '../../App';
import { RequestUtils } from '../../utils/requestUtils';
import { IAuctionDTO, IListAuctionOutput, ICreateAuctionInput, IDeleteAuctionOutput, ICreateAuctionOutput, IEditAuctionOutput, IEditAuctionInput } from '../../services/auction/auctionInterface';
import { useDoRequest } from '../../hooks/useDoRequest';
import auctionRequest from '../../services/auction/auctionRequest';
import notificationUtils from '../../utils/notificationUtils';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import { render } from '@testing-library/react';
import CurrencyInput from '../../components/CurrencyInput';
import DateTimeInput from '../../components/DateTimeInput';
import DrawerAuction from '../../components/DrawerAuction';

export default function Auction(){
    const [AuctionId, setAuctionId] = useState<number | undefined>(undefined);
    const [drawerCreateAuctionVisible, setDrawerCreateAuctionVisible] = useState<boolean>(false);
    const [drawerEditAuctionVisible, setDrawerEditAuctionVisible] = useState<boolean>(false);
    const [ListValue, setListValue] = useState<Array<IAuctionDTO>>([]);
    const history = useHistory();

    const {
        currentUser, setCurrentUser
    } = useContext<IGlobalContext>(GlobalContext)

    const [ ListAuctionsRequest, ListAuctionsResponse] = useDoRequest<IListAuctionOutput>();
    const [ AddAuctionRequest, AddAuctionResponse] = useDoRequest<ICreateAuctionOutput>();
    const [ DeleteAuctionRequest, DeleteAuctionResponse] = useDoRequest<IDeleteAuctionOutput>();
    const [ EditAuctionRequest, EditAuctionResponse] = useDoRequest<IEditAuctionOutput>();

    const columns = [
        {
            title: "Identificador",
            dataIndex: "AuctionId"
        },
        {
            title: "Valor Inicial",
            dataIndex: "InitialValue"
        },
        {
            title: "Nome",
            dataIndex: "Name"
        },
    
        {
            title: "Dono",
            dataIndex: "Owner",
        },
    
        {
            title: "Data de Abertura",
            dataIndex: "OpenedAt",
            render: (text: string, item: IAuctionDTO) => moment(item.OpenedAt).format("DD/MM/YYYY")
        },
    
        {
            title: "Data de Fechamento",
            dataIndex: "ClosedAt",
            render: (text: string, item: IAuctionDTO) => moment(item.ClosedAt).format("DD/MM/YYYY")
        },
    
        {
            title: "Condição",
            dataIndex: "IsItemUsed",
            render: (text: string) => !!text ? "Usado" : "Novo",
        },
    
        {
            title: "",
            dataIndex: "",
            render: (text: string, item: IAuctionDTO) => currentUser?.AccountId == item.ResponsibleId && <Space size="middle"> <a onClick={() => deleteAuction(item.AuctionId)}>Excluir</a> <a onClick={() => editAuction(item.AuctionId)}>Editar</a></Space>
        },
    ]

    function onComponentMount(){
        ListAuctionsRequest(() => auctionRequest.ListAuction())
    }
    useEffect(onComponentMount,[])

    function onListAuctionsResponse(){
        if(!ListAuctionsResponse) return;
        setListValue(ListAuctionsResponse.ArrAuction);
    }
    useEffect(onListAuctionsResponse,[ListAuctionsResponse])

    function addAuction(InitialValue: number, Name: string, OpenedAt: string, ClosedAt: string, IsItemUsed: boolean){
        const dto : ICreateAuctionInput = {
            InitialValue,
            Name,
            OpenedAt,
            ClosedAt,
            IsItemUsed,  
        }
        AddAuctionRequest(() => auctionRequest.CreateAuction(dto))      
    }

    function onAuctionEdit(InitialValue: number, Name: string, OpenedAt: string, ClosedAt: string, IsItemUsed: boolean){
        if(!AuctionId) return;
        EditAuctionRequest(() => auctionRequest.EditAuction({
            AuctionId,
            InitialValue,
            Name,
            OpenedAt,
            ClosedAt,
            IsItemUsed,
            ResponsibleId: currentUser?.AccountId ?? 0,
        }))
    }

    function editAuction(AuctionId: number){
        setAuctionId(AuctionId)
        setDrawerEditAuctionVisible(true)
    }

    function deleteAuction(AuctionId: number){
        DeleteAuctionRequest(() => auctionRequest.DeleteAuction({ AuctionId }))
    }

    function onAuctionAdded() {
        if(!AddAuctionResponse) return;
        setListValue([...ListValue, AddAuctionResponse.Auction])
        setDrawerCreateAuctionVisible(false)
    }
    useEffect(onAuctionAdded, [AddAuctionResponse])

    function onAuctionDeleted() {
        if(!DeleteAuctionResponse) return;
        setListValue(
            [...ListValue.filter(a => a.AuctionId !== DeleteAuctionResponse.Auction.AuctionId)]
        )
    }
    useEffect(onAuctionDeleted, [DeleteAuctionResponse])

    function onAuctionEdited() {
        if(!EditAuctionResponse) return;
        setListValue(
            [...ListValue.filter(a => a.AuctionId !== EditAuctionResponse.Auction.AuctionId), EditAuctionResponse.Auction]
        )
        setAuctionId(undefined)
        setDrawerEditAuctionVisible(false)
    }
    useEffect(onAuctionEdited, [EditAuctionResponse])

    function onLogout(){
        setCurrentUser(null)
        RequestUtils.setAuthToken('');
    }

    //onClose, visible, auctionId, onConfirm 

    return(
        <>
        <Wrapper>
            <div className='card-wrapper'>
                <div className="table-wrapper">
                    <Table style={{height: 550}} scroll={{ y: 500 }} pagination={false} dataSource={ListValue} columns={columns}/>
                </div>
                <Button type="primary" onClick={() => setDrawerCreateAuctionVisible(true)}>
                    <PlusOutlined /> Novo Leilão
                </Button>
                <Button type="primary" onClick={() => onLogout()}>Sair</Button> 
            </div>
        </Wrapper>
        {/*@ts-ignore*/}
        <DrawerAuction onClose={() => setDrawerCreateAuctionVisible(false)} visible={drawerCreateAuctionVisible} auctionId={undefined} onConfirm={addAuction} />
        {/*@ts-ignore*/}
        <DrawerAuction onClose={() => setDrawerEditAuctionVisible(false)} visible={drawerEditAuctionVisible} auctionId={AuctionId} onConfirm={onAuctionEdit} />
        </>
    ) 
}

const Wrapper = styled.div`
    display:flex;
  	flex:1;
    align-items:center;
    justify-content:center;
    padding: 100px 0px;

    .card-wrapper{
        display:flex;
        flex-direction:column;
        width: 90%;
        height: 750px;
        border:1px solid #e8e8e8;
        padding: 10px;
        overflow:hidden;

        .cadastro-wrapper{
            display:flex;
            flex-direction:row;
            justify-content:space-between;
            align-items:center;
        }

        .label-input-wrapper{
            margin-right:16px;
            margin-bottom:32px;
            label{
                font-weight:bold;
            }
        }
        button {
            margin-bottom: 20px;
        }
    }

`;