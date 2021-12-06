import React from 'react'
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "@material-ui/core/styles";
import {StreamContext} from "../../stream/StreamField";


export interface Props {
    children: any,
    context: StreamContext
}

declare type Combinations =
    "primarylight"
    | "secondarylight"
    | "primarydark"
    | "secondarydark"
    | "whitelight"
    | "whitedark"

export function ThemeWrapper(props: Props) {
    const classes = useStyles()
    const row = props.context.rowData
    const className = row?.color + row!.variant as Combinations
    const clazz = classes[className]
    return <div className={classes.root + " " + clazz}>{props.children}</div>
}

const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {
            marginTop: 10,
            marginBottom: 10,
            padding: 20
        },
        primarylight: {
            backgroundColor: theme.palette.primary.light,
            boxShadow: theme.shadows[5],
        },
        primarydark: {
            backgroundColor: theme.palette.primary.dark,
            boxShadow: theme.shadows[5],
        },
        secondarylight: {
            backgroundColor: theme.palette.secondary.light,
            boxShadow: theme.shadows[5],
        },
        secondarydark: {
            backgroundColor: theme.palette.secondary.dark,
            boxShadow: theme.shadows[5],
        },
        whitelight: {},
        whitedark: {}
    }
})