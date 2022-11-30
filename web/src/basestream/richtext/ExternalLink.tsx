import React from 'react'

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {Tooltip} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";


export function ExternalLink(props: {href: string, children: any, icon?: any}) {
    // todo change color according to background
    const classes =useStyles()
    let Icon = ExitToAppIcon;
    if (props.icon) {
        Icon = props.icon;
    }
    return <Tooltip title={"Odejít na: " + props.children}>
        <a href={props.href} className={classes.root} onClick={(e)=>{
            e.preventDefault();
            window.open(props.href, "_blank");
        }}>
            <Icon className={classes.icon} />
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