import React, { useState, useEffect } from 'react' 
import { Drawer, Button, Checkbox } from 'antd'
import CurrencyInput from './CurrencyInput'
import InputLabel from './InputLabel'
import { useDoRequest } from '../hooks/useDoRequest'
import { IGetAuctionOutput, IAuctionDTO, IGetAuctionInput } from '../services/auction/auctionInterface'
import auctionRequest from '../services/auction/auctionRequest'
import moment from 'moment'
import notificationUtils from '../utils/notificationUtils'
import DateTimeInput from './DateTimeInput'

interface IProps {
  onClose: () => void,
  visible: boolean,
  auctionId: number | undefined
  onConfirm: (InitialValue : number, Name : string, OpenedAt : string, ClosedAt : string, isItemUsed: boolean) => void,
}

export default function DrawerAuction({onClose, visible, auctionId, onConfirm }: IProps) {

  const [
    getAuctionByIdRequest,
    getAuctionByIdResponse,
    ,
    ,
    setGetAuctionByIdResponse
  ] = useDoRequest<IGetAuctionOutput>();

  let NameInitialValue : string | undefined = getAuctionByIdResponse?.Auction.Name ?? "";
  let InitialValueInitialValue : number = getAuctionByIdResponse?.Auction.InitialValue ?? 0;
  let OpenedAtInitialValue : string | undefined = getAuctionByIdResponse?.Auction.OpenedAt ?? moment().toISOString()
  let ClosedAtInitialValue : string | undefined = getAuctionByIdResponse?.Auction.ClosedAt ?? moment().toISOString()

  const [Auction, setAuction] = useState<IAuctionDTO | undefined>(undefined);
  const [Name, setName] = useState<string | undefined>(NameInitialValue);
  const [InitialValue, setInitialValue] = useState<number>(InitialValueInitialValue);
  const [OpenedAt, setOpenedAt] = useState<string | undefined>(OpenedAtInitialValue);
  const [ClosedAt, setClosedAt] = useState<string | undefined>(ClosedAtInitialValue);
  const [isItemUsed, setIsItemUsed] = useState<boolean>(false);

  const ActionName = auctionId ? "Editar" : "Criar"

  function onVisibilityChange(){
    if(!auctionId) return;
    getAuctionByIdRequest(() => auctionRequest.GetAuction({AuctionId: auctionId}))
    if(!visible){
      setGetAuctionByIdResponse(undefined)
      setName(undefined)
      setInitialValue(0)
      setOpenedAt(undefined)
      setClosedAt(undefined)
    }
  }
  useEffect(onVisibilityChange, [visible])

  function onConfirmClick(){
    console.log({InitialValue, Name, OpenedAt, ClosedAt, isItemUsed})
    if(!InitialValue || !Name || !OpenedAt || !ClosedAt){
      notificationUtils.error("Não é possível criar um leilão sem preencher os dados obrigatórios")
      return;
    }
    onConfirm(InitialValue, Name, OpenedAt, ClosedAt, isItemUsed);
  }

  return (
    <Drawer
    title={`${ActionName} Leilão`}
    placement="right"
    closable={true}
    width={400}
    onClose={onClose}
    visible={visible}
    footer = { <Button type="primary" onClick={onConfirmClick}>{ActionName}</Button>}
    >
      {visible && <>
          <div className='card-wrapper'>    
                  <div className="cadastro-wrapper">
                      <CurrencyInput label={"Valor Inicial"} value={getAuctionByIdResponse?.Auction.InitialValue}  setState={setInitialValue} />
                      <InputLabel label={"Nome do leilão"} value={getAuctionByIdResponse?.Auction.Name} setState={setName} />
                      <DateTimeInput label={"Data abertura"} currentValue={getAuctionByIdResponse?.Auction.OpenedAt} setState={setOpenedAt} />
                      <DateTimeInput label={"Data fechamento"} currentValue={getAuctionByIdResponse?.Auction.ClosedAt} setState={setClosedAt} />
                  </div>
              </div>
          <Checkbox 
          style={{marginBottom: 10}}
          onChange={e => setIsItemUsed(e.target.checked)}
          >
              Item é usado
          </Checkbox>
        </>
      }
      </Drawer>
  )
}