'use client'

import classes from './ToolBar.module.css'
import PlusIcon from "@/svg/PlusIcon"
import Button from "@/UI/Button/Button"
import Input from "@/UI/Input/Input"
import React, {useEffect, useState} from "react"
import Select from "@/UI/Select/Select"
import {useDispatch, useSelector} from "react-redux"
import {filterAction, searchAction, updateAction} from "@/store/reducer"
import {NoteController} from "@/controllers/Note.controller"



const ToolBar = () => {
    const [inputValue, setInputValue] = useState(useSelector((state: { searchValue: string }) => state.searchValue))
    const dispatch = useDispatch()
    const [notesCount, setNotesCount] = useState(0)

    useEffect(() => {
         const getData = async () => {
             const {data} = await NoteController.getAll()
             setNotesCount(data.length)
         }
         getData()
    }, [])

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


    const onClick = async () => {
        const [day, month, year] = [`${new Date().getUTCDay()}`, `${new Date().getMonth()}`, `${new Date().getFullYear()}`]

        const newPost = {
            id: `${notesCount + 1}`,
            title: 'untitled',
            body: '',
            created_at: `${day.length === 1 ? '0' + day : day}-${month.length === 1 ? '0' + month : month}-${year.length === 1 ? '0' + year : year}`,
            updated_at: '-'
        }
        try {
            await NoteController.addOne(newPost)
            dispatch(updateAction())
            setNotesCount(notesCount + 1)


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
                <Select options={options}
                        initialValue={useSelector((state: { activeFilter: string }) => state.activeFilter)}/>
            </div>
        </div>
    )
}

export default ToolBar