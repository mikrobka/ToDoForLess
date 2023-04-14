import React, { FC} from 'react';
import {AddItemForm} from "./AdditemForm";
import EditableSpan from "./EditableSpan";
import {Button, IconButton, Typography} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {TodoListType} from "./App";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {ChangeTodoListFilterAC, ChangeTodoListTitleAC, RemoveTodoListAC} from "./state/todolists-reducer";
import TasksListWithRedux from "./TasksListWithRedux";

type TodoListPropsType = {
    todoList: TodoListType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: FC<TodoListPropsType> = ({todoList}) => {
    const {id, title, filter} = todoList
    let tasks = useSelector<AppRootStateType, Array<TaskType>>((state) => state.tasks[id])
    const dispatch = useDispatch()

    const onAllClickHandler = () => dispatch(ChangeTodoListFilterAC("all", id))
    const onActiveClickHandler = () => dispatch(ChangeTodoListFilterAC("active", id))
    const onCompleteClickHandler = () => dispatch(ChangeTodoListFilterAC("completed", id))
    const removeTodoList = () => {
        const action = RemoveTodoListAC(id)
        dispatch(action)
    }
    const changeTodoListTitle = (title: string) => {
        let action = ChangeTodoListTitleAC(title, id)
        dispatch(action)
    }

    return (
        <div className={"todolist"}>
            <div className={"todolist-title"}>
                <Typography variant={"h4"} align={"center"}><EditableSpan title={title}
                                                                          changeTitle={changeTodoListTitle}/></Typography>
                <IconButton aria-label="delete" onClick={removeTodoList}>
                    <DeleteIcon/>
                </IconButton>
            </div>

            <div>
                <AddItemForm maxLengthUserMessage={15} />
                <TasksListWithRedux
                    todoListId={id}
                    tasks={tasks}
                />
            </div>

            <div className="filter-btn-container">
                <Button
                    size="small"
                    variant="outlined"
                    color={filter === "all" ? "secondary" : "primary"}
                    onClick={onAllClickHandler}>
                    All
                </Button>
                <Button
                    size="small"
                    variant="outlined"
                    color={filter === "active" ? "secondary" : "primary"}
                    onClick={onActiveClickHandler}>
                    Active
                </Button>
                <Button
                    size="small"
                    variant="outlined"
                    color={filter === "completed" ? "secondary" : "primary"}
                    onClick={onCompleteClickHandler}>
                    Completed
                </Button>
            </div>
        </div>
    );
};

export default TodoList;