import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { DatePicker } from 'antd'
import moment, { Moment } from 'moment';

interface IProps {
  label: string,
  currentValue: string | undefined
  setState: Dispatch<SetStateAction<string | undefined>>,
}

let SpecialData = moment().toISOString()

export default function DateTimeInput({label, currentValue, setState} : IProps){
  function disabledDate(current: Moment) {
    return current && current < moment().add(-1,"days").endOf('day');
  } 

  console.log(currentValue)

  function onComponentMount(){
    if(currentValue){
      SpecialData = currentValue
      setState(currentValue)
    }
  }
  useEffect(onComponentMount,[])

  return (
    <div className="label-input-wrapper">
    <label>{label}:</label>
    <DatePicker
      format="DD/MM/YYYY"
      defaultValue={moment(currentValue)}
      disabledDate={disabledDate}
      //@ts-ignore
      onChange={value => SpecialData = value?.toISOString()}
      style={{width: '100%'}}
      key={currentValue + ``}
      onBlur={() => setState(SpecialData)}
    />
    </div>
  )
}