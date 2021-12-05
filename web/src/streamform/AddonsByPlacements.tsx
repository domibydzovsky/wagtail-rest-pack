import {AddonComponents, AddonConfig, AddonPlacement} from "./Addons";
import {FormAddonProps} from "./addons/data";
import React from "react";

export function AddonsByPlacement(props: { addons: AddonComponents, placement: AddonPlacement | string, props: FormAddonProps }) {
    const configs: AddonConfig[] = Object.entries(props.addons)
        .map((addon) => {
            return addon[1]
        })
        .filter((it) => it.placement === props.placement)
    return <div>{
        configs.map((it,indx) => {
            const Component = it.Component
            return <Component key={indx} {...props.props}/>
        })
    }</div>
}