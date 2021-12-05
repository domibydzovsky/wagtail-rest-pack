import React from 'react'

export function setPageMetadata(props: {title: string, description?: string}) {
    document.title = props.title;
    if (props.description) {
        document.querySelector('meta[name="description"]')!!.setAttribute('content', props.description);
    }
}