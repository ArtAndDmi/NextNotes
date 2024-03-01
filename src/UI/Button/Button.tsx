import classes from './Button.module.css'
import React from "react"


type Props = {
    children: React.ReactNode
    onClick: () => void
}
const Button = ({children, onClick}: Props) => {
    return (
        <button className={classes.button} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button