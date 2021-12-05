import React from 'react'
import {LoginRequiredBySecurity} from "./addons/LoginRequiredBySecurity";
import {FormAddonProps} from "./addons/data";
import {RecaptchaAddon} from "./addons/RecaptchaAddon";
import {NonFieldErrors} from "./addons/NonFieldErrors";

export type AddonPlacement = "title" | "submit" | "response"

export interface AddonConfig {
    Component: React.ComponentType<FormAddonProps>
    placement: AddonPlacement | string
}

export interface AddonComponents {
    [name: string]: AddonConfig;
}

export function createDefaultFormAddons(): AddonComponents {
    return {
        "loginRequired": {Component: LoginRequiredBySecurity, placement: "title"},
        "recaptcha": {Component: RecaptchaAddon, placement: "submit"},
        "nonfielderrors": {Component: NonFieldErrors, placement: "submit"}
    }
}