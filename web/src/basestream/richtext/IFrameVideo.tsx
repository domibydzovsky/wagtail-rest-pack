import React, {MutableRefObject} from "react";
import {HideOnPrint} from "../../essential/HideOnPrint";
import {Tooltip} from "@material-ui/core";
import {LazyImage} from "../../essential/LazyLoadImage";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {useRatio} from "../../utils/ratio";
import {Sticky} from "./Sticky";

export interface IFrameVideoProps {
    target: MutableRefObject<any>
    attrs: any
    autoPlay?: boolean
}
const allowedMax = {
    width: 500,
    height: 400
}

let idCounter = 0;

export function IFrameVideo(props: IFrameVideoProps) {
    const id = React.useState(idCounter++);
    const properties = props.attrs
    const classes = useStyles()
    let title = properties['data-title'] || ""
    let thumbnailUrl = properties['data-thumbnail'] || undefined

    let clazz = properties['class'];
    if (clazz) {
        properties['className'] = clazz + " ytsticky"
    } else {
        properties['className'] = "ytsticky"
    }
    const [opened, setOpened] = React.useState(thumbnailUrl === undefined || props.autoPlay)

    let {width, height} = useRatio(props.target, allowedMax, {
        width: Number(properties["width"]),
        height: Number(properties["height"])
    });
    if (width) {
        properties["width"] = width;
    }
    if (height) {
        properties["height"] = height;
    }
    delete properties["frameborder"]
    if (properties["allowfullscreen"]) {
        const allowFull = properties["allowfullscreen"];
        delete properties["allowfullscreen"];
        properties["allowFullScreen"] = allowFull;
    }
    // properties["frameBorder"] = properties["frameborder"]
    // properties["allowFullScreen"] = properties["allowfullscreen"]
    // delete properties["allowfullscreen"]
    if (opened) {
        return <HideOnPrint>
            <div ref={props.target} className={classes.root}>
                <div className={classes.videoThumbnail}>
                    <iframe {...properties}/>
                </div>
            </div>
        </HideOnPrint>
    } else {
        return <HideOnPrint>
            <div ref={props.target} className={classes.root}>
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

const useStyles = makeStyles((theme: Theme) => {
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