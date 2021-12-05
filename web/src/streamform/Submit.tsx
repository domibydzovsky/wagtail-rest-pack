import React from 'react'
import {StreamBlockProps} from "../stream/StreamField";
import {Button, CircularProgress} from "@material-ui/core";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {FormStyle} from "./Handler";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {InputIcon, TextIcon} from "./InputIcon";
import {AddonsDecoratorProps} from "./FormConfig";


export interface Props extends AddonsDecoratorProps {
    text: string,
    icon?: TextIcon,
    iconComp?: any,
    fullWidth?: boolean,
    useOnce?: boolean
}

export function Submit(props: StreamBlockProps<Props>) {
    const context = props.context.formContext
    const data = props.value
    const classes = useStyles()
    const [loading, setLoading] = React.useState(false)
    const [success, setSuccess] = React.useState(false)
    const [disabled, setDisabled] = React.useState(false)
    React.useEffect(() => {
        return context!!.register(data.name, {
            clear: () => { setLoading(false); setSuccess(false) },
            onSubmitStart: () => {
                setDisabled(true)
            },
            onSubmitEnd: (result) => {
                setSuccess(result.success)
                setDisabled(result.success)
                setLoading(false)
            },
            onInteraction: () => {
                if (data.useOnce === false){
                    setSuccess(false)
                    setDisabled(false)
                }
            }
        })
    }, [context])
    const fieldDisabled = !loading && (success || !context!!.formValid || disabled)
    const styles = context!!.handler.style
    return <div className={classes.wrapper}>
        <Button type={"submit"}
                key={data.name}
                fullWidth={data.fullWidth || false}
                color={ styles.color}
                variant={getBtnVariant(styles)}
                onClick={() => {
                    setLoading(true)
                    context && context.submit(data.name)
                }}
                startIcon={success ? <CheckCircleIcon fontSize={"small"}/> : (loading ? <CircularProgress size={"1em"} /> : (data.iconComp ? data.iconComp : <InputIcon type={data.icon || "send"} inputProps={{ fontSize:"small"}}/>)) }
                disabled={fieldDisabled} >
            { data.text }
        </Button>
    </div>
}

function getBtnVariant(styles: FormStyle): "text" | "outlined" | "contained" {
    const variant = styles.variant;
    if (variant === "outlined") {
        return "contained"
    } else if (variant === "filled") {
        return "outlined"
    }
    return "text"
};

const useStyles = makeStyles((theme: Theme)=> {
    return {
        wrapper: {
            margin: theme.spacing(1),
            position: "relative",
            textAlign: "right",
        },
    }
})
