import React from 'react'
import {NestedData, StreamBlock, StreamBlockProps} from "../stream/StreamField";
import {FieldVisibility, FormHandler, FormSecurity, PostFormDto, RequestFormHandler} from "./Handler";
import {Collector, SubmitResult} from "./Collector";
import {FormAddonProps} from "./addons/data";
import {AddonsByPlacement} from "./AddonsByPlacements";
import {FormEvent} from "react";

export interface FormContext {
    form: Props,
    handler: FormHandler,
    register: (name: string, collector: Collector) => (() => void)
    focused: boolean
    disabled: boolean
    setDisabled: () => void
    setFocused: () => void
    interacted: boolean
    setInteracted: () => void
    formValid: boolean,
    handleFieldError: (field: string, value: string) => boolean,
    setFieldValidity: (field: string, fieldValid: boolean) => void
    isVisible: (visibility: FieldVisibility) => boolean
    clear: () => void
    submit: (actionName: string) => void
}

export interface Props {
    name: string,
    display_name: string,
    description: string,
    security: FormSecurity,
    stream: StreamBlock<any>[]
}

interface PrivateFormContext {
    validityMap: Map<string, boolean>
    collectors: Map<string, Collector>
}

const onErrorReceiveDisableUntilInteractKey = "onErrorReceiveDisableUntilInteractKey"

export function Form(props: StreamBlockProps<Props>) {
    const Container = props.config.container
    const request: RequestFormHandler = {
        props: props.value
    }
    const handler = props.config.formHandlerFactory(request)
    const [focused, setFocused] = React.useState(false)
    const [disabled, setDisabled] = React.useState(false)
    const [interacted, setInteracted] = React.useState(false)
    const [formValid, setFormValid] = React.useState(true)
    const [response, setResponse] = React.useState([] as StreamBlock<any>[])

    const context: FormContext & PrivateFormContext = {
        form: props.value,
        validityMap: new Map<string, boolean>(),
        collectors: new Map(),
        handler: handler,
        register: (name, collector) => {
            context.collectors.set(name, collector);
            return () => {
                context.collectors.delete(name)
            }
        },
        handleFieldError: (field: string, value: string) => {
            let collector = context.collectors.get(field)
            if (collector !== undefined) {
                collector.setError && collector.setError(value)
                return true
            }
            return false
        },
        focused: focused,
        disabled: disabled,
        interacted: interacted,
        formValid: formValid,
        setFieldValidity: (field, fieldValid) => {
            context.validityMap.set(field, fieldValid)
            let valid = true
            context.validityMap.forEach((value) => {
                valid = value && valid
            })
            setFormValid(valid)
        },
        setFocused: () => setFocused(true),
        setDisabled: () => setDisabled(true),
        setInteracted: () => {
            context.setFieldValidity(onErrorReceiveDisableUntilInteractKey, true)
            context.collectors.forEach((collector) => {
                collector.onInteraction && collector.onInteraction()
            })
            setInteracted(true)
        },
        isVisible: (visibility) => {
            if (visibility == "anonymous_user_only") {
                return !context.handler.isAuthenticated()
            }
            return true
        },
        clear: () => {
            setInteracted(false)
            setFocused(false)
            setResponse([])
            context.collectors.forEach(it => {
                it.clear && it.clear()
            })
        },
        submit: (actionName => {
            const result: PostFormDto = {
                data: {},
                name: props.value.name,
                action: actionName
            }
            context.collectors.forEach((collector) => {
                collector.collect && collector.collect(result)
            })
            context.collectors.forEach((collector) => {
                collector.onSubmitStart && collector.onSubmitStart()
            })
            const doneCallback = (result: SubmitResult) => {
                context.collectors.forEach((collector) => {
                    collector.onSubmitEnd && collector.onSubmitEnd(result)
                })
                if (!result.success) {
                    context.setFieldValidity(onErrorReceiveDisableUntilInteractKey, false)
                }
                setResponse(result.stream || [])
            }
            context.handler.submit({
                dto: result,
                done: doneCallback,
                context: context
            })
        })
    }
    const data: NestedData = {
        containerized: !props.context.containerized,
        formContext: context
    }
    const doAction = (event: FormEvent) => {
        event.preventDefault();
    }
    const addonProps: FormAddonProps = {
        handler: handler,
        context: context,
        config: props.config
    }
    const form = <React.Fragment>
        {props.value.display_name && <h2>{props.value.display_name}</h2>}
        {props.value.description && <p>{props.value.description}</p>}
        <AddonsByPlacement placement={"title"} addons={handler.addons} props={addonProps}/>
        <form onSubmit={doAction}>
            {props.recursive(props.value.stream, data)}
            <AddonsByPlacement placement={"response"} addons={handler.addons} props={addonProps}/>
            {response && props.recursive(response, data)}
        </form>
        <AddonsByPlacement placement={"submit"} addons={handler.addons} props={addonProps}/>
    </React.Fragment>
    if (props.context.containerized) {
        return form
    } else {
        return <Container>
            {form}
        </Container>
    }
}
