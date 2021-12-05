import {StreamBlockProps, StreamFieldSerializer} from "../stream/StreamField";
import {Form} from "./Form";
import {Group} from "./Group";
import {Text} from "./Text";
import {Submit} from "./Submit";
import {FormSnack} from "./FormSnack";
import {StreamDialog} from "./StreamDialog";
import {AddonsByPlacement} from "./AddonsByPlacements";
import React, { Fragment, Component } from 'react';
import {FormAddonProps} from "./addons/data";

export function addFormStreamFieldSerializers(out: Map<string, StreamFieldSerializer>) {
    out.set("form", Form)
    out.set("form_open_snack", FormSnack)
    out.set("form_open_dialog", StreamDialog)
    out.set("form_group", AddonsDecorator(Group))
    out.set("form_text", AddonsDecorator(Text))
    out.set("form_submit", AddonsDecorator(Submit))
}

export interface AddonsDecoratorProps {
    name: string
}

function AddonsDecorator(Component: StreamFieldSerializer) {
    return function NestedDecorator(props: StreamBlockProps<AddonsDecoratorProps>) {
        const handler = props.context.formContext!!.handler
        const addonProps: FormAddonProps = {
            handler: handler,
            context: props.context.formContext!!,
            config: props.config
        }
        return <React.Fragment>
            <AddonsByPlacement placement={"before-" + props.value.name} addons={handler.addons} props={addonProps}/>
            <Component {...props}/>
            <AddonsByPlacement placement={"after-" + props.value.name} addons={handler.addons} props={addonProps}/>
        </React.Fragment>
    }
}
