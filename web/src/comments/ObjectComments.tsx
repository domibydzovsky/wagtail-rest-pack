import React from 'react'
import {makeStyles, Theme} from "@material-ui/core/styles";
import {Pagination} from "../stream/StreamField";
import {FormBuilder} from "../streamform/builder/FormBuilder";
import {createNewCommentForm} from "./NewCommentForm";
import {LoadNextButton} from "../essential/LoadNextButton";
import {CreateComment, DeleteComment, GetComment, UpdateComment} from "./data";
import {CommentLine} from "./CommentLine";
import {HideOnPrint} from "../essential/HideOnPrint";
import {User} from "../essential/user";


export interface CommentProps {
    list: (pagination: Pagination, result: (comments: undefined | GetComment[]) => void) => void
    update: (update: UpdateComment, done: (result: boolean) => void) => void
    create: (create: CreateComment, done: (result: boolean) => void) => void
    delete: (comment: DeleteComment, done: (result: boolean ) => void) => void
    openStaffUser: (username: string) => void
    interpreter: React.ComponentType<{ builder: FormBuilder, containerize?: boolean }>
    user: User | undefined
}

export function ObjectComments(props: CommentProps) {
    const classes = useStyles()
    const step = 20
    const initial: Pagination = {
        offset: 0,
        limit: step
    }
    const [pagination, setPagination] = React.useState(initial)
    const [comments, setComments] = React.useState(undefined as GetComment[] | undefined)
    const [hasNext, setHasNext] = React.useState(true)
    const [loading, setLoading] = React.useState(false)
    React.useEffect(() => {
        setLoading(true)
        props.list(pagination, (newComments: undefined | GetComment[]) => {
            setLoading(false)
            if (newComments && newComments.length < step) {
                setHasNext(false)
            }
            setComments(newComments?.concat(comments || []))
        })
    }, [pagination])
    const loadNext = () => {
        setPagination({
            offset: pagination.offset + step,
            limit: step
        })
    }
    const clear = () => {
        setComments([])
        setLoading(true)
        setTimeout(() => {
            setPagination(initial)
        }, 500)
    }
    const Interpreter = props?.interpreter
    const newComment = createNewCommentForm({
        create: (newComment: {
            comment: {body: string},
            done: (result: boolean) => void
        }) => {
            props.create(newComment.comment, (result) => {
                clear()
                newComment.done(result)
            })
        }
    })
    if (!Interpreter || !props) {
        // todo loading? skeleton?
        return null
    }

    let commentProps: CommentProps = {...props,
        create: (comment,done: (result: boolean) => void) => {
            props.create(comment, (result) => {
                if (result) clear()
                done(result)
            })
        },
        delete: (comment, done) => {
            props.delete(comment, (result) => {
                done(result)
                if (result) clear()
            })
        }
    }
    // inspiration https://www.cnews.cz/galerie/oldcnews/clanky/cnews/2013/03brezen/facebook-zlepsuje-komentare.-pribyly-odpovedi-ve-stromove-strukture/facebook-thread-1.png
    // http://www.portiscio.net/wp-content/uploads/2013/03/facebook-stranky-odpovedi-na-komentare.png
    return <HideOnPrint className={classes.root}>
        <h3>Komentáře</h3>
        {hasNext && <LoadNextButton onClick={loadNext} loading={loading}/>}
        {comments && comments.map(it => {
            return <CommentLine comment={it} props={commentProps} key={it.id!!} canSubreply={true}/>
        })}
        <Interpreter builder={newComment} containerize={false}/>
    </HideOnPrint>
}

const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {}
    }
})
