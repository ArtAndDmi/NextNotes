import classes from './Note.module.css'
import {NoteType} from "@/app/types"
import {useEffect, useRef, useState} from "react"
import { useRouter } from 'next/navigation'

type Props = {
    note: NoteType
}
const Note = ({note}: Props) => {
    const titleRef = useRef<HTMLSpanElement>(null)
    const [titleWidth, setTitleWidth] = useState(0)
    const [rotate, setRotate] = useState(0)
    const router = useRouter()

    useEffect(() => {
        setRotate(Math.floor(Math.random() * 8 + -4))
        const handleResize = () => {
            if (titleRef.current) {
                const width = titleRef.current?.offsetWidth
                setTitleWidth(width)
            }
        }

        window.addEventListener('resize', handleResize)

        handleResize()

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])


    return (
        <div className={classes.container} onClick={() => router.push(`/note/${note.id}`)}>
            <div className={classes.note} style={{rotate: `${rotate}deg`}}>
                <p className={classes.noteBody}>{note.body}</p>
            </div>

            <span className={classes.noteTitle}
                  ref={titleRef}>{titleWidth < 270 ? note.title : note.title.slice(0, 25) + '...'}</span>
        </div>
    )
}

export default Note