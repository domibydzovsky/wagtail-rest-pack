import React from 'react'
import {PageChild} from "./childrenData";
import {Grid} from "@material-ui/core";
import {Item} from "./Item";
import {TagProps} from "../chip/Chip";
import {PageTransition} from "../model/data";
import {Sorting, SortingProps, useSorting} from "./Sorting";


export interface SortField {
    field: string,
    isDefault?: boolean
    nameDown: string,
    nameUp: string,
    icon: React.ReactNode,
    active: (children: PageChild[]) => boolean
    sort: (a: PageChild, b: PageChild) => number
}

export interface SortOptions {
    fields: SortField[]
    enabled: boolean
}


export interface PageListProps {
    className?: string
    children: PageChild[]
    tagProps: TagProps
    openPage: PageTransition
    renderExtra: (props: {key: string, value: any}) => any
    sort: SortOptions
}

export function PageList(props: PageListProps) {
    if (props.children.length === 0) {
        return null
    }
    const sortingProps: SortingProps = {
        sort: props.sort,
        pages: props.children
    }
    const sorting = useSorting(sortingProps)
    return <Grid container className={props.className}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
            <Sorting {...sorting}/>
        </Grid>
        {sorting.pages.map((child) => {
            return <Grid item key={child.id} xs={12} sm={6} md={6} lg={4}>
                <Item renderExtra={props.renderExtra} openPage={props.openPage} self={child} tagProps={props.tagProps}/>
            </Grid>
        })}
    </Grid>
}
