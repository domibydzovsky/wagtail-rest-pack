import React from 'react'
import {makeStyles, Theme} from "@material-ui/core/styles";
import {GetComment} from "./data";

export interface Props {
    comments: GetComment[]
}

export function ListComments(props: Props) {
    const classes = useStyles()

    return <div className={classes.root}>

    </div>
}

const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {

        }
    }
})
