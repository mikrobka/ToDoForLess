import {TaskType} from "../TodoList";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolists-reducer";
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType

export type TasksStateType = {
    [todoListId1: string]: Array<TaskType>
}

const initialState:TasksStateType = {}

export const taskReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TASK" :
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].filter(t => t.id !== action.payload.taskId)
            }

        case "ADD-TASK":
            const newTask: TaskType = {
                id: v1(),
                title: action.payload.title,
                isDone: false
            }
            const tasksForUpdate = state[action.payload.todoListId]
            return {
                ...state,
                [action.payload.todoListId]: [newTask, ...tasksForUpdate]
            }

        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    isDone: action.payload.newIsDone
                } : t)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    title: action.payload.newTitle.trim()
                } : t)
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.payload.todoListId]: []
            }
        case "REMOVE-TODOLIST":
            // const copyState = {...state}
            // delete copyState[action.payload.id]
            // return copyState
            const {[action.payload.id]:[],...rest} = {...state}
            return rest

        default:
            return state
    }
}


// Action Creater
export const removeTaskAC = (taskId: string, todoListId: string) => {
    return {type: 'REMOVE-TASK', payload: {taskId, todoListId}} as const
}

export const addTaskAC = (title: string, todoListId: string) => {
    return {type: 'ADD-TASK', payload: {title, todoListId}} as const
}
export const changeTaskStatusAC = (taskId: string, newIsDone: boolean, todoListId: string) => {
    return {type: 'CHANGE-TASK-STATUS', payload: {taskId, newIsDone, todoListId}} as const
}
export const changeTaskTitleAC = (taskId: string, newTitle: string, todoListId: string) => {
    return {type: 'CHANGE-TASK-TITLE', payload: {taskId, newTitle, todoListId}} as const
}
