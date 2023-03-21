import React, {ChangeEvent, FC, useState, KeyboardEvent} from 'react';
import TasksList from "./TasksList";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AdditemForm";
import EditableSpan from "./EditableSpan";
import {Button, IconButton, Typography} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

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
    changeTasksTitle: (taskId: string, newTitle: string, todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
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
    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.todoListId)
    }

    return (
        <div className={"todolist"}>
            <div className={"todolist-title"}>
                <Typography variant={"h4"} align={"center"}><EditableSpan title={props.title} changeTitle={changeTodoListTitle}/></Typography>
                <IconButton aria-label="delete" onClick={removeTodoList}>
                    <DeleteIcon/>
                </IconButton>
            </div>

            <div>
                <AddItemForm maxLengthUserMessage={15} addNewItem={addTask}/>
                <TasksList
                    todoListId={props.todoListId}
                    tasks={props.tasks}
                    removeTask={props.removeTask}
                    changeTaskStatus={props.changeTaskStatus}
                    changeTasksTitle={props.changeTasksTitle}
                />
            </div>

            <div className="filter-btn-container">
                <Button
                    size="small"
                    variant="outlined"
                    color={props.filter === "all" ? "secondary" : "primary"}
                    onClick={handlerCreator("all")}>
                    All
                </Button>
                <Button
                    size="small"
                    variant="outlined"
                    color={props.filter === "active" ? "secondary" : "primary"}
                    onClick={handlerCreator("active")}>
                    Active
                </Button>
                <Button
                    size="small"
                    variant="outlined"
                    color={props.filter === "completed" ? "secondary" : "primary"}
                    onClick={handlerCreator("completed")}>
                    Completed
                </Button>
            </div>
        </div>
    );
};

export default TodoList;