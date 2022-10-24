import React from 'react'
import {makeStyles, Theme} from "@material-ui/core/styles";
import {PageChild} from "../childrenData";
import {StreamFieldConfig} from "../../stream/StreamField";
import {Grid} from "@material-ui/core";
import {LazyImage} from "../../essential/LazyLoadImage";
import {Chips} from "../../chip/Chip";
import {PageTitle} from "../../essential/PageTitle";
import Skeleton from "@material-ui/lab/Skeleton";

export interface Props {
    page: PageChild | undefined
    config: StreamFieldConfig
    loading: boolean
}

export function OtherNew(props: Props) {
    const classes = useStyles()
    if (props.loading || !props.page) {
        return <Grid container className={classes.root}>
            <Grid item md={3} xs={12} className={classes.skeletonWrap}>
                <Skeleton width="100%" height={200} animation="wave"/>
            </Grid>
            <Grid item md xs={12} className={classes.skeletonWrap}>
                <Skeleton width="100%" height={200} animation="wave"/>
            </Grid>
        </Grid>
    }
    let page = props.page!!
    const onClick = () => {
        props.config.actions.openPage.openPage({url: page.url, title: page.banner.title})
    }
    return <Grid container className={classes.root}>
        <Grid item md={3} xs={12}>
            <LazyImage onClick={onClick} width={"100%"}
                       className={classes.image}
                       height={"auto"} src={page.banner.image.url} alt={page.banner.image.alt}/>
        </Grid>
        <Grid item md xs={12}>
            <PageTitle title={page.banner.title} onClick={onClick} spacing={false} bottomBorder={false}
                       last_published_at={page.last_published_at} variant={"h2"}/>
            <Chips names={page.keywords || []}
                   tagProps={props.config.tagProps}/>
            <p className={classes.noIndent}>{page.banner.subtitle}</p>
        </Grid>
    </Grid>
}

const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {
            padding: theme.spacing(1),
            borderBottom: "1px solid " + theme.palette.divider,
        },
        noIndent: {
            textIndent: "0px !important"
        },
        skeletonWrap: {
            padding: theme.spacing(1)
        },
        image: {
            paddingRight: theme.spacing(1)
        }
    }
})