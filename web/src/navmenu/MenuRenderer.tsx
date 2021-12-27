import React from 'react'
import {CreatePageLinkRenderer} from "./PageLink";
import {MenuItem, NavMenuProps, Renderers, SingleNavMenuProps} from "./data";


export interface RenderersConf {
  singleLevel?: boolean
  openPage: (url: string) => void
}

export function getAllRenderers(props: RenderersConf): Renderers {
  return {
    "linkblock": CreatePageLinkRenderer({singleLevelOnly: props.singleLevel, onClick: props.openPage})
  }
}

export function MenuRenderer(props: NavMenuProps<any>) {
  // todo className?
  return <React.Fragment>{props.items.map((it, index) => {
    return <MenuRendererSingle key={it.id}
                               index={index}
                               renderers={props.renderers}
                               additional={props.additional}
                               item={it}/>
  })}</React.Fragment>
}


function MenuRendererSingle(props: SingleNavMenuProps<any>) {
  const item = props.item
  let renderers = props.renderers
  let renderer = renderers[item.type];
  if (!renderer) {
    return <div>
      Unsupported block type {item.type} with a value '{JSON.stringify(item.value)}'
    </div>
  }
  const Component = renderer.component
  return <Component {...props.additional}
                    {...item}
                    key={item.id}
                    index={props.index}
                    Render={(internalProps: { items: MenuItem<any>[], className: string }) => {
                      return internalProps.items.map((nestedItem: MenuItem<any>, nestedIndex: number) => {
                        MenuRendererSingle({
                          className: internalProps.className,
                          renderers: renderers,
                          additional: {...props.additional},
                          item: nestedItem,
                          index: nestedIndex
                        })
                      })
                    }}
  />

}
