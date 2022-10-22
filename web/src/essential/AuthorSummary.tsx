import React from 'react'
import {makeStyles, Theme} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import {Grid, Link} from "@material-ui/core";

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
    const onClick = (e: any) => {
      e.preventDefault()
      props.onClick()
    }
    return <div className={classes.root}>
        {props.variant === "long" && <h4>Zveřejnil(a):</h4> }
        <Grid container alignItems={"center"} alignContent={"center"}>
            <Grid item className={classes.avatar}>
                <Avatar alt={name} src={props.author?.profile?.avatar || ""} className={classes.large}/>
            </Grid>
            <Grid item xs md justifyContent={"center"} >
                <Link className={classes.name} onClick={onClick}>{name}</Link>
                <span className={classes.desc} >{props.author.description}</span>
            </Grid>
        </Grid>
        {props.variant === "long" && <p>{props.author.long_description}</p> }

    </div>
}

const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {
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
            margin: theme.spacing(1),
            display: "block",
            cursor: "pointer",
            ...theme.typography.caption
        },
        desc: {
            color: theme.palette.grey.A700,
            margin: theme.spacing(1),
            display: "block",
            ...theme.typography.caption
        }
    }
})
