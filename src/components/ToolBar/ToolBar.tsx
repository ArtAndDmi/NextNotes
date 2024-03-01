'use client'

import classes from './ToolBar.module.css'
import PlusIcon from "@/svg/PlusIcon"
import Button from "@/UI/Button/Button"
import Input from "@/UI/Input/Input"
import React, {Dispatch, SetStateAction, useState} from "react"
import axios from "axios"
import Select from "@/UI/Select/Select"
import {useDispatch, useSelector} from "react-redux"
import {filterAction, searchAction} from "@/store/reducer"


type Props = {
    getData: () => void
    notesCount: number
}
const ToolBar = ({getData, notesCount}: Props) => {
    const [inputValue, setInputValue] = useState(useSelector((state: {searchValue: string}) => state.searchValue))
    const dispatch = useDispatch()

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.target) {
            setInputValue(e.target.value)
            dispatch(searchAction(e.target.value))

        }
    }

    const options = [
        {
            name: 'date',
            fn: () => {
                dispatch(filterAction('date'))
            }
        },
        {
            name: 'name',
            fn: () => {
                dispatch(filterAction('name'))
            }
        },
    ]

    const addNote = async () => {
        const [day, month, year] = [`${new Date().getUTCDay()}`, `${new Date().getMonth()}`, `${new Date().getFullYear()}`]

        await axios.post('http://localhost:3000/notes', {
            id: `${notesCount + 1}`,
            title: 'untitled',
            body: '',
            created_at: `${day.length === 1 ? '0' + day : day}-${month.length === 1 ? '0' + month : month}-${year.length === 1 ? '0' + year : year}`,
            updated_at: '-'
        })
        getData()
    }

    const onClick = () => {
        try {
             addNote()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={classes.container}>
            <Button onClick={onClick}>
                Add new note
                <PlusIcon/>
            </Button>
            <Input
                placeHolder={'Search...'}
                value={inputValue}
                onChange={onChange}
            />
            <div className={classes.selectContainer}>
                <Select options={options} initialValue={useSelector((state: {activeFilter: string}) => state.activeFilter)}/>
            </div>
        </div>
    )
}

export default ToolBar