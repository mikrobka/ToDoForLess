import { TextField } from '@mui/material';
import React, {ChangeEvent, FC, useState} from 'react';

type EditableSpanType = {
    title:string
    spanClasses?:string
    inputClasses?:string
    changeTitle:(title:string)=>void
}

const EditableSpan: FC<EditableSpanType> = ({
            title,
            spanClasses,
            inputClasses,
            changeTitle
}) => {

    const [editMode,setEditMod] = useState<boolean>(false)
    const [localTitle, setLocalTitle] = useState<string>(title)
    const changeLocalTitle = (e:ChangeEvent<HTMLInputElement>)=>{setLocalTitle(e.currentTarget.value)}
    const onEditMode = () => {
        setEditMod(true)
    }
    const offEditMode = () => {
        setEditMod(false)
        changeTitle(localTitle)
    }


    return (
        editMode
        ? <TextField variant={"standard"}  size={"small"} value={localTitle} onChange={changeLocalTitle} autoFocus={true} onBlur={offEditMode}/>
        : <span className={spanClasses} onDoubleClick={onEditMode}>{title}</span>

    );
};

export default EditableSpan;