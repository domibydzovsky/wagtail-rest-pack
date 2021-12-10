import React from "react";
import {MobileProps, NamMenuRenderer, NavMenuComponentRenderer, RendererProps} from "./data";
import {Button, Link} from "@material-ui/core";

export interface PageLinkProps {
    name: string
    icon: string
    page: {
        id: number
        url: string
    }
    conf: PageLinkConf
}

export interface PageLinkConf {
    singleLevelOnly?: boolean
    onClick: (url: string) => void
}

export function CreatePageLinkRenderer(conf: PageLinkConf): NamMenuRenderer<PageLinkProps> {
    return {
        component: CreatePageLink(conf),
        navTransformer: (item) => {
            const value = item.value
            return [
                {
                    title: value.name,
                    itemId: value.page.url,
                    elemBefore: () => <p>{item.value.icon}</p>,
                    subNav: []
                }
            ]
        }
    }
}

export const CreatePageLink = (conf: PageLinkConf):NavMenuComponentRenderer<PageLinkProps> => {
    return (props) => {
        props.value.conf = conf
        return <PageLink {...props}/>
    }
}

export function PageLink(props: (RendererProps<PageLinkProps> & MobileProps)) {
    const title = props.value.name
    const page = props.value.page
    const singleLevelOnly = props.value.conf?.singleLevelOnly || false
    return <Link href={page.url} onClick={(e:any) => {
        e.preventDefault()
        props.value.conf.onClick(page.url || "/")
    }}>
        <Button >{title}</Button>
    </Link>
}
