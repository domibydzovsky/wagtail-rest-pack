import React from 'react'
import {Chips, TagProps} from "wagtail-rest-pack";
import {Component} from "./Component";

export function ChipsExample() {
    const names = ["axx", "as0"]
    const props: TagProps = {
      onClick: (tag: string) => alert(tag)
    }
    return <Component name={"Chips"}>
      <Chips names={names} tagProps={props} />
    </Component>
}
