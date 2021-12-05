import {MutableRefObject} from "react";
import {useResize} from "./resize";


export interface Size {
    width: number
    height: number
}

export function useRatio(myRef: MutableRefObject<any>, max: Size, current: Size): Size {
    const contextMax = useResize(myRef, max)
    let width = current.width;
    let height = current.height;
    let ratio: number;
    if (width > height) {
        ratio =  contextMax.width / width;
    } else {
        ratio = contextMax.height / height;
    }
    return {
        height: height * ratio,
        width: width * ratio
    }
}