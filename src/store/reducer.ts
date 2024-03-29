const defaultState = {
    activeFilter: 'none',
    searchValue: '',
    needToUpdate: false
}

const SET_SEARCH_VALUE = 'LOGIN'
const SET_ACTIVE_FILTER = 'SET_TOKEN'
const SET_NEED_TO_UPDATE = 'SET_NEED_TO_UPDATE'

type Action = {
    type: string
    payload: any
}

export const reducer = (state = defaultState, action: Action) => {
    switch (action.type){
        case SET_SEARCH_VALUE:
            return {...state, searchValue: action.payload}
        case SET_ACTIVE_FILTER:
            return {...state, activeFilter: action.payload}
        case SET_NEED_TO_UPDATE:
            return {...state, needToUpdate: !state.needToUpdate}
        default:
            return state
    }
}

export const searchAction = (value: string) => ({type: SET_SEARCH_VALUE, payload: value})
export const filterAction = (filter: string) => ({type: SET_ACTIVE_FILTER, payload: filter})
export const updateAction = () => ({type: SET_NEED_TO_UPDATE, payload: null})



