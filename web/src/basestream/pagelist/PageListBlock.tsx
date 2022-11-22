import React, { Fragment, Component } from 'react';
import {Pagination, StreamBlockProps, StreamFieldSerializer} from "../../stream/StreamField";
import {PageChild} from "../../children/childrenData";
import {PageList, SortField, SortOptions} from "../../children/PageList";
import {AmazingPageGrid} from "../../children/AmazingPageGrid";
import {LoadNextButton} from "../../essential/LoadNextButton";
import {ExtraPageChild, NestedPagesView} from "../../essential/NestedPagesView";
import {HideOnPrint} from "../../essential/HideOnPrint";
import {PageChildren} from "../../children/PageChildren";
import HearingIcon from '@material-ui/icons/Hearing';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

export type PageListVariant = "simple" | "amazing" | "nested" | "children"

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
    const renderExtra: (props: {key: string, value: any}) => any = (extraProps) => {
        const serializerName = 'extra-' + extraProps.key;
        const ExtraSerializer: StreamFieldSerializer | undefined = props.config.serializers.get(serializerName);
        if (!ExtraSerializer) {
            return null;
        }
        const value: any = {};
        value[extraProps.key] = extraProps.value;
        return <ExtraSerializer {...props} value={value} />
    }

    const pageDateSortField: SortField = {
        field: "date",
        icon: <AccessTimeIcon/>,
        isDefault: true,
        nameUp: "Nejnovější",
        nameDown: "Nejstarší",
        active: (children: PageChild[]) => true,
        sort: (a: PageChild, b: PageChild) => {
            return Date.parse(a.last_published_at) - Date.parse(b.last_published_at);
        }
    };

    const hearingSortField: SortField = {
        field: "hear",
        icon: <HearingIcon/>,
        nameUp: "Nejsnažší",
        nameDown: "Nejnáročnější",
        active: (children: PageChild[]) => children.every((child) => Boolean(child.extra && child.extra['extra-difficulty'])),
        sort: (a: PageChild, b: PageChild) => {
            return (a.extra && b.extra ) ? (Number(a.extra['difficulty']) - Number(b.extra['difficulty'])) : 0;
        }
    };
    const sortOptions : SortOptions = {
        enabled: true,
        fields: [
            hearingSortField, pageDateSortField
        ]
    }
    const result = <React.Fragment>
        {data.variant === "simple" && <PageList sort={sortOptions} renderExtra={renderExtra} openPage={props.config.actions.openPage} tagProps={props.config.tagProps} children={children || []}/>}
        {data.variant === "amazing" && <AmazingPageGrid loading={children === undefined} config={props.config} children={children || []} />}
        {data.variant === "nested" && <NestedPagesView context={props.context} loading={children === undefined} config={props.config} recursive={props.recursive} children={(children || []) as ExtraPageChild[]} />}
        {data.variant === "children" && <React.Fragment>
            <HideOnPrint>
                <PageChildren tagProps={props.config.tagProps}
                              container={props.config.largeContainer}
                              openPage={props.config.actions.openPage}
                              renderExtra={renderExtra}
                              sort={sortOptions}
                              title={"Podřazené stránky"}
                              loading={props.data ? props.data.childrenLoading : false}
                              children={props.data ? props.data.children : []}/>
            </HideOnPrint>
        </React.Fragment>}
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
