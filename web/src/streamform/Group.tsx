import React from 'react'
import {StreamBlock, StreamBlockProps} from "../stream/StreamField";
import {FieldVisibility} from "./Handler";
import {FormGroup, FormLabel} from "@material-ui/core";
import {makeStyles, Theme} from "@material-ui/core/styles";
import clsx from "clsx";
import {AddonsDecoratorProps} from "./FormConfig";

export interface Props extends AddonsDecoratorProps {
    row: boolean
    required: FieldVisibility
    stream: StreamBlock<any>[]
}

export function Group(props: StreamBlockProps<Props>) {
    const context = props.context.formContext
    const classes = useStyles()
    if (!context?.isVisible(props.value.required)) {
        return null
    }
    const styles = context!!.handler.style
    const data = props.value
    const formGroupClass = clsx({
        [classes.row]: data.row
    })

    return <div className={classes.root}>
        <FormLabel component="legend"
                   className={classes.label}
                   color={styles.color}>
            { data.name }
        </FormLabel>
        <FormGroup row={data.row} className={formGroupClass}>
            {props.recursive(props.value.stream, {containerized: false})}
        </FormGroup>
    </div>
}

const useStyles = makeStyles((theme: Theme)=> {
    return {
        root: {
            // marginLeft: theme.spacing(1),
        },
        label: {
            margin: 5,
            color: theme.palette.primary.dark
        },
        row: {
            flexWrap: "unset",
            display: "flex",
            alignItems: "center",
            [theme.breakpoints.down("xs")]: {
                display: "unset",
                flexWrap: "wrap",
            }
        }
    }
})
