import React from 'react'
import {StreamBlockProps} from "../../stream/StreamField";
import 'react-image-lightbox/style.css';
import {Gallery, GalleryProps} from "../../essential/Gallery";


export function StreamGalleryAdapter(props: StreamBlockProps<GalleryProps>) {
    return <Gallery {...props.value}
                    container={props.config.container}
                    largeContainer={props.config.largeContainer} />
};
