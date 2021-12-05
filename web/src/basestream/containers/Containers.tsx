import React from 'react'
import {StreamBlock, StreamBlockProps} from "../../stream/StreamField";
import {makeStyles} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";
import {ThemeWrapper} from "../theme/ThemeWrapper";

export interface ContainersProps {
    stream: StreamBlock<any>[]
}

export function StreamContainers(props: StreamBlockProps<ContainersProps>) {
    const Container = props.config.container;
    const classes = useStyles()
    return <ThemeWrapper context={props.context}>
        <Container className={classes.root}>
        <Grid container>
            {props.recursive(props.value.stream, {containerized: true})}
        </Grid>
        </Container>
    </ThemeWrapper>
}

const useStyles = makeStyles(() => {
    return {
        root: {
            display: "flex"
        }
    }
})