import React, { Fragment, Component } from 'react';
import {Pagination, StreamBlockProps} from "../../stream/StreamField";
import {PageChild} from "../../children/childrenData";
import {PageList} from "../../children/PageList";
import {AmazingPageGrid} from "../../children/AmazingPageGrid";
import {LoadNextButton} from "../../essential/LoadNextButton";
import {ExtraPageChild, NestedPagesView} from "../../essential/NestedPagesView";

export type PageListVariant = "simple" | "amazing" | "nested"

export interface Props {
    variant: PageListVariant
    children_of: number,
}

export function PageListBlock(props: StreamBlockProps<Props>) {
    const data = props.value
    const step = 20
    const [children, setChildren] = React.useState(undefined as undefined | PageChild[])
    const [loading, setLoading ] = React.useState(false)
    const [hasNext, setHasNext] = React.useState(true)
    const [pagination, setPagination] = React.useState({
        offset: 0,
        limit: step,
    } as Pagination)
    const loadNext = () => {
        setPagination({
            limit: step,
            offset: pagination.offset + step
        })
    }
    React.useEffect(() => {
        setLoading(true)
        const params: any = {}
        if (props.value.variant === "nested"){
            params["child_extra"] = "stream"
        }
        props.config.actions.fetchChildren(data.children_of, pagination, params, (result: PageChild[]|undefined) => {
            setLoading(false)
            if (result && result.length > 0) {
                if (result.length < step) {
                    setHasNext(false)
                }
                if (children && children?.length > 0) {
                    setChildren(children.concat(result))
                } else {
                    setChildren(result)
                }
            } else if (result && result.length === 0) {
                setHasNext(false)
            } else{
                setChildren([])
            }
        })
    }, [data.children_of, pagination])

    const result = <React.Fragment>
        {data.variant === "simple" && <PageList openPage={props.config.actions.openPage} tagProps={props.config.tagProps} children={children || []}/>}
        {data.variant === "amazing" && <AmazingPageGrid loading={children === undefined} config={props.config} children={children || []} />}
        {data.variant === "nested" && <NestedPagesView context={props.context} loading={children === undefined} config={props.config} recursive={props.recursive} children={(children || []) as ExtraPageChild[]} />}
        { hasNext && <LoadNextButton loading={loading} onClick={loadNext} />}
    </React.Fragment>
    const Container = props.config.largeContainer
    if (!props.context.containerized && data.variant !== "nested") {
        return <Container>
            {result}
        </Container>
    } else {
        return result
    }
}
