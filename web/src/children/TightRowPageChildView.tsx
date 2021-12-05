import React from 'react'
import {PageChild} from "./childrenData";
import {Grid} from "@material-ui/core";
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

export function TightRowPageChildView(props: Props) {
    const classes = useStyles()
    const scaleFactor = 0.5

    if (props.page === undefined || props.loading) {
        return <Grid container spacing={2}>
            <Grid item xs={2}>
                <Skeleton width="100%" height={150} animation="wave"/>
            </Grid>
            <Grid item xs style={{ alignSelf: "center" }}>
                <Skeleton width="100%" height={20} animation="wave"/>
                <Skeleton width="100%" height={80} animation="wave"/>
            </Grid>
        </Grid>
    }

    let page = props.page!!
    const image = page.banner.image
    const date = toDateStr(page.last_published_at)

    return <Grid container className={classes.root} spacing={2}>
        <Grid item>
            <LazyImage width={image.width * scaleFactor}
                       height={image.height * scaleFactor}
                       src={image.url}
                       alt={image.alt}/>
        </Grid>
        <Grid item xs={12} sm justify={"center"} alignItems={"center"} alignContent={"center"}>
            <div>
                <h2 className={classes.header} onClick={() => props.config.actions.openPage(page.url)}>{page.banner.title}</h2>
                <Chips names={page.keywords || []}
                       tagProps={props.config.tagProps}/>
                <p className={classes.text}>
                    <span className={classes.date}>{date}</span>
                    {page.banner.subtitle}
                </p>
            </div>
        </Grid>
    </Grid>
}

const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {
            margin: theme.spacing(2)
        },
        header: {
            fontSize: "1em",
            display: "inline",
            "&:hover": {
                cursor: "pointer",
                color: theme.palette.primary.main
            }
        },
        text: {
        },
        date: {
            fontWeight: "bold",
            color: theme.palette.primary.main,
            margin: 5
        }
    }
})
