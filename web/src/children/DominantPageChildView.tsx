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
    return <Grid container className={classes.root} spacing={2}>
        <Grid item>
            <LazyImage width={page.banner.image.width}
                            height={page.banner.image.height}
                            src={page.banner.image.url}
                            alt={page.banner.image.alt}/>
        </Grid>
        <Grid item container xs={12} sm justifyContent={"center"} alignItems={"center"} alignContent={"center"}>
            <div>
                <h2 className={classes.header} onClick={() => props.config.actions.openPage.openPage({url: page.url, title: page.banner.title})}>{page.banner.title}</h2>
                <Chips names={page.keywords || []}
                       tagProps={props.config.tagProps}/>
                <p className={classes.text}>
                    <span className={classes.date}>{toDateStr(page.last_published_at)}</span>
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
            display: "inline",
            "&:hover": {
                cursor: "pointer",
                color: theme.palette.primary.main
            }
        },
        text: {
          textAlign: "justify",
          textIndent: "none",
        },
        date: {
            fontWeight: "bold",
            color: theme.palette.primary.main,
            margin: 5
        }
    }
})
