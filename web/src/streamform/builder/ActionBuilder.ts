import {FormBuilder} from "./FormBuilder";
import {StreamBlock} from "../../stream/StreamField";
import {SubmitResult} from "../Collector";


export class ActionBuilder {
    constructor(private form: FormBuilder) {
    }

    private fields: StreamBlock<any>[] = []

    asStream = (): StreamBlock<any>[] => {
        return this.fields
    }

    buildError = (): SubmitResult=> {
        return {
            success: false
        }
    }

    buildSuccess = (): SubmitResult => {
        return {
            success: true,
            stream: this.fields,
        }
    }

    withNotification = (text: string): ActionBuilder => {
        this.fields.push({
            type: "form_open_snack",
            id: this.form.generateId(),
            value: {
                text: text
            }
        })
        return this
    }

    withDialog = (title: string, stream: StreamBlock<any>[]) : ActionBuilder=> {
        this.fields.push({
            type: "form_open_dialog",
            id: this.form.generateId(),
            value: {
                title: title,
                text: stream,
            }
        })
        return this
    }
}