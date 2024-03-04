import classes from './NotePageContent.module.css'
import ToolBar from "@/components/ToolBar/ToolBar"
import NoteList from "@/components/NoteList/NoteList"
import {NoteController} from "@/controllers/Note.controller"

const getData = async () => {
    const res = await NoteController.getAll()
    return res.data
}

const NotePageContent = async () => {
    let notes= await getData()


    return (
        <div className={classes.container}>
            <ToolBar notesCount={notes.length}/>
            <NoteList notes={notes}/>
        </div>
    )
}


export default NotePageContent

