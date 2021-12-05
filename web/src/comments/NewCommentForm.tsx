import React from 'react';
import {FormBuilder} from "../streamform/builder/FormBuilder";
import {SubmitData} from "../streamform/Handler";
import {ActionBuilder} from "../streamform/builder/ActionBuilder";
import Avatar from "@material-ui/core/Avatar";

export interface Props {
    create: (props: {
        body: string,
        done: (result: boolean) => void
    }) => void
}

export function createNewCommentForm(props: Props): FormBuilder {
    return new FormBuilder('new-comment')
        .secure("recaptcha_or_user")
        .withFields((fields) => {
            fields.withGroup({
                name: "",
                row: true,
                stream: [],
                required: "always"
            }, (group) => {
                group.withTextField({
                    name: "body",
                    required: "always",
                    multiline: true,
                    iconComp: <Avatar variant={"square"} style={{width: 20, height: 20}}>A</Avatar>,
                    minRows: 1,
                    max_length: 300,
                    label: "",
                    size: "small",
                    validation: "none",
                    placeholder: "Váš komentář"
                })
                group.withSubmit((builder)=> {
                    builder.text = "Přidat"
                    builder.icon = "comment"
                    builder.handler((data: SubmitData, actions: ActionBuilder)=> {
                        const body: string = data.dto.data['body']
                        props.create({
                            body: body,
                            done: (success) => {
                                if (success) {
                                    data.done(actions.buildSuccess())
                                } else {
                                    data.done(actions.buildError())
                                }
                            }
                        })
                    })
                })
            })
        })
}
