'use client'

import {Provider} from 'react-redux'
import store from './store'
import NotePageContent from "@/app/components/NotePageContent/NotePageContent"


export default function Home() {

    return (
        <main>
            <Provider store={store}>
                <NotePageContent/>
            </Provider>
        </main>
    )
}
