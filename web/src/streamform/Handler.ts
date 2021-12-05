import {FormContext, Props} from "./Form";
import {AddonComponents} from "./Addons";
import {SubmitResult} from "./Collector";

export type FieldVisibility = "anonymous_user_only" | "always"
export type FormSecurity = "recaptcha_or_user" | "authenticated_user_only" | "allow_any"

export interface PostFormDto {
    name: string;
    action: string;
    data: any;
}

export interface RequestFormHandler {
    props: Props
}

export type FormHandlerFactory = (data: RequestFormHandler) => FormHandler

export interface FormStyle {
    variant: "outlined" | "filled" | "standard",
    color: "primary" | "secondary"
}

export interface RecaptchaProps {
    onChange: (token: string | undefined) => void
}

export interface RecaptchaConfig {
    update: (token: string, dto: PostFormDto) => void
    Component: React.ComponentType<RecaptchaProps>
}

export interface SubmitData {
    context: FormContext,
    dto: PostFormDto,
    done: (result: SubmitResult) => void
}

export interface FormHandler {
    submit: (req: SubmitData) => void
    isAuthenticated: () => boolean
    style: FormStyle
    addons: AddonComponents
    recaptcha: RecaptchaConfig
}
