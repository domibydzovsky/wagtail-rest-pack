import React from 'react'
import {StreamBlockProps} from "../../stream/StreamField";
import 'react-image-lightbox/style.css';
import {Gallery, GalleryProps} from "../../essential/Gallery";


export function StreamGalleryAdapter(props: StreamBlockProps<GalleryProps>) {
    let Container = props.config.container;
    let LargeContainer = props.config.largeContainer;
    if (props.context.containerized){
        Container = NoopContainer;
        LargeContainer = NoopContainer;
    }
    return <Gallery {...props.value}
                    container={Container}
                    largeContainer={LargeContainer} />
};
// React.ComponentType<{ className?: string }>
function NoopContainer(props: {className?: string, children: any}) {
    return <div className={props.className}>
        {props.children}
    </div>
}