import React from 'react'
import {makeStyles, Theme} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import {Grid} from "@material-ui/core";

export interface PageAuthor {
    username: string
    is_staff: boolean
    is_superuser: boolean
    first_name: string
    last_name: string
    description: string
    long_description: string
    profile?: {
        avatar: string
    }
}

export interface Props {
    author: PageAuthor
    variant: "short" | "long"
    onClick: () => void
}

export function AuthorSummary(props: Props) {
    const classes = useStyles()
    const name = props.author.last_name + " " + props.author.first_name
    return <div className={classes.root}>
        {props.variant === "long" && <h4>Zveřejnil(a):</h4> }
        <Grid container>
            <Grid item className={classes.avatar}>
                <Avatar alt={name} src={props.author?.profile?.avatar || ""} className={classes.large}/>
            </Grid>
            <Grid item justify={"center"} alignItems={"center"} alignContent={"center"}>
                <span className={classes.name} onClick={props.onClick}>{name}</span>
                <span className={classes.desc} >{props.author.description}</span>
            </Grid>
        </Grid>
        {props.variant === "long" && <p>{props.author.long_description}</p> }

    </div>
}

const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {
            padding: theme.spacing(1),
            borderTop: "1px solid " + theme.palette.divider,
            borderBottom: "1px solid " + theme.palette.divider,
        },
        large: {
            width: theme.spacing(7),
            height: theme.spacing(7),
        },
        avatar: {
            alignSelf: "center",
        },
        name: {
            color: theme.palette.primary.main,
            fontSize: "1.2em",
            margin: theme.spacing(1),
            display: "block",
            cursor: "pointer",
        },
        desc: {
            color: theme.palette.grey.A700,
            margin: theme.spacing(1),
            display: "block"
        }
    }
})