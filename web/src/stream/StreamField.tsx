import React, { Component } from 'react';
import {RichTextConfiguration} from "../basestream/richtext/Richtext";
import {FormContext} from "../streamform/Form";
import {FormHandlerFactory} from "../streamform/Handler";
import {PageChild} from "../children/childrenData";
import {TagProps} from "../chip/Chip";
import {PageTransition} from "../model/data";

export interface StreamBlock<V> {
    type: string
    id: string
    value: V
}


export interface NestedData {
    containerized: boolean
    formContext?: FormContext
    rowData?: StreamRow
}

export type StreamRecursiveFunction = (stream: StreamBlock<any>[], data: NestedData) => JSX.Element

export interface StreamBlockProps<V> {
    data?: SpecificData
    config: StreamFieldConfig
    context: StreamContext
    value: V
    recursive: StreamRecursiveFunction
}

export type StreamFieldSerializer = React.ComponentType<StreamBlockProps<any>>

export interface RequiredComponents {
    loginRequired?: React.ComponentType
}

export interface DialogProps<T> {
    title: string
    component: React.ComponentType<T>
    componentProps: T
}

export interface Pagination {
    offset: number
    limit: number
}

export interface StreamActions {
    openSnack: (text: string) => void
    openDialog: (props: DialogProps<any>) => void
    fetchChildren: (pageId: number, pagination: Pagination, params: any, onDone: (result: PageChild[]|undefined) => void) => void
    openPage: PageTransition
}

export interface StreamFieldConfig {
    serializers: Map<string, StreamFieldSerializer>
    richtext?: RichTextConfiguration,
    container: React.ComponentType<{ className?: string }>,
    largeContainer: React.ComponentType<{ className?: string }>,
    formHandlerFactory: FormHandlerFactory,
    components: RequiredComponents,
    actions: StreamActions,
    tagProps: TagProps
}

export interface StreamRow {
    color: "primary" | "secondary" | "white"
    variant: "light" | "dark"
}

export interface StreamContext {
    containerized: boolean
    rowData: StreamRow | undefined
    formContext?: FormContext
    popRowData?: (props: {index: number}) => StreamRow
}

export interface SpecificData {
    children: PageChild[]
    childrenLoading: boolean
}

export interface StreamProps {
    data?: SpecificData
    stream: StreamBlock<any>[]
    config: StreamFieldConfig
    context: StreamContext
}
const rowData: StreamRow[] = [
    {color: "white",variant: "light"},
    {color: "primary",variant: "light"},
    {color: "white",variant: "light"},
    {color: "secondary",variant: "dark"},
    {color: "white",variant: "light"},
    {color: "primary",variant: "dark"},
    {color: "white",variant: "light"},
    {color: "secondary",variant: "light"},
]

export function popRowData(props: {index: number}) {
    return rowData[props.index % rowData.length]
}

export function StreamField(props: StreamProps) {
    const recursive = (nested: StreamBlock<any>[], data: NestedData) => {
        const context: StreamContext = {...props.context}
        context.containerized = props.context.containerized || data.containerized
        if (data.formContext){
            if (context.formContext) {
                throw new Error("Forms cannot be nested.")
            }
            context.formContext = data.formContext
        }
        if (data.rowData) {
            context.rowData = data.rowData;
        }
        return <StreamField stream={nested} context={context} config={props.config}/>
    }
    return <React.Fragment>
        {props.stream.map((block, index) => {
            let rowContext = {...props.context}
            if (!rowContext.popRowData) {
                rowContext.popRowData = popRowData;
            }
            if (!rowContext.rowData) {
                rowContext.rowData = popRowData({index})
            }
            const Component = props.config.serializers.get(block.type)
            if (!Component) {
                return <div><b>{block.type}</b> is not registed.</div>
            }
            return <Component config={props.config}
                              data={props.data}
                              recursive={recursive}
                              key={block.id}
                              context={rowContext}
                              value={block.value}/>
        })
        }
    </React.Fragment>
}
