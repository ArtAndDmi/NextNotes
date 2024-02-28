'use client'

import classes from './ToolBar.module.css'
import PlusIcon from "@/app/svg/PlusIcon"
import Button from "@/app/UI/Button/Button"
import Input from "@/app/UI/Input/Input"
import React, {Dispatch, SetStateAction, useState} from "react"
import axios from "axios"
import Select from "@/app/UI/Select/Select"
import {useDispatch, useSelector} from "react-redux"
import {filterAction, searchAction} from "@/app/store/reducer"


type Props = {
    setSearchValue: Dispatch<SetStateAction<string>>
    getData: () => void
    notesCount: number
}
const ToolBar = ({setSearchValue, getData, notesCount}: Props) => {
    const [inputValue, setInputValue] = useState(useSelector((state: {searchValue: string}) => state.searchValue))
    const dispatch = useDispatch()

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.target) {
            setInputValue(e.target.value)
            setSearchValue(e.target.value)
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
        await axios.post('http://localhost:3000/notes', {
            id: `${notesCount + 1}`,
            title: 'untitled',
            body: ''
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