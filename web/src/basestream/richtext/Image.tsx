import React from 'react'
import {makeStyles} from "@material-ui/core/styles";
import {LazyImage} from "../../essential/LazyLoadImage";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";



export function Image(props: {node: HTMLElement}) {
    let width: number | undefined | string = Number(props.node.getAttribute("width"))
    let height: number | undefined | string = Number(props.node.getAttribute("height"))
    let src = props.node.getAttribute("src") as string
    let clazz = props.node.getAttribute("class") as string
    let alt = props.node.getAttribute("alt") as string
    let classes = useStyles()
    let className = classes.image
    let center = false;
    let altAsCaption = false;
    let wrapperClazz = "";
    if (clazz) {
        clazz.split(" ").forEach((it) => {
            if (it === "full-width") {
                width = "100%"
                height = "auto"
            }
            if (it === "small" || it === "medium") {
                center = true
            }
            if (it === "caption") {
                center = true
                altAsCaption = true
                width = undefined
                height = undefined
            }
            if (it === "") {
                wrapperClazz += classes.left
            }
            if (classes.hasOwnProperty(it)) {
                // @ts-ignore
                // className += " " + classes[it]
            }
        })
    }

    return <React.Fragment>
        <div className={clsx(wrapperClazz,{[classes.center]: center})}>
            <LazyImage zoom={true} className={className} src={src} width={width} height={height} alt={alt} />
            { altAsCaption && <div className={classes.caption}>
                <Typography variant="caption">{alt}</Typography>
            </div>}
        </div>
    </React.Fragment>
}

const useStyles = makeStyles(() => {
    return {
        "richtext-image": {
            color: 'blue',
        },
        "full-width": {

        },
        image:{
            maxWidth: "100%",
        },
        center: {
            textAlign: "center"
        },
        "small": {
            maxWidth: "100%",
            textAlign: "center",
        },
        "medium": {
            maxWidth: "100%",
            textAlign: "center",
        },
        caption: {
            margin: "auto",
            textAlign: "center"
        },
        "right": {
            margin: 10,
            maxWidth: "100%",
            float: "right"
        },
        "left": {
            maxWidth: "100%",
            margin: 10,
            float: "left"
        }
    }
})
