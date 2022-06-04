import React from 'react'
import {PageChild} from "./childrenData";
import {Grid, Paper} from "@material-ui/core";
import {LazyImage} from "../essential/LazyLoadImage";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {toDateStr} from "../utils/date";
import {Chips} from "../chip/Chip";
import {StreamFieldConfig} from "../stream/StreamField";
import Skeleton from '@material-ui/lab/Skeleton';

export interface Props {
    page: PageChild | undefined
    config: StreamFieldConfig
    loading: boolean
}

export function DominantPageChildView(props: Props) {
    const classes = useStyles()

    if (props.loading || props.page === undefined) {
        return <Grid container spacing={2}>
            <Grid item sm={4}>
                <Skeleton width="100%" height={300} animation="wave"/>
            </Grid>
            <Grid item sm >
                <Skeleton width="100%" height={300} animation="wave"/>
            </Grid>
        </Grid>
    }
    let page = props.page!!
    const onClick = () => {
        props.config.actions.openPage.openPage({url: page.url, title: page.banner.title})
    }
    return <Grid container spacing={2} className={classes.root}>

                <Grid item xs={12} sm alignItems={"center"} alignContent={"center"}>
                    <h2 className={classes.header}
                        onClick={onClick}>
                        {page.banner.title}
                    </h2>
                    <Chips names={page.keywords || []}
                           tagProps={props.config.tagProps}/>
                    <p className={classes.text}>
                        <span className={classes.date}>{toDateStr(page.last_published_at)}</span>
                        {page.banner.subtitle}
                    </p>
                </Grid>
                <Grid item xs={12} sm>
                    <LazyImage width={page.banner.image.width}
                               height={page.banner.image.height}
                               onClick={onClick}
                               src={page.banner.image.url}
                               alt={page.banner.image.alt}/>
                </Grid>
        </Grid>

}

const useStyles = makeStyles((theme: Theme) => {
    return {
        paper: {
            width: "100%"
        },
        root: {
            padding: theme.spacing(1),
            [theme.breakpoints.up("md")]: {
                margin: theme.spacing(2)
            },
            borderBottom: "1px solid " + theme.palette.divider
        },
        header: {
            display: "inline",
            "&:hover": {
                cursor: "pointer",
                color: theme.palette.primary.main
            }
        },
        text: {
          textAlign: "justify",
          textIndent: "0px !important",
        },
        date: {
            fontWeight: "bold",
            color: theme.palette.primary.main,
            marginRight: 5
        }
    }
})
