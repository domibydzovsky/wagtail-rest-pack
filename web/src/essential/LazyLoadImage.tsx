import React from 'react'
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import { generateCustomPlaceholderURL } from 'react-placeholder-image';
import {makeStyles} from "@material-ui/core/styles";

export interface Props {
    width?: number | string
    height?: number | string
    src: string
    alt: string
    className?: string
    zoom?: boolean
    onClick?: () => void
}

export function LazyImage(props: Props) {
    const opts: object = {}
    if (props.width) {
        opts["width"] = props.width;
    }
    if (props.height) {
        opts["height"] = props.height;
    }
    const classes = useStyles();
    let clazz = props.className + " lazyload";
    if (props.zoom === true) {
        clazz += " " + classes.zoom;
    }
    if (props.onClick) {
        clazz += " " + classes.clickable;
    }
    return <img className={clazz}
                alt={props.alt}
                onClick={() => { props.onClick && props.onClick()}}
                {...opts}
                onError={(e) => {
                    if (props.width && Number(props.width) && props.height && Number(props.height)) {
                        const target = e.target as HTMLImageElement
                        target.src = generateCustomPlaceholderURL(Number(props.width), Number(props.height))
                    }
                }}
                data-src={props.src} />
}

const useStyles = makeStyles((theme) => {
    return {
        zoom: {
            transition: "transform .2s",
            "&:hover" : {
                transform: "scale(1.03)"
            }
        },
        clickable: {
            cursor: "pointer",
            "&:hover": {
                opacity: 0.8
            }
        }
    }
});
