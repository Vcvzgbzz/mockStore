import React,{ChangeEvent} from 'react';

interface InputProps {
    className?: string;
    text?: any;
    onChange:(event: ChangeEvent<HTMLInputElement>)=>void
    value?:string|number
}

function Input({ className, value,onChange}: InputProps) {
    return (
        <input className={className} onChange={onChange} value={value}/>
    );
}

export default Input;