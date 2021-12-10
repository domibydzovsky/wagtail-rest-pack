import React from 'react';
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';

import Typography from "@material-ui/core/Typography";
import {MenuItem, Renderers} from "../navmenu/data";
import {NavItemProps} from "react-minimal-side-navigation/lib/side-nav";

export interface DrawerProps {
    title: string
    renderers: Renderers
    items: MenuItem<any>[]
    onSelect: (data: {itemId: string}) => void
    activeId: string
}


export function navPropsExtraction(props: {items: MenuItem<any>[], drawerProps: DrawerProps}): NavItemProps[] {
    let renderers = props.drawerProps.renderers
    const result: NavItemProps[] = []
    props.items.map((item) => {
        let renderer = renderers[item.type];
        if (renderer) {
            const localResult = renderer.navTransformer({
                ...item,
                transform: (items: MenuItem<any>[]) => {
                    return navPropsExtraction({
                        items: items,
                        drawerProps: props.drawerProps
                    })
                },
                Render: () => null
            })
            result.push(...localResult)
        }
    })
    return result
}


export function DrawerContent(props: DrawerProps) {
    const renderedItems = navPropsExtraction({
        items: props.items,
        drawerProps: props
    })
    return (
        <div style={{textAlign: "center"}}>
            <Typography variant={"h3"}>{props.title}</Typography>
            <Navigation
                // you can use your own router's api to get pathname
                activeItemId={props.activeId}
                onSelect={props.onSelect}
                items={renderedItems}
            />
        </div>
    );
}

