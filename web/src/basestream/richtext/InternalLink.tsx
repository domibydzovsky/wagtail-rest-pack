import React from 'react'

import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import {Tooltip} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {PageTransition} from "../../model/data";

export function InternalLink(props: {href: string, children: any, onOpen: PageTransition}) {
    // todo change color according to background
    const classes =useStyles()
    return <Tooltip title={"Přejít na: " + props.children}>
        <a href={props.href} className={classes.root} onClick={(e)=>{
            e.preventDefault();
            props.onOpen.openPage({url: props.href, title: props.children})
        }}>
            <OpenInBrowserIcon className={classes.icon} />
            {props.children}
        </a>
    </Tooltip>
}
const useStyles = makeStyles(() => {
    return {
        root: {
            cursor: "pointer",
            marginRight: 3,
            marginLeft: 3
        },
        icon: {
            verticalAlign: "sub"
        }
    }
})
