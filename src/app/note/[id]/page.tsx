'use client'

import React, {useEffect, useState} from 'react'
import classes from './NotePage.module.css'
import {useRouter} from "next/navigation"
import BackArrowIcon from "@/svg/BackArrowIcon"
import {NoteController} from "@/controllers/Note.controller"

const NotePage = ({params}: { params: { id: string } }) => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [createdAt, setCreatedAt] = useState('')
    const [updatedAt, setUpdatedAt] = useState('')
    const [isSaved, setIsSaved] = useState(false)
    const router = useRouter()

    const titleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target) {
            setTitle(e.target.value)
        }
    }

    const bodyOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target) {
            setBody(e.target.value)
        }
    }

    const saveNote = async () => {
        const [day, month, year] = [`${new Date().getUTCDay()}`, `${new Date().getMonth()}`, `${new Date().getFullYear()}`]
        const newNote = {
            title: title.length === 0 ? 'untitled' : title,
            body: body,
            updated_at: `${day.length === 1 ? '0' + day : day}-${month.length === 1 ? '0' + month : month}-${year.length === 1 ? '0' + year : year}`,
            created_at: createdAt,
            id: params.id
        }

        try {
            await NoteController.rewriteOne(params.id, newNote)
            await getNote()
            setIsSaved(true)
        } catch (e) {
            console.log(e)
        }
    }

    const deleteNote = async () => {
        try {
            await NoteController.deleteOne(params.id)
            router.back()
        } catch (e) {
            console.log(e)
        }
    }

    const getNote = async () => {
        const res = await NoteController.getOne(params.id)
        setTitle(res.data[0].title)
        setBody(res.data[0].body)
        setCreatedAt(res.data[0].created_at)
        setUpdatedAt(res.data[0].updated_at)
    }

    useEffect(() => {
        getNote()
    }, [])

    return (
        <div className={classes.container}>
            <div className={classes.topElements}>
                <button onClick={() => router.back()} className={classes.backBtn}>
                    <BackArrowIcon/>
                </button>
                <input
                    value={title}
                    className={classes.noteTitle}
                    onChange={titleOnChange}
                />
            </div>

            <textarea
                value={body}
                className={classes.noteBody}
                onChange={bodyOnChange}
            />

            <div className={classes.btnContainer}>
                <button onClick={saveNote} className={classes.saveBtn}>{isSaved ? 'Saved' : 'Save'}</button>
                <button className={classes.deleteBtn} onClick={deleteNote}>Delete</button>
                <div>
                    <span>Created: {createdAt}</span>
                    <span>Updated: {updatedAt}</span>
                </div>

            </div>



        </div>
    )
}

export default NotePage