import {FormContext} from "../Form";
import {FormHandler} from "../Handler";
import {StreamFieldConfig} from "../../stream/StreamField";

export interface FormAddonProps {
    context: FormContext
    config: StreamFieldConfig
    handler: FormHandler
}
