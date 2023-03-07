import React, {ChangeEvent, FC, useState, KeyboardEvent} from 'react';
import TasksList from "./TasksList";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AdditemForm";
import EditableSpan from "./EditableSpan";

type TodoListPropsType = {
    todoListId: string
    title: string
    filter: FilterValuesType
    tasks: TaskType[]
    changeTodoListFilter: (filter: FilterValuesType, todoListId: string) => void
    removeTask: (taskId: string, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTasksTitle : (taskId: string, newTitle: string, todoListId: string) =>void
     changeTodoListTitle : (title: string, todoListId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: FC<TodoListPropsType> = (props) => {
    const addTask = (title: string) => {
        props.addTask(title, props.todoListId)
    }
    const handlerCreator = (filter: FilterValuesType): () => void => (): void => props.changeTodoListFilter(filter, props.todoListId)
    const removeTodoList = () => {
        props.removeTodoList(props.todoListId)
    }
    const changeTodoListTitle = (title:string) => {
        props.changeTodoListTitle(title,props.todoListId)
    }

    return (
        <div className={"todolist"}>
            <div className={"title-todolist"}>
                <h3>{<EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>}</h3>
                <button onClick={removeTodoList}>X</button>
            </div>

            <AddItemForm maxLengthUserMessage={15} addNewItem={addTask}/>
            <TasksList
                todoListId={props.todoListId}
                tasks={props.tasks}
                removeTask={props.removeTask}
                changeTaskStatus={props.changeTaskStatus}
                changeTasksTitle={props.changeTasksTitle}
            />
            <div className="filter-btn-container">
                <button
                    className={props.filter === "all" ? "active-filter-btn" : "filter-btn"}
                    onClick={handlerCreator("all")}
                >All
                </button>
                <button
                    className={props.filter === "active" ? "active-filter-btn" : "filter-btn"}
                    onClick={handlerCreator("active")}
                >Active
                </button>
                <button
                    className={props.filter === "completed" ? "active-filter-btn" : "filter-btn"}
                    onClick={handlerCreator("completed")}
                >Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;