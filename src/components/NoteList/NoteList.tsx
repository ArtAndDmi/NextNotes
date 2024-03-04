'use client'

import classes from './NoteList.module.css'
import Note from "@/components/Note/Note"
import type {TNote} from "@/app/types"
import {useSelector} from "react-redux"
import {useEffect, useState} from "react"
import {NoteController} from "@/controllers/Note.controller"


type Props = {
    notes: TNote[]
}
const NoteList = ({notes}: Props) => {
    const [sortedNotes, setSortedNotes] = useState<TNote[]>(notes)
    const searchValue = useSelector((state: { searchValue: string }) => state.searchValue)
    const activeSort = useSelector((state: { activeFilter: string }) => state.activeFilter)
    const needToUpdate = useSelector((state: { needToUpdate: boolean }) => state.needToUpdate)


    useEffect(() => {
        const getNotes = async () => {
            const {data} = await NoteController.getAll()
            setSortedNotes(data)
        }
        getNotes()
    }, [needToUpdate])

    useEffect(() => {
        if (activeSort === 'name') {
            setSortedNotes(
                notes.filter(note =>
                    note.title.toLowerCase().includes(searchValue.toLowerCase())
                    ||
                    note.body.toLowerCase().includes(searchValue.toLowerCase())
                ).sort((a, b) => a.title.localeCompare(b.title))
            )
        } else if (activeSort === 'date') {
            setSortedNotes(
                notes.filter(note =>
                    note.title.toLowerCase().includes(searchValue.toLowerCase())
                    ||
                    note.body.toLowerCase().includes(searchValue.toLowerCase())
                ).sort((a, b) => {
                        const dateA: Date = new Date(a.updated_at.split('-').reverse().join('-'))
                        const dateB: Date = new Date(b.updated_at.split('-').reverse().join('-'))

                        return dateB.getTime() - dateA.getTime()
                    }
                )
            )
        } else {
            setSortedNotes(
                notes.filter(note =>
                    note.title.toLowerCase().includes(searchValue.toLowerCase())
                    ||
                    note.body.toLowerCase().includes(searchValue.toLowerCase())
                )
            )
        }

    }, [searchValue, activeSort])
    return (
        <div className={classes.container}>
            {
                sortedNotes.length ?
                    sortedNotes.map(note => (
                        <Note note={note} key={note.id}/>
                    ))
                    :
                    <h1>Not found :(</h1>
            }
        </div>
    )
}

export default NoteList