import React from 'react'
import {makeStyles} from "@material-ui/core/styles";
import {LazyImage} from "../../essential/LazyLoadImage";



export function Image(props: {node: HTMLElement}) {
    let width: number | string = Number(props.node.getAttribute("width"))
    let height: number | string = Number(props.node.getAttribute("height"))
    let src = props.node.getAttribute("src") as string
    let clazz = props.node.getAttribute("class") as string
    let alt = props.node.getAttribute("alt") as string
    let classes = useStyles()
    let className = ""
    if (clazz) {
        clazz.split(" ").forEach((it) => {
            if (it === "full-width") {
                width = "100%"
                height = "auto"
            }
            if (classes.hasOwnProperty(it)) {
                // @ts-ignore
                className += " " + classes[it]
            }
        })
    }
    return <LazyImage className={className} src={src} width={width} height={height} alt={alt} />
}

const useStyles = makeStyles(() => {
    return {
        "richtext-image": {
            color: 'blue',
        },
        "full-width": {

        },
        "right": {
            margin: 10,
            float: "right"
        },
        "left": {
            margin: 10,
            float: "left"
        }
    }
})
