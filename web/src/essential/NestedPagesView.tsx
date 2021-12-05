import React from 'react'
import {makeStyles, Theme} from "@material-ui/core/styles";
import {PageChild} from "../children/childrenData";
import {StreamBlock, StreamFieldConfig, StreamRecursiveFunction} from "../stream/StreamField";
import {PageTitle} from "./PageTitle";

export interface ExtraPageChild extends PageChild {
    extra: {
        stream: StreamBlock<any>[]
    }
}

export interface Props {
    children: ExtraPageChild[]
    config: StreamFieldConfig
    loading: boolean
    recursive: StreamRecursiveFunction
}

export function NestedPagesView(props: Props) {
    const classes = useStyles()
    return <div className={classes.root}>
        { props.children.map(child => {
            return <div key={child.id}>
                <PageTitle title={child.banner.title}
                           variant="h2"
                           last_published_at={child.last_published_at} />
                {props.recursive(child.extra.stream, {containerized: false})}
            </div>
        })}
    </div>
}

const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {

        }
    }
})
