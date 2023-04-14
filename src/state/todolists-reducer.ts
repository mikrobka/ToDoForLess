import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListActionType = ReturnType<typeof RemoveTodoListAC>
export type AddTodoListActionType = ReturnType<typeof AddTodoListAC>
export type ChangeTodoListTitleActionType = ReturnType<typeof ChangeTodoListTitleAC>
export type ChangeTodoListFilterActionType = ReturnType<typeof ChangeTodoListFilterAC>



export type ActionType = RemoveTodoListActionType | AddTodoListActionType | ChangeTodoListTitleActionType | ChangeTodoListFilterActionType

const initailState:Array<TodoListType> = []

export const todolistsReducer = (state = initailState, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST" :
            return state.filter(tl => tl.id !== action.payload.id)
        case "ADD-TODOLIST":
            debugger
            const newTodoList: TodoListType = {
                id: action.payload.todoListId,
                title: action.payload.title,
                filter: "all"
            }
            return [...state, newTodoList]
        case "CHANGE-TODO-LIST-TITLE":
            return state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
        case "CHANGE-TODO-LIST-FILTER":
            return state.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)
        default:
            return state
    }
}


// Action Creater
export const RemoveTodoListAC = (id: string) => {
    return {type: "REMOVE-TODOLIST", payload:{id,}} as const
}

export const AddTodoListAC = (title: string) => {
    return {type: "ADD-TODOLIST", payload:{title , todoListId:v1()}} as const
}

export const ChangeTodoListTitleAC = (title: string,id:string) => {
    return {type: "CHANGE-TODO-LIST-TITLE", payload:{title,id}} as const
}

export const ChangeTodoListFilterAC = (filter: FilterValuesType,id:string) => {
    return {type: "CHANGE-TODO-LIST-FILTER", payload:{filter,id}} as const
}
