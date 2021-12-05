import React from 'react'
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

export interface Props {
    width: number | string
    height: number | string
    src: string
    alt: string
    className?: string
}

export function LazyImage(props: Props) {
    return <img className={props.className + " lazyload"}
                alt={props.alt}
                width={props.width}
                height={props.height}
                data-src={props.src} />
}
