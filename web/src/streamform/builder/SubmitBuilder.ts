import {FormBuilder} from "./FormBuilder";
import {Props as SubmitProps} from "../Submit";
import {SubmitData} from "../Handler";
import {ActionBuilder} from "./ActionBuilder";
import {TextIcon} from "../InputIcon";


export class SubmitBuilder {
    text: string = ""
    useOnce: boolean = true
    icon: TextIcon | undefined = undefined
    partials: Partial<SubmitProps> = {}
    name: string

    constructor(private form: FormBuilder) {
        this.name = this.form.generateId()
    }

    handler = (action: (data: SubmitData, actions: ActionBuilder) => void) => {
        this.form.addHandler(this.name, (data) => {
            const actions = new ActionBuilder(this.form)
            action(data, actions)
        })
    }

    specific = (partials: Partial<SubmitProps>) => {
        this.partials = partials
    }

    asStream = (): SubmitProps => {
        return {
            ...this.partials,
            name: this.name,
            text: this.text,
            icon: this.icon,
            useOnce: this.useOnce,
        }
    }
}
