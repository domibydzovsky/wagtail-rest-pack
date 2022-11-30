import React from 'react'
import {PageChild} from "./childrenData";
import {TagProps} from "../chip/Chip";
import {HideOnPrint} from "../essential/HideOnPrint";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {PageList, SortOptions} from "./PageList";
import {PageTransition} from "../model/data";

export interface Props {
    children: PageChild[]
    loading: boolean
    tagProps: TagProps
    sort: SortOptions
    title: string,
    container: React.ComponentType<{ className?: string }>;
    openPage: PageTransition
    renderExtra: (props: {key: string, value: any}) => any
}

export function PageChildren(props: Props) {
    // todo loading
    const classes = useStyles()
    if (props.children.length === 0) {
        return null
    }
    const Container = props.container;
    // todo translate
    return <HideOnPrint>
        <Container className={classes.container}>
            <h4>{props.title} (celkem {props.children.length}):</h4>
            <PageList renderExtra={props.renderExtra}
                      sort={props.sort}
                      openPage={props.openPage}
                      children={props.children}
                      tagProps={props.tagProps}  />
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
