import React, {useRef} from 'react'
import {Node, NodeConfig} from "interweave";
import {useRatio} from "../../utils/ratio";
import {LazyImage} from "../../essential/LazyLoadImage";
import {makeStyles} from "@material-ui/core/styles";
import {Tooltip} from "@material-ui/core";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import {HideOnPrint} from "../../essential/HideOnPrint";

const allowedMax = {
    width: 500,
    height: 400
}

export function IframeEmbedded(props: {node: HTMLElement, children: Node[], config: NodeConfig}) {
    const properties: any= {}
    props.node.getAttributeNames().forEach((attr)=> {
        properties[attr] = props.node.getAttribute(attr)
    })
    const ref = useRef(null);
    let {width, height} = useRatio(ref, allowedMax, {
        width: Number(properties["width"]),
        height: Number(properties["height"])
    });
    properties["width"] = width;
    properties["height"] = height;
    properties["frameBorder"] = properties["frameborder"]
    delete properties["frameborder"]
    properties["allowFullScreen"] = properties["allowfullscreen"]
    delete properties["allowfullscreen"]

    let title = properties['data-title'] || ""
    let thumbnailUrl = properties['data-thumbnail'] || undefined
    const classes = useStyles()
    const [opened, setOpened] = React.useState(thumbnailUrl === undefined)

    if (opened) {
        return <HideOnPrint>
            <div ref={ref} className={classes.root}>
                <div className={classes.videoThumbnail}>
                    <iframe {...properties}/>
                </div>
            </div>
        </HideOnPrint>
    } else {
        return <HideOnPrint>
            <div ref={ref} className={classes.root}>
                <Tooltip title={title} >
                    <div onClick={() => {setOpened(true)}} className={classes.videoThumbnail}>
                        <LazyImage width={width} height={height} src={thumbnailUrl} alt={title}/>
                        <div className={classes.thumbnailInner}>Zobrazit video <PlayCircleFilledIcon color="primary"/></div>
                    </div>
                </Tooltip>
            </div>
        </HideOnPrint>
    }
}

const useStyles = makeStyles(theme => {
    return {
        root: {
            width: "100%",
            height: "auto"
        },
        thumbnailInner: {
            margin: 5,
            display: "flex",
            alignItems: "center"
        },
        videoThumbnail: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer"
        }
    }
})
