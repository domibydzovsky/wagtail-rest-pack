import React, {useRef} from 'react'
import {Node, NodeConfig} from "interweave";
import {makeStyles} from "@material-ui/core/styles";
import {IFrameVideo} from "./IFrameVideo";
import {TransformCallback} from "interweave/src/types";


export type EmbedType = "translate" | "normal"

export interface IFrameRendererProps {
    node: HTMLElement,
    children: Node[],
    config: NodeConfig,
    attrs: any,
    type: string | undefined
}
export type IFrameRenderer = React.ComponentType<IFrameRendererProps>

export const getAttributes = (node: HTMLElement): any => {
    const properties: any= {}
    node.getAttributeNames().forEach((attr)=> {
        properties[attr] = node.getAttribute(attr)
    })
    return properties
}
export function createIframeEmbedded(renderers: Map<string, IFrameRenderer>, DefaultRenderer: IFrameRenderer): TransformCallback {
    return (node: HTMLElement, children: Node[], config: NodeConfig) => {
        const attrs = getAttributes(node)
        let type = attrs['data-type']
        const props : IFrameRendererProps = {
            config, children, node, attrs, type
        }
        const Renderer = renderers.get(type)
        if (!Renderer) {
            return <DefaultRenderer {...props} />
        }
        return <Renderer {...props}/>
    }
}

export function IframeEmbedded(props: {node: HTMLElement, children: Node[], config: NodeConfig, autoPlay?: boolean}) {
    const properties: any= {}
    props.node.getAttributeNames().forEach((attr)=> {
        properties[attr] = props.node.getAttribute(attr)
    })
    const ref = useRef(null);
    // todo if autoplay, add autostart property
    return <IFrameVideo target={ref} attrs={properties} autoPlay={props.autoPlay}/>
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
