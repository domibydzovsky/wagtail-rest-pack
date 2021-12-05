import React from 'react'
import {makeStyles, Theme} from "@material-ui/core/styles";
import {Button, CircularProgress} from "@material-ui/core";

export interface Props {
    loading: boolean
    onClick: () => void
}

export function LoadNextButton(props: Props) {
    const classes = useStyles()
    // todo translate
    const text = props.loading ? "Loading.." : "Load next"

    return <div className={classes.root}>
        {props.loading && <CircularProgress className={classes.item}/>}
        <Button variant="outlined" className={classes.item} onClick={props.onClick} color="primary">{text}</Button>
    </div>
}

const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {
            borderTop: "1px solid " + theme.palette.divider,
            textAlign: "center"
        },
        item: {
            padding: theme.spacing(1),
            marginTop: theme.spacing(1.5),
            marginBottom: theme.spacing(1.5),
            display: "block",
            margin: "auto",
        }
    }
})