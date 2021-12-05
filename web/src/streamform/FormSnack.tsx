import React from 'react'
import {StreamBlockProps} from "../stream/StreamField";

interface Props {
    text: string
}

export function FormSnack(props: StreamBlockProps<Props>) {
    React.useEffect(() => {
        props.config.actions.openSnack(props.value.text)
    }, [])
    return null
}