import React from 'react'
import {PageChild} from "./childrenData";
import {Grid} from "@material-ui/core";
import {DominantPageChildView} from "./DominantPageChildView";
import {StreamFieldConfig} from "../stream/StreamField";
import {TripplePageChildView} from "./TripplePageChildView";
import {TightRowPageChildView} from "./TightRowPageChildView";

export interface Props {
    children: PageChild[]
    config: StreamFieldConfig
    loading: boolean
}

export function AmazingPageGrid(props: Props) {
    const config = props.config
    let firstRow: PageChild|undefined = props.children[0]
    let secondRow: (PageChild)[] = []
    let rest : (undefined | PageChild)[] = []
    if (props.loading) {
        rest = [undefined, undefined]
    }
    if (props.children.length >= 2) {
        secondRow = props.children.slice(1, 4)
    }
    if (props.children.length >= 4) {
        rest = props.children.slice(4, props.children.length)
    }
    // todo add Paper component on mobile to improve readability
    return <Grid container>
            <DominantPageChildView loading={props.loading} config={config} page={firstRow} />
            <TripplePageChildView loading={props.loading} config={config} pages={secondRow} />
            {
              rest.map((page: PageChild | undefined, indx: number) => {
                return <TightRowPageChildView loading={props.loading} key={page?.id|| indx} page={page } config={config} />
            })
            }
    </Grid>
}
