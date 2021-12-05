import React from 'react'
import ReCAPTCHA from "react-google-recaptcha";
import {makeStyles, Theme} from "@material-ui/core/styles";

export interface Props {
    siteKey: string
    onChange: (token: string | undefined) => void
}

export function GoogleRecaptcha(props: Props) {
    const classes = useStyles()
    return <div className={classes.root}>
        <ReCAPTCHA
            sitekey={props.siteKey}
            onChange={(captcha:any) => { props.onChange(captcha || undefined)}}
            onErrored={() => { props.onChange(undefined)}}
            onExpired={() => { props.onChange(undefined)}}
        />
    </div>
}

const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {
            margin: 15
        }
    }
})
