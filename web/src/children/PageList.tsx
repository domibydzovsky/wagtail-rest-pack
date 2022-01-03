import React from 'react'
import {PageChild} from "./childrenData";
import {Grid} from "@material-ui/core";
import {Item} from "./Item";
import {TagProps} from "../chip/Chip";
import {PageTransition} from "../model/data";


export interface Props {
    className?: string
    children: PageChild[]
    tagProps: TagProps
    openPage: PageTransition
}

export function PageList(props: Props) {
    if (props.children.length === 0) {
        return null
    }
    return <Grid container className={props.className}>
        {props.children.map((child) => {
            return <Grid item key={child.id} xs={12} sm={6} md={6} lg={4}>
                <Item openPage={props.openPage} self={child} tagProps={props.tagProps}/>
            </Grid>
        })}
    </Grid>
}
