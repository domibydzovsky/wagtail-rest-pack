import React from 'react'
import {makeStyles, Theme} from "@material-ui/core/styles";
import {PageChild} from "../children/childrenData";
import {StreamBlock, StreamContext, StreamFieldConfig, StreamRecursiveFunction} from "../stream/StreamField";
import {PageTitle} from "./PageTitle";
import {ThemeWrapper} from "../basestream/theme/ThemeWrapper";

export interface ExtraPageChild extends PageChild {
    extra: {
        stream: StreamBlock<any>[]
    }
}

export interface Props {
    children: ExtraPageChild[]
    config: StreamFieldConfig
    context: StreamContext
    loading: boolean
    recursive: StreamRecursiveFunction
}

export function NestedPagesView(props: Props) {
    const classes = useStyles()
    return <div className={classes.root}>
        { props.children.map((child,index) => {
            const context: StreamContext = {
                containerized: true,
                // @ts-ignore
                rowData: props.context.popRowData({index}),
                popRowData: props.context.popRowData
            }
            const Container = props.config.container;
            return <ThemeWrapper context={context}>
                    <div key={child.id}>
                    <Container><PageTitle title={child.banner.title}
                                          bottomBorder={false}
                               variant="h2"
                                          // last_published_at={child.last_published_at}
                    />
                        {props.recursive(child.extra.stream, {containerized: true, rowData: context.rowData})}
                    </Container>
                </div>
            </ThemeWrapper>
        })}
    </div>
}

const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {

        }
    }
})
