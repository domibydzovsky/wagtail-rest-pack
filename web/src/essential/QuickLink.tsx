import React from 'react'
import {makeStyles, Theme} from "@material-ui/core/styles";
import {Tooltip} from "@material-ui/core";
import clsx from "clsx";

export interface Props {
    onClick: () => void
    url: string;
    children: any
    key?: string | number
    className?: string;
    underline?: boolean;
    id?: string;
    color?: string,
    tooltip?: string,
    inline?: boolean,
    textAlign?: "left" | "center" |"right"
}

export function QuickLink(data: Props) {
    const classes = useStyles()
    const props: { key?: string, className: string, id?: string, color?: string, style?: any } = {className: classes.link};
    if (data.key) {
        props.key = data.key + "";
    }
    props.className = clsx(props.className,data.className)
    if (!data.underline) {
        props.className = props.className + " " + classes.underline;
    }
    if (data.color) {
        props.color = data.color;
    }
    if (data.id) {
        props.id = data.id;
    }
    if (data.textAlign !== "left") {
        props.style = {
            textAlign: data.textAlign
        }
    }
    if (data.inline) {
        props.style= {
            display: "inline-block"
        }
    }
    const el = <a href={data.url} {...props} onClick={(e) => {e.preventDefault(); data.onClick()}}>{data.children}</a>
    if (data.tooltip) {
        return <Tooltip title={data.tooltip}>{el}</Tooltip>
    } else {
        return el
    }
}

const useStyles = makeStyles((theme: Theme) => {
    return {
        link: {
            cursor: "pointer",
            "&:hover": {
                opacity: 0.9
            },
            display: "flex",
            alignItems: "center",
            margin: 5
        },
        underline: {
            textDecoration: "underline"
        },
    }
})