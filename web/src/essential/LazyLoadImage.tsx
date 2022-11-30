import React from 'react'
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import { generateCustomPlaceholderURL } from 'react-placeholder-image';
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";

export interface Props {
    width?: number | string | undefined
    height?: number | string | undefined
    src: string
    alt: string
    className?: string
    zoom?: boolean
    onClick?: () => void
    onLoad?: () => void
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
    return <img className={clsx(classes.print, "lazyload", props.className, {
        [classes.clickable]:props.onClick,
        [classes.zoom]: props.zoom,
    })}
                alt={props.alt}
                onClick={() => { props.onClick && props.onClick()}}
                {...opts}
                onError={(e) => {
                    if (props.width && Number(props.width) && props.height && Number(props.height)) {
                        const target = e.target as HTMLImageElement
                        target.src = generateCustomPlaceholderURL(Number(props.width), Number(props.height))
                    }
                }}
                onLoad={() => {
                    if (props.onLoad) {
                        props.onLoad();
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
        },
        print: {
            '@media print' : {
                maxWidth: "200px !important",
            }
        }
    }
});
