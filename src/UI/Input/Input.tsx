'use client'

import classes from './Input.module.css'
import SearchIcon from "@/svg/SearchIcon"
import React, {useRef, useState} from "react"


type Props = {
    placeHolder: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    value: string
}
const Input = ({placeHolder, value, onChange}: Props) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [focused, setFocused] = useState(false)
    const onFocus = () => setFocused(true)
    const onBlur = () => setFocused(false)
    const focus = () => {
        if (inputRef.current) {
            inputRef.current?.focus()
        }
    }

    return (
        <div className={classes.container} onClick={focus} style={focused ? {boxShadow: '0 0 15px #fff'} : {boxShadow: '0 0 15px transparent'}}>
            <input
                type={'text'}
                className={classes.input}
                ref={inputRef}
                onFocus={onFocus}
                onBlur={onBlur}
                placeholder={placeHolder}
                value={value}
                onChange={onChange}
            />
            <SearchIcon/>
        </div>
    )
}

export default Input