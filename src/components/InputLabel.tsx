import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { Input } from 'antd'

interface IProps {
  label: string,
  value?: string,
  setState: Dispatch<SetStateAction<string | undefined>>,
}

let InputLabelValue : string | undefined = undefined;


export default function InputLabel ({label, setState, value}:IProps){

  function onComponentMount(){
    if(value){
      InputLabelValue = value
      setState(value)
    }
  }
  useEffect(onComponentMount,[])

  return (
    <div className="label-input-wrapper">
      <label>{label}:</label>
       { 
        !value && <Input onChange={e => InputLabelValue = e.target.value} onBlur={() => setState(InputLabelValue)} />
       }
       {
         value && <Input onChange={e => InputLabelValue = e.target.value} defaultValue={value} onBlur={() => setState(InputLabelValue)}/>
       }
    </div>
  )
}