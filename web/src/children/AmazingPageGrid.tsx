import React from 'react'
import {PageChild} from "./childrenData";
import {StreamFieldConfig} from "../stream/StreamField";
import {OtherNew} from "./news/OtherNew";
import {makeStyles} from "@material-ui/core/styles";

export interface Props {
    children: PageChild[]
    config: StreamFieldConfig
    loading: boolean
}

export function AmazingPageGrid(props: Props) {
    const config = props.config
    const classes = useStyles();
    let firstRow: PageChild|undefined = props.children[0]
    let secondRow: (PageChild|undefined)[] = [undefined, undefined, undefined]
    if (props.children.length >= 2) {
        secondRow = props.children.slice(1, props.children.length)
    }
    const Container = props.config.container;
    return <Container>
        <div className={classes.root}>
                <OtherNew loading={props.loading} config={config} page={firstRow}/>
                { secondRow.map((row, index) => {
                    return <OtherNew key={row?.id || "x"+index} loading={props.loading} config={config} page={row}/>
                }) }
        </div>
    </Container>
}

const useStyles = makeStyles(theme => {
    return {
        root: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1)
        }
    }
})