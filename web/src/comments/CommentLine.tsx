import React, { Fragment, Component } from 'react';
import {makeStyles, Theme} from "@material-ui/core/styles";
import {GetComment} from "./data";
import {CommentProps} from "./ObjectComments";
import Avatar from "@material-ui/core/Avatar";
import {Grid} from "@material-ui/core";
import {toDateStr} from "../utils/date";
import {createNewCommentForm} from "./NewCommentForm";
import clsx from "clsx";
import Chip from "@material-ui/core/Chip";
import {RichText} from "../basestream/richtext/Richtext";

export interface Props {
    comment: GetComment
    props: CommentProps
    canSubreply: boolean
}

export function CommentLine(props: Props) {
    const classes = useStyles()
    const author = props.comment.author
    let authorName = "Anonymní" // todo translate
    if (author) {
        authorName = author.first_name + " " + author.last_name
    }
    const Interpreter = props.props.interpreter
    const newComment = createNewCommentForm({
        create: (newComment: {
            body: string,
            done: (result: boolean) => void
        }) => {
            props.props.create({
                body: newComment.body,
                parent_id: props.comment.id
            }, newComment.done)
        }
    })
    const hasChildren = props.comment.children && props.comment.children.length > 0
    const [replyShown, setReplyShown ] = React.useState(hasChildren)
    const canDelete = props.props.user?.is_superuser || props.props.user?.is_staff
        || (props.props.user?.username === props.comment.author?.username && props.props.user?.username !== undefined)
    return <div className={classes.root}>
        <Grid container direction={"row"}>
            <Grid item className={classes.avatar}>
                <Avatar src={author?.profile?.avatar || ""} variant={"square"} className={clsx({
                    [classes.avatarSmall]: !props.canSubreply,
                    [classes.avatarBig]: props.canSubreply,
                })}>
                    {author?.last_name || authorName}
                </Avatar>
            </Grid>
            <Grid xs container item direction={"column"}>
                <Grid item className={classes.text}>
                    <span className={clsx(classes.authorName, {[classes.staff]: (author?.is_staff || false)})} onClick={() => {
                        (author?.is_staff || false) && props.props.openStaffUser(author!!.username)
                    }}>
                        {authorName}
                        { (author?.is_superuser || false) && <Chip className={classes.text} size="small" label={"Administrátor"}/>}
                        { (!author?.is_superuser) && (author?.is_staff || false) && <Chip className={classes.text} size="small" label={"Správce"}/>}
                    </span>
                    <RichText text={props.comment.body} conf={{
                        allowList: ["b", "br", "i"],
                    }}/>
                </Grid>
                <Grid item className={clsx(classes.actions, classes.border)}>
                    {/*{props.canSubreply && !replyShown && <><span onClick={() => {*/}
                    {/*    setReplyShown(true)*/}
                    {/*}} className={classes.reply}>Odpovědět</span>*/}
                    {/*    <span>•</span></>}*/}
                    {canDelete && <React.Fragment>
                        <span className={classes.reply} onClick={() => {
                            props.props.delete(props.comment.id!!, () => {})
                        }}>Smazat</span>
                    </React.Fragment>}
                    <span>{toDateStr(props.comment.created_on)}</span>
                </Grid>
                {/*{props.comment.children && props.comment.children.map(child => {*/}
                {/*    return <CommentLine canSubreply={false} comment={child} props={props.props} key={child.id}/>*/}
                {/*})}*/}
                {/*{props.canSubreply && replyShown && <Interpreter builder={newComment} containerize={false} />}*/}
            </Grid>
        </Grid>

    </div>
}

const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {
            margin: theme.spacing(0.5),
            [theme.breakpoints.down("sm")]: {
                margin: theme.spacing(0.3)
            }
        },
        avatar: {
            margin: theme.spacing(0.2),
            padding: theme.spacing(0.5)
        },
        text: {
            margin: theme.spacing(0.5)
        },
        authorName: {
            color: theme.palette.secondary.main,
            padding: theme.spacing(0.5)
        },
        actions: {
            color: theme.palette.grey.A700,
            padding: theme.spacing(0.5),
            fontSize: "0.9em"
        },
        border: {
            borderBottom: "1px solid " +theme.palette.divider
        },
        reply: {
            cursor: "pointer",
            margin: theme.spacing(0.5),
            "&:hover": {
                textDecoration: "underline"
            }
        },
        staff: {
            cursor: "pointer",
        },
        avatarBig: {
            width: theme.spacing(6),
            height: theme.spacing(6),
        },
        avatarSmall: {
            width: theme.spacing(4),
            height: theme.spacing(4),
        }
    }
})
