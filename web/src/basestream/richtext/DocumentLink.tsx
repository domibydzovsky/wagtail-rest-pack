import React from 'react'
import GetAppIcon from '@material-ui/icons/GetApp';
import {Tooltip} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";


export function DocumentLink(props: {href: string, children: any}) {
    // todo change color according to background
    const classes = useStyles()
    const splitted = props.href.split("/");
    const filename = splitted[splitted.length-1];
    return <Tooltip title={"Stáhnout dokument: " + filename}>
        <a href={props.href} download={filename} className={classes.root} onClick={(e)=>{
            e.preventDefault();
            window.open(props.href, "_blank");
        }}>
            <GetAppIcon className={classes.icon} />
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
});