import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
type AddItemFormType = {
    maxLengthUserMessage:number
    addNewItem:(title:string)=>void
}

 export const AddItemForm: FC<AddItemFormType> = ({
 maxLengthUserMessage,
     addNewItem

}) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const changeLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
     const addItem = () => {
         const trimmedTitle = title.trim()
         if (trimmedTitle) {
             addNewItem(trimmedTitle)
         } else {
             setError(true)
         }
         setTitle("")
     }
     const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addItem()


     const userErrorMessage = error && <div style={{color: "hotpink"}}>Title is required!</div> // title is missing
     const isUserMessageToLong: boolean = title.length > maxLengthUserMessage // title so long
     const isAddBtnDisabled =! title.length || isUserMessageToLong || error//disable button
     const userMaxLengthMessage = isUserMessageToLong && <div style={{color: "hotpink"}}>Task title is to long!</div> //title so long
     const inputErrorClasses = error || isUserMessageToLong ? "input-error" : "" // error class
     const onKeyDownHandler = isAddBtnDisabled ? undefined : onKeyDownAddTask

    return (
        <div>
            {/*<input ref={addTaskInput}/>*/}
            {/*<button onClick={addTask}>+</button>*/}
            <input
                value={title}
                placeholder="Please, enter title"
                onChange={changeLocalTitle}
                onKeyDown={onKeyDownHandler}
                className={inputErrorClasses}
            />
            <button disabled={isAddBtnDisabled} onClick={addItem}>+</button>
            {userMaxLengthMessage}
            {userErrorMessage}
        </div>
    );
};

