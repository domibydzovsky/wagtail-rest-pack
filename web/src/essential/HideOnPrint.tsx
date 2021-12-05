import React from 'react'
import {makeStyles, Theme} from "@material-ui/core/styles";


export interface Props {
    id?: string,
    className?: string,
    children: any
}

export function HideOnPrint(props: Props) {
    const classes = useStyles();
    let clazz = classes.root;
    if (props.className) {
        clazz += " " + props.className;
    }
    if (props.id) {
        return <div id={props.id} className={clazz}>
            { props.children}
        </div>;
    } else {
        return <div className={clazz}>
            { props.children}
        </div>;
    }
}

const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {
            '@media print' : {
                display: 'none',
                padding: 0
            }
        }
    }
})
