import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    value: string
    changeValue?: (value: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {

    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.value)

    const activatedEditMode = () => {
        setEditMode(true)
    }

    const deActivatedEditMode = () => {
        setEditMode(false)
        if(props.changeValue) {
            props.changeValue(title)
        }
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
    ?<TextField
            variant={"outlined"}
            value={title}
            onBlur={deActivatedEditMode}
            autoFocus
            onChange={onChangeTitle}
        />
        : <span onDoubleClick={activatedEditMode}>{props.value}</span>

}

