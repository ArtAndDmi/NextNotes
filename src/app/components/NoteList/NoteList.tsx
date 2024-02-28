import classes from './NoteList.module.css'
import Note from "@/app/components/Note/Note"
import {NoteType} from "@/app/types"


type Props = {
    notes: NoteType[]
}
const NoteList = ({notes}: Props) => {
    return (
        <div className={classes.container}>
            {
                notes.length ?
                    notes.map(note => (
                        <Note note={note} key={note.id}/>
                    ))
                    :
                    <h1>Not found :(</h1>
            }
        </div>
    )
}

export default NoteList