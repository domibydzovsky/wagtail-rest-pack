import React, { Fragment, Component } from 'react';
import {makeStyles, Theme} from "@material-ui/core/styles";
import {toDateStr} from "../utils/date";


export interface Props {
    title: string
    last_published_at?: string
    variant?: "h1" | "h2"
}

export function PageTitle(props: Props) {
    const classes = useStyles()
    return <React.Fragment>
        { props.variant === "h1" && <h1>{props.title}</h1>}
        { props.variant === "h2" && <h2>{props.title}</h2>}
        {props.last_published_at && <p className={classes.modifiedAt}>
            Zveřejněno {toDateStr(props.last_published_at)}
        </p> }
    </React.Fragment>
}

const useStyles = makeStyles((theme: Theme) => {
    return {
        modifiedAt: {
            color: theme.palette.grey.A700
        }
    }
})
