import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { Input, Button, Checkbox, Table, Drawer, DatePicker } from 'antd';
import { useHistory } from 'react-router-dom';
import ClickableText from '../../components/ClickableText';
import { GlobalContext, IGlobalContext } from '../../App';
import { RequestUtils } from '../../utils/requestUtils';
import { IAuctionDTO, IListAuctionOutput, ICreateAuctionInput, IDeleteAuctionOutput, ICreateAuctionOutput } from '../../services/auction/auctionInterface';
import { useDoRequest } from '../../hooks/useDoRequest';
import auctionRequest from '../../services/auction/auctionRequest';
import notificationUtils from '../../utils/notificationUtils';
import { ICreateAccountOutput } from '../../services/account/accountInterface';
import { PlusOutlined } from '@ant-design/icons';

export default function Auction(){
    const [InitialValue, setInitialValue] = useState<number>(0);
    const [Name, setName] = useState<string>("");
    const [OpenedAt, setOpenedAt] = useState<string>("");
    const [ClosedAt, setClosedAt] = useState<string>("");
    const [IsItemUsed, setIsItemUsed] = useState<boolean>(false);
    const [drawerCreateAuctionVisible, setDrawerCreateAuctionVisible] = useState<boolean>(false);
    const [drawerEditAuctionVisible, setDrawerEditAuctionVisible] = useState<boolean>(false);
    const [ListValue, setListValue] = useState<Array<IAuctionDTO>>([]);
    const history = useHistory();

    const {
        setCurrentUser, currentUser
    } = useContext<IGlobalContext>(GlobalContext)

    const [ ListAuctionsRequest, ListAuctionsResponse] = useDoRequest<IListAuctionOutput>();
    const [ AddAuctionRequest, AddAuctionResponse] = useDoRequest<ICreateAuctionOutput>();
    const [ DeleteAuctionRequest, DeleteAuctionResponse] = useDoRequest<IDeleteAuctionOutput>();

    const columns = [
        {
            title: "Identificador",
            dataIndex: "AuctionId"
        },
        {
            title: "ValorInicial",
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
            dataIndex: "OpenedAt"
        },
    
        {
            title: "Data de Fechamento",
            dataIndex: "ClosedAt"
        },
    
        {
            title: "Condição",
            dataIndex: "IsItemUsed",
            render: (text: string) => !!text ? "Usado" : "Novo",
        },
    
        {
            title: "",
            dataIndex: "",
            render: (text: string, item: IAuctionDTO) => currentUser?.AccountId == item.ResponsibleId && <a onClick={() => removeItem(item.AuctionId)}>Excluir</a>,
        },

        {
            title: "",
            dataIndex: "",
            render: (text: string, item: IAuctionDTO) => currentUser?.AccountId == item.ResponsibleId && <a onClick={() => editItem(item)}>Editar</a>,
        },
    
    ]

    function editItem(item : IAuctionDTO){

    }

    function removeItem(AuctionId: number){
        DeleteAuctionRequest(() => auctionRequest.DeleteAuction({ AuctionId }))
    }

    const {
        setCurrentUser: setUsuarioLogado
    } = useContext<IGlobalContext>(GlobalContext)

    function onComponentMount(){
        ListAuctionsRequest(() => auctionRequest.ListAuction())
    }
    useEffect(onComponentMount,[])

    function onListAuctionsResponse(){
        if(!ListAuctionsResponse) return;
        setListValue(ListAuctionsResponse.ArrAuction);
    }
    useEffect(onListAuctionsResponse,[ListAuctionsResponse])


    function addAuction(){
        if(!InitialValue || !Name || !OpenedAt || !ClosedAt){
            notificationUtils.error("Não é possível criar um leilão sem preencher os dados obrigatórios")
            return;
        }
        const itemToInsert : ICreateAuctionInput = {
            InitialValue,
            Name,
            OpenedAt,
            ClosedAt,
            IsItemUsed,  
        }
        AddAuctionRequest(() => auctionRequest.CreateAuction(itemToInsert))  
    }

    function onAuctionAdded() {
        if(!AddAuctionResponse) return;
        setListValue([...ListValue, AddAuctionResponse.Auction])
    }
    useEffect(onAuctionAdded, [AddAuctionResponse])

    function onAuctionDeleted() {
        if(!DeleteAuctionResponse) return;
        setListValue(
            [...ListValue.filter(a => a.AuctionId !== DeleteAuctionResponse.Auction.AuctionId)]
        )
    }
    useEffect(onAuctionDeleted, [DeleteAuctionResponse])

    function onLogout(){
        setUsuarioLogado(null)
        RequestUtils.setAuthToken('');
    }

    const InputLabel = (label: string, setState: any, type: string) => (
        <div className="label-input-wrapper">
            <label>{label}:</label>
            {type !== "dateTime" && <Input onChange={e => setState(e.target.value)} type={type}/>}
            {type === "dateTime" && <DatePicker style ={{width: '50%'}}/>}
        </div>
    )

    return(
        <>
        <Wrapper>
            <div className='card-wrapper'>
                {/* <div className="cadastro-wrapper">

                    {InputLabel("Valor inicial", setInitialValue)}
                    {InputLabel("Nome do leilao", setName)}
                    {InputLabel("Data abertura", setOpenedAt)}
                    {InputLabel("Data fechamento", setClosedAt)}
                </div>
                <Checkbox 
                    style={{marginBottom: 10}}
                    onChange={e => setIsItemUsed(e.target.checked)}
                >
                        Item é usado
                </Checkbox>

                <Button type="primary" onClick={() => setDrawerCreateAuctionVisible(true)}>Cadastrar</Button> */}
                <ClickableText onClick={() => onLogout()}>Sair</ClickableText> 
                <div className="table-wrapper">
                    <Table style={{height: 550}} scroll={{ y: 500 }} pagination={false} dataSource={ListValue} columns={columns}/>
                </div>
                <Button type="primary" onClick={() => setDrawerCreateAuctionVisible(true)}>
                    <PlusOutlined /> Novo Leilão
                </Button>
            </div>
        </Wrapper>
        <Drawer
            title="Novo Leilão"
            placement="right"
            closable={true}
            width={400}
            onClose={() =>  setDrawerCreateAuctionVisible(false)}
            visible={drawerCreateAuctionVisible}
            footer = { <Button type="primary" onClick={() => console.log('ok')}>Cadastrar</Button>}
        >
            <div className='card-wrapper'>    
                    <div className="cadastro-wrapper">
                        {InputLabel("Valor inicial", setInitialValue, "number")}
                        {InputLabel("Nome do leilão", setName, "string")}
                        {InputLabel("Data abertura", setOpenedAt, "dateTime")}
                        {InputLabel("Data fechamento", setClosedAt, "dateTime")}
                    </div>
                </div>
            <Checkbox 
            style={{marginBottom: 10}}
            onChange={e => setIsItemUsed(e.target.checked)}
            >
                Item é usado
            </Checkbox>
        </Drawer>
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