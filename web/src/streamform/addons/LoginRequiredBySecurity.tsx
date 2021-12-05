import React from 'react'
import {FormAddonProps} from "./data";


export function LoginRequiredBySecurity(props: FormAddonProps) {
    const context = props.context
    React.useEffect(() => {
        if (isDisabled(props)) {
            context.setDisabled()
        }
    }, [props.context])
    if (isDisabled(props)) {
        const Component = props.config.components.loginRequired
        if (Component) {
            return <Component/>
        }
    }
    return null
}

function isDisabled(props: FormAddonProps) {
    return props.context.form.security == "authenticated_user_only" && !props.handler.isAuthenticated()
}