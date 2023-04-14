import IconButton from '@mui/material/IconButton/IconButton';
import AddIcon from '@mui/icons-material/Add';
import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {TextField } from '@mui/material';
import {useDispatch} from "react-redux";
import {AddTodoListAC} from "./state/todolists-reducer";

type AddItemFormType = {
    maxLengthUserMessage: number

}

export const AddItemForm: FC<AddItemFormType> = ({maxLengthUserMessage}) => {

    const dispatch = useDispatch()
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const changeLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            dispatch(AddTodoListAC(trimmedTitle))
        } else {
            setError(true)
        }
        setTitle("")
    }
    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addItem()


    // const userErrorMessage = error && <div style={{color: "hotpink"}}>Title is required!</div> // title is missing
    const isUserMessageToLong: boolean = title.length > maxLengthUserMessage // title so long
    const isAddBtnDisabled = !title.length || isUserMessageToLong || error//disable button
    // const userMaxLengthMessage = isUserMessageToLong && <div style={{color: "hotpink"}}>Task title is to long!</div> //title so long
    const inputErrorClasses = error || isUserMessageToLong ? "input-error" : "" // error class
    const onKeyDownHandler = isAddBtnDisabled ? undefined : onKeyDownAddTask
    const isInputShowError = isUserMessageToLong || error
    const helperText = (error && "Title is required") || (isUserMessageToLong && "Title is too long!" )

    return (
        <div>
            {/*<input ref={addTaskInput}/>*/}
            {/*<button onClick={addTask}>+</button>*/}
            <TextField
                size={"small"}
                variant={"outlined"}
                value={title}
                placeholder="Please, enter title"
                onChange={changeLocalTitle}
                onKeyDown={onKeyDownHandler}
                className={inputErrorClasses}
                error={isInputShowError}
                helperText={helperText}
            />
            <IconButton onClick={addItem} disabled={isAddBtnDisabled} color={"primary"}>
                <AddIcon/>
            </IconButton>
        </div>
    );
};

