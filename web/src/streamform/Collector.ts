import {PostFormDto} from "./Handler";
import {StreamBlock} from "../stream/StreamField";

export interface SubmitResult {
    success: boolean,
    stream?: StreamBlock<any>[]
    error?: { message: any, code: number }
}

export interface Collector {
    setError?: (message: string) => void
    collect?: (dto: PostFormDto) => void
    clear?: () => void
    onInteraction?: () => void
    onSubmitStart?: () => void
    onSubmitEnd?: (result: SubmitResult) => void
}
