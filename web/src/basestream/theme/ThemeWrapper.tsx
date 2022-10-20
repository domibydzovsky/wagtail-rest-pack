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
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
            paddingBottom: theme.spacing(2),
            paddingTop: theme.spacing(2),
        },
        primarylight: {
            backgroundColor: theme.palette.primary.light,
            boxShadow: theme.shadows[5],
            color: theme.palette.primary.contrastText,
            "& h2, h3, p, hr": {
                color: "white !important",
            },
            "& h2::first-letter, h3::first-letter": {
                fontSize: "1.3em",
                color: theme.palette.secondary.light,
            },
            "& a": {
                color: theme.palette.secondary.light,
            },
            "& blockquote":{
                display: "none"
            }
        },
        primarydark: {
            backgroundColor: theme.palette.primary.dark,
            boxShadow: theme.shadows[5],
            color: theme.palette.primary.contrastText,
            "& h2, h3, p, hr": {
                color: "white !important",
            },
            "& a": {
                color: theme.palette.secondary.light,
            },
            "& h2::first-letter, h3::first-letter": {
                fontSize: "1.3em",
                color: theme.palette.secondary.light,
            },
        },
        secondarylight: {
            backgroundColor: theme.palette.secondary.light,
            boxShadow: theme.shadows[5],
            color: theme.palette.secondary.contrastText,
            "& h2, h3, p, hr": {
                color: "white !important",
            },
            "& a": {
                color: theme.palette.primary.light,
            },
            "& h2::first-letter, h3::first-letter": {
                fontSize: "1.3em",
                color: theme.palette.primary.light,
            },
        },
        secondarydark: {
            backgroundColor: theme.palette.secondary.dark,
            boxShadow: theme.shadows[5],
            color: theme.palette.secondary.contrastText,
            "& h2, h3, p, hr": {
                color: "white !important",
            },
            "& a": {
                color: theme.palette.primary.light,
            },
            "& h2::first-letter, h3::first-letter": {
                color: theme.palette.primary.light,
                fontSize: "1.3em",
            },
        },
        whitelight: {
            "& h2, h3": {
                color: "black !important",
            },
            "& h2::first-letter, h3::first-letter": {
                color: theme.palette.primary.light,
                fontSize: "1.3em",
            },
        },
        whitedark: {
            "& h2, h3": {
                color: "black !important",
            },
            "& h2::first-letter, h3::first-letter": {
                color: theme.palette.primary.light,
                fontSize: "1.3em",
            },
        }
    }
})
