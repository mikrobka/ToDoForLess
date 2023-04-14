import React, {ChangeEvent, FC} from 'react';
import {TaskType} from "./TodoList";
import EditableSpan from "./EditableSpan";
import {Checkbox, IconButton, List, ListItem} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";

type TasksListPropsType = {
    todoListId: string
    tasks: TaskType[]
}

const TasksList: FC<TasksListPropsType> = ({todoListId,tasks}): JSX.Element => {
    const dispatch = useDispatch()
    const tasksItems: JSX.Element[] | JSX.Element =
        tasks.length
            ? tasks.map((task) => {
                const taskClasses = task.isDone ? "task task-done" : "task"
                const removeTaskHandler = () => dispatch(removeTaskAC(task.id,todoListId))
                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusAC(task.id,e.currentTarget.checked,todoListId))
                const changeTaskTitleHandler = (title: string) => {
                    dispatch(changeTaskTitleAC(task.id,title,todoListId))
                }
                return (
                    <ListItem key={task.id} disablePadding={false} disableGutters={true}
                              secondaryAction={<IconButton aria-label="delete" onClick={removeTaskHandler}>
                                  <DeleteIcon/>
                              </IconButton>}
                    >
                        <Checkbox
                            checked={task.isDone}
                            onChange={changeTaskStatusHandler} defaultChecked size={"small"} sx={{margin: -1}}/>
                        <EditableSpan title={task.title} spanClasses={taskClasses} changeTitle={changeTaskTitleHandler}/>

                    </ListItem>
                )
            })
            : <span>Your taskslist is empty</span>
    return (
        <List>
            {tasksItems}
        </List>
    );
};

export default TasksList;