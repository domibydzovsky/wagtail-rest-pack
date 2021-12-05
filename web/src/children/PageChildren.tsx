import React from 'react'
import {PageChild} from "./childrenData";
import {Container} from "@material-ui/core";
import {TagProps} from "../chip/Chip";
import {HideOnPrint} from "../essential/HideOnPrint";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {PageList} from "./PageList";

export interface Props {
    children: PageChild[]
    loading: boolean
    tagProps: TagProps
    title: string,
    containerMaxWidth: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
    openPage: (url: string) => void
}

export function PageChildren(props: Props) {
    // todo loading
    const classes = useStyles()
    if (props.children.length === 0) {
        return null
    }
    // todo translate
    return <HideOnPrint>
        <Container maxWidth={props.containerMaxWidth} className={classes.container}>
            <h4>{props.title} (celkem {props.children.length}):</h4>
            <PageList openPage={props.openPage} children={props.children} tagProps={props.tagProps}  />
        </Container>
    </HideOnPrint>
}

const useStyles = makeStyles((theme: Theme) => {
    return {
        container: {
            padding: theme.spacing(1),
        },
    }
})
