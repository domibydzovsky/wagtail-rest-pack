import React, {useEffect, useState} from 'react'
import {HideOnPrint} from "./HideOnPrint";
import {Grow} from "@material-ui/core";

export interface Props {
    treshhold?: number
    children: any
    className?: string
}

export function HiddenUntilThreshold(props: Props) {
    const defaultThreshold = 200;
    const [hidden, setHidden] = useState(true);
    useEffect(() => {
        const onScroll = () => {
            let scrollTop = window.pageYOffset;
            let treshhold = props.treshhold ? props.treshhold : defaultThreshold;
            setHidden(scrollTop < treshhold)
        }
        window.addEventListener("scroll", onScroll, true);
        return () => {
            window.removeEventListener("scroll", onScroll, true)
        }
    }, []);

    return <HideOnPrint className={props.className}>
        <Grow in={!hidden}>
            {props.children}
        </Grow>
    </HideOnPrint>
}
