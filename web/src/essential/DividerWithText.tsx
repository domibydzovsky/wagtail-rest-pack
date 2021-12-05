import React from "react";
import {makeStyles} from "@material-ui/core";

export function DividerWithText (props: { children: any }) {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <div className={classes.border} />
            <span className={classes.content}>{props.children}</span>
            <div className={classes.border} />
        </div>
    );
};

const useStyles = makeStyles(theme => ({
    container: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(1)
    },
    border: {
        borderBottom: "1px solid " + theme.palette.divider,
        width: "100%"
    },
    content: {
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(0.5),
        paddingRight: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        color: "lightgrey"
    }
}));
