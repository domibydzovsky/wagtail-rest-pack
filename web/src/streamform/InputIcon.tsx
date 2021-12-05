import React from 'react'
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import SearchIcon from "@material-ui/icons/Search";
import CommentIcon from '@material-ui/icons/Comment';
import SendIcon from '@material-ui/icons/Send';

export type TextIcon = "inherit" | "search" | "comment" | "send"

export interface Props {
    type: TextIcon,
    color?: "disabled" | "primary" | "secondary"
    inputProps?: any
}

export function InputIcon(props: Props) {
    const inputProps: any = props.inputProps || {}
    if (props.color) {
        inputProps['color'] = props.color
    }
    switch (props.type) {
        case "comment":
        return <CommentIcon {...inputProps}/>
        case "send":
        return <SendIcon {...inputProps}/>
        case "search":
        return <SearchIcon {...inputProps}/>
        case "inherit":
        return <LabelImportantIcon {...inputProps}/>
    }
}