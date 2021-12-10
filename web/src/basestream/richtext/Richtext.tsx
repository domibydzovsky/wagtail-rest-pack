import React from 'react'
import {StreamBlockProps} from "../../stream/StreamField";
import Interweave, {Filter, Matcher, TransformCallback, Attributes, ALLOWED_TAG_LIST} from 'interweave';
import {linebreak} from "./linebreak";
import {makeStyles} from "@material-ui/core/styles";

export interface StreamRichTextProps {
    text: string
}

export interface RichTextConfiguration {
    filters?: Filter[],
    matchers?: Matcher[],
    transform?: TransformCallback,
    allowList?: string[],
    blockList?: string[],
    allowAttributes?: boolean,
    allowElements?: boolean,
    noHtml?: boolean,
    noHtmlExceptMatchers?: boolean,
    transformOnlyAllowList?: boolean,
    noWrap?: boolean,
    attributes?: Attributes,
    disableMatchers?: boolean,
    disableFilters?: boolean,
    disableLineBreaks?: boolean,
}

export function StreamRichText(props: StreamBlockProps<StreamRichTextProps>){
    return <RichText text={props.value.text} conf={props.config.richtext}/>
}

export function RichText(props: {text: string, conf?: RichTextConfiguration}) {
    const configuration: RichTextConfiguration = props.conf ? props.conf : {}
    const text = props.text.replaceAll("\n", linebreak)
    const classes = useStyles()
    return <div className={classes.root}>
        <Interweave
        allowAttributes={configuration.allowAttributes}
        allowElements={configuration.allowElements}
        noHtml={configuration.noHtml}
        noHtmlExceptMatchers={configuration.noHtmlExceptMatchers}
        noWrap={configuration.noWrap}
        attributes={configuration.attributes}
        transformOnlyAllowList={configuration.transformOnlyAllowList}
        disableMatchers={configuration.disableMatchers}
        disableFilters={configuration.disableFilters}
        disableLineBreaks={configuration.disableLineBreaks}
        filters={configuration.filters || []}
        matchers={configuration.matchers || []}
        transform={configuration.transform}
        allowList={configuration.allowList}
        blockList={configuration.blockList}
        content={text}
        /></div>
}

const useStyles = makeStyles((theme) => {
    return {
        root: {
            "& p,ul,li" :{
                textAlign: "justify",
                fontSize: "1.2rem",
                lineHeight: 1.6,
                [theme.breakpoints.down("xs")]: {
                    fontSize: "1.1rem"
                }
            }
        }
    }
})
