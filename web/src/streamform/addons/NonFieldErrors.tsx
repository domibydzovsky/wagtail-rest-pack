import React from 'react'
import {FormAddonProps} from "./data";
import {SubmitResult} from "../Collector";
import {makeStyles, Theme} from "@material-ui/core/styles";

export function NonFieldErrors(props: FormAddonProps) {
    const context = props.context
    const [message, setMessage] = React.useState(undefined as string|undefined)
    const [code, setCode] = React.useState(undefined as number|undefined)
    const classes = useStyles()
    React.useEffect(() => {
        return context.register("nonfielderrors",{
            onInteraction: () => {
                setMessage(undefined)
                setCode(undefined)
            },
            onSubmitEnd: (result: SubmitResult) => {
                if (!result.success) {
                    const message = result.error?.message
                    setCode(result.error?.code)
                    if (!message) {

                    } else if (typeof message === "string") {
                        setMessage(message)
                    } else if (typeof message.message === "string") {
                        setMessage(message.message)
                    } else if (typeof message.detail === "string") {
                        setMessage(message.detail)
                    } else if (Array.isArray(message.non_field_errors)){
                        setMessage(message.non_field_errors.join(", "))
                    } else if (typeof message === "object") {
                        let anyMatched = false
                        for (const [key, value] of Object.entries(message)) {
                            if (typeof value === "string") {
                                anyMatched = context.handleFieldError(key, value) || anyMatched
                            } else if (Array.isArray(value)) {
                                anyMatched = context.handleFieldError(key, value.join(" ")) || anyMatched
                            }
                        }
                        if (!anyMatched) {
                            setMessage(JSON.stringify(result.error?.message))
                        }
                    } else {
                        setMessage(JSON.stringify(result.error?.message))
                    }
                }
            }
        })
    }, [context])
    if (!message) {
        return null
    }
    return <div className={classes.root}>
        Chyba {code}: {message}
    </div>
}

const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {
            color: theme.palette.warning.main
        }
    }
})