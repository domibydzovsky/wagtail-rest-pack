import React from 'react'
import {FormAddonProps} from "./data";

function enabled(props: FormAddonProps): boolean {
    const {context}= props
    if (context.form.security == "authenticated_user_only") {
        return false
    }
    if (context.form.security == "allow_any") {
        return false
    }
    return context.interacted;
}

export function RecaptchaAddon(props: FormAddonProps) {
    const context = props.context
    const [token, setToken] = React.useState(undefined as string|undefined)
    const [id, setId] = React.useState(1)
    const config = context.handler.recaptcha
    const Recaptcha = config.Component
    React.useEffect(() => {
        if (enabled(props)) {
            context.setFieldValidity("_recaptcha_field", token !== undefined)
            return context.register("recaptchaddon", {
                collect: dto => config.update(token || "", dto),
                clear: () => {
                    setToken(undefined)
                    setId(id + 1)
                },
                onSubmitEnd: () => {
                    setToken(undefined)
                    setId(id + 1)
                }
            })
        }
        return () => {};
    }, [props, context, token])
    if (!enabled(props)) {
        return null
    }
    return <Recaptcha key={id} onChange={setToken} />
}
