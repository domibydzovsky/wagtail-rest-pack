import React from 'react'
import {makeStyles} from "@material-ui/core/styles";


export interface Props {
    children: any
    node: HTMLElement
}

export function Blockquote(props: Props) {
    const classes = useStyles()
    return <blockquote className={classes.blockquote}>{props.children}</blockquote>
}


const useStyles = makeStyles(() => {
    return {
        blockquote: {
            clear: "both",
            padding: "10px",
            margin: "0 0 20px",
            fontSize: "1.1em",
            fontFamily: 'Pangolin',
            background: "#f4f4f4",
            borderLeft: "10px solid #ccc",
            "&:before": {
                color: "#ccc",
                // content: "open-quote",
                fontSize: "4em",
                lineHeight: "0.1em",
                marginRight: "0.25em",
                verticalAlign: "-0.4em",
            },
            "& p" : {
                display: "inline",
             }
        },
    }
})