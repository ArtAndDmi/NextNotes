import classes from './NotePageContent.module.css'
import {useEffect, useState} from "react"
import {NoteType} from "@/app/types"
import {useSelector} from "react-redux"
import ToolBar from "@/app/components/ToolBar/ToolBar"
import NoteList from "@/app/components/NoteList/NoteList"
import axios from "axios"

const NotePageContent = () => {
    const [notes, setNotes] = useState<NoteType[]>([])
    const [sortedNotes, setSortedNotes] = useState<NoteType[]>([])
    const [searchValue, setSearchValue] = useState('')
    const activeSort = useSelector((state: { activeFilter: string }) => state.activeFilter)

    const getData = async () => {
        const res = await axios.get('http://localhost:3000/notes')
        setNotes(res.data)
        setSortedNotes(res.data)
    }

    useEffect(() => {
        getData()
    }, [])

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
            <ToolBar setSearchValue={setSearchValue} getData={getData} notesCount={notes.length}/>
            <NoteList notes={sortedNotes}/>
        </div>
    )
}


export default NotePageContent

