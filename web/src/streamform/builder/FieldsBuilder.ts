import {FormBuilder} from "./FormBuilder";
import {Props as TextProps} from "../Text";
import {Props as GroupProps} from "../Group";
import {StreamBlock} from "../../stream/StreamField";
import {SubmitBuilder} from "./SubmitBuilder";


export class FieldsBuilder {
    private blocks: StreamBlock<any>[] = []

    constructor(private form: FormBuilder) {
    }

    //form
    // form_open_snack
    // form_open_dialog
    // form_group
    // form_text
    // form_submit

    withTextField(props: TextProps) : FieldsBuilder{
        return this.field("form_text", props)
    }

    withGroup(props: GroupProps, stream: (builder: FieldsBuilder)=>void) {
        const nested = new FieldsBuilder(this.form)
        stream(nested)
        return this.field("form_group", {...props, stream: nested.build()})
    }

    withSubmit(action: (builder: SubmitBuilder) => void): FieldsBuilder {
        const nested = new SubmitBuilder(this.form)
        action(nested)
        return this.field("form_submit", nested.asStream())
    }

    build(): StreamBlock<any>[] {
        return this.blocks
    }

    private field(type: string, data: any)  : FieldsBuilder{
        this.blocks.push({
            id: this.form.generateId(),
            type: type,
            value: data
        })
        return this
    }


}
