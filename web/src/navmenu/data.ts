import {FunctionComponent} from "react";
import {NavItemProps} from "react-minimal-side-navigation/lib/side-nav";

export interface MenuItem<T> {
    type: string,
    id: string,
    value: T
}

export interface MobileProps {
    isMobile: boolean;
    toogleMobile: () => void;
    mobileOpened: boolean;
}

export interface RendererProps<T> extends MenuItem<T> {
    index: number
    context?: any
    Render: FunctionComponent<{items: MenuItem<T>[], context?: any, className?: string}>
    transform: (items: MenuItem<any>[]) => NavItemProps[]
    className?: string
}

export type NavMenuComponentRenderer<T> = FunctionComponent<RendererProps<any> & MobileProps & T>

export interface NamMenuRenderer<T> {
    component: NavMenuComponentRenderer<T>
    navTransformer: (item: RendererProps<T>) => NavItemProps[]
}

export interface Renderers {
    [type: string]: NamMenuRenderer<any>
}

export interface SingleNavMenuProps<T> {
    item: MenuItem<any>,
    renderers: Renderers,
    className?: string,
    additional?: T,
    context?: any
    index: number
}

export interface NavMenuProps<T> {
    items: MenuItem<any>[],
    renderers: Renderers,
    className?: string,
    additional?: T,
}

