import axios from "axios"
import {TNote} from "@/app/types"

export const NoteController = {
    getAll: async () => await axios.get<TNote[]>(`${process.env.API_URL}/notes`),
    getOne: async (id: string) =>  await axios.get('http://localhost:3000/notes?id=' + id),
    deleteOne: async (id: string) => await axios.delete(`${process.env.API_URL}/notes/` + id),
    rewriteOne: async (id: string, newNote:TNote) => await axios.put(`${process.env.API_URL}/notes/` + id, newNote),
    addOne: async (newNote: TNote) => await axios.post('http://localhost:3000/notes', newNote)
}