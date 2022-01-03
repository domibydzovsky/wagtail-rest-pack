import React from 'react'
import {Node, NodeConfig, TransformCallback} from "interweave";
import {InternalLink} from "./InternalLink";
import {ExternalLink} from "./ExternalLink";
import {DocumentLink} from "./DocumentLink";
import {IframeEmbedded} from "./IframeEmbedded";
import {Image} from "./Image";
import {Blockquote} from "./Blockquote";
import {PageTransition} from "../../model/data";


export interface Props {
    decorated?: TransformCallback,
    pageTransition: PageTransition
}

const externalPrefixes = ["http://", "https://", "www"]
const documentPrefixes = ["/documents"]

export const LinksTransformer = (props: Props): TransformCallback => {
    return (node: HTMLElement, children: Node[], config: NodeConfig) => {
        if (config.tagName === "iframe") {
            return <IframeEmbedded node={node} children={children} config={config}/>
        }
        if (config.tagName === "img") {
            return <Image node={node}/>
        }
        if (config.tagName === "blockquote") {
            return <Blockquote node={node} children={children} />
        }
        if (config.tagName === "a") {
            const attr = node.getAttribute("href")
            const href = attr ? attr : "";
            if (externalPrefixes.some(prefix => href.startsWith(prefix))) {
                return <ExternalLink href={href} children={children}/>
            } else {
                if (documentPrefixes.some(prefix => href.startsWith(prefix))) {
                    return <DocumentLink href={href} children={children}/>
                } else {
                    return <InternalLink href={href} onOpen={props.pageTransition} children={children}/>
                }
            }
        } else if (props.decorated) {
            return props.decorated(node, children, config);
        }
        return undefined
    };
}
