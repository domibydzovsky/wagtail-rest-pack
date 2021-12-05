import React from 'react'
import {StreamBlock, StreamBlockProps} from "../../stream/StreamField";
import {Grid} from "@material-ui/core";
import {ThemeWrapper} from "../theme/ThemeWrapper";


export interface ContainerProps {
    stream: StreamBlock<any>[]
}

export function StreamContainer(props: StreamBlockProps<ContainerProps>) {
    const Container = props.config.container;
    // todo add color
    if (props.context.containerized) {
        return <Grid item xs={12} sm={6} md>
            {props.recursive(props.value.stream, {containerized: false})}
        </Grid>
    }
    return <ThemeWrapper context={props.context}>
        <Container>
            {props.recursive(props.value.stream, {containerized: true})}
        </Container>
    </ThemeWrapper>
}