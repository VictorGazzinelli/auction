import React, { Dispatch, useEffect } from 'react'
import { InputNumber, Input } from 'antd'

interface IProps {
  label: string,
  setState: Dispatch<number>
  value?: number,
}

let CurrencyLabelValue = 0;


export default function CurrencyInput({label, setState, value} : IProps){
  function onComponentMount(){
    if(value){
      CurrencyLabelValue = value
      setState(value)
    }
  }
  useEffect(onComponentMount,[])

  return (
    <div className="label-input-wrapper">
    <label>{label}:</label>
    <Input
      type={"number"}
      min={0.00}
      defaultValue={value}
      onChange={e => CurrencyLabelValue = +e.target.value }
      width={'100%'}
      onBlur={() => setState(CurrencyLabelValue)}
      key={value + ``}
    />
    </div>
  )
}