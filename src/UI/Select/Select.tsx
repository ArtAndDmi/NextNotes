import classes from './Select.module.css'
import {useRef, useState} from "react"


type Props = {
    options: {name: string, fn: () => void}[],
    initialValue: string
}
const Select = ({options, initialValue}: Props) => {
    const [isOptionsVisible, setIsOptionsVisible] = useState(false)
    const optionsRef = useRef<HTMLDivElement>(null)
    const showOptions = () => {
        setIsOptionsVisible(!isOptionsVisible)
        if (isOptionsVisible && optionsRef.current) {
            optionsRef.current.style.boxShadow = 'none'
            optionsRef.current.style.height = '0'
            setTimeout(() => {
                if (optionsRef.current)
                    optionsRef.current.style.display = 'none'
            },200)
        }
        if (!isOptionsVisible && optionsRef.current) {
            optionsRef.current.style.display = 'block'
            setTimeout(() => {
                if (optionsRef.current) {
                    optionsRef.current.style.height = `${options.filter(option => option.name !== initialValue).length * 50}px`
                    optionsRef.current.style.boxShadow = '0 8px 8px rgba(0, 0, 0, 0.3)'
                }

            }, 0)
        }

    }
    return (
        <div onClick={showOptions} className={classes.container}>
            <span>{initialValue}</span>
            <div className={classes.options} ref={optionsRef}>
                {isOptionsVisible && options.filter(option => option.name !== initialValue).map(option => <p className={classes.option} onClick={option.fn} key={option.name}>{option.name}</p>)}

            </div>
        </div>
    )
}

export default Select