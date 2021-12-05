import React, { Fragment, Component } from 'react';
import {DialogProps, StreamBlock, StreamBlockProps} from "../stream/StreamField";


interface Props {
    title: string
    text: StreamBlock<any>[]
}

export interface InsideDialogProps {
    context: StreamBlockProps<any>
    stream: StreamBlock<any>[]
}

function InsideDialog(props: InsideDialogProps) {
    return <React.Fragment>{props.context.recursive(props.stream, {
        containerized: false
    })}</React.Fragment>
}

export function StreamDialog(props: StreamBlockProps<Props>) {

    React.useEffect(() => {
        const componentProps: InsideDialogProps = {
            context: props,
            stream: props.value.text
        }
        const data: DialogProps<InsideDialogProps> = {
            title: props.value.title,
            component: InsideDialog,
            componentProps: componentProps
        }
        props.config.actions.openDialog(data)
    },[])
    return null
}

