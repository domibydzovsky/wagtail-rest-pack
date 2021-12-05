import {FieldsBuilder} from "./FieldsBuilder";
import {StreamBlock} from "../../stream/StreamField";
import {Props} from "../Form";
import {FormSecurity, SubmitData} from "../Handler";


export class FormBuilder {
    private id = 0
    private fieldBuilder: FieldsBuilder
    private security: FormSecurity = "authenticated_user_only"
    private description: string = ""
    private display: string = ""
    private actions: Map<string, (data: SubmitData)=>void> = new Map()

    constructor(private name: string) {
        this.fieldBuilder = new FieldsBuilder(this)
    }

    withFields(block: (builder: FieldsBuilder) => void) : FormBuilder{
        block(this.fieldBuilder)
        return this
    }

    addHandler = (name: string, action: (data: SubmitData) => void)=> {
        this.actions.set(name, action)
    }

    handle = (data: SubmitData): void => {
        this.actions.get(data.dto['action'])!!(data)
    }

    secure(security:FormSecurity): FormBuilder{
        this.security = security
        return this
    }

    describe(description: string): FormBuilder {
        this.description = description
        return this
    }

    displayAs(name: string): FormBuilder {
        this.display = name
        return this
    }

    asStream():StreamBlock<Props>{
        return {
            id: this.generateId(),
            type: 'form',
            value: {
                security: this.security,
                description: this.description,
                name: this.name,
                display_name: this.display,
                stream: this.fieldBuilder.build()
            }
        }
    }

    generateId = (): string => {
        this.id++
        return this.id + ""
    }

}