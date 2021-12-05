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
    pages: PageChild[]
    config: StreamFieldConfig
    loading: boolean
}

export function TripplePageChildView(props: Props) {
    const classes = useStyles()
    if (props.pages.length > 3) {
        throw new Error("Only 3 is allowed.")
    }
    let pages: (PageChild|undefined)[] = props.pages
    if (props.pages.length === 0 && props.loading) {
        pages = [undefined, undefined, undefined]
    }
    const scaleFactor = 0.75
    return <Grid container className={classes.root} spacing={2}>
        {
          pages.map((page: PageChild|undefined,indx: number) => {
            if (page === undefined || props.loading) {
                return <LoadingBlock key={indx}/>
            }
            const banner = page.banner
            const image = banner.image
            const date = toDateStr(page.last_published_at)
            return <Grid container xs={12} md={4} key={page.id} sm item direction={"column"}>
                <Grid item className={classes.image}>
                    <LazyImage width={image.width * scaleFactor} height={image.height * scaleFactor} src={image.url} alt={image.alt}/>
                </Grid>
                <Grid item container justifyContent={"center"} alignItems={"center"} alignContent={"center"}>
                    <div style={{maxWidth: image.width}}>
                        <h2 className={classes.header} onClick={() => props.config.actions.openPage(page.url)}>{banner.title}</h2>
                        <Chips names={page.keywords || []}
                               tagProps={props.config.tagProps}/>
                        <p className={classes.text}>
                            <span className={classes.date}>{date}</span>
                            {banner.subtitle}
                        {/*    todo delsi text vetsi max_length */}
                        </p>
                    </div>
                </Grid>
            </Grid>
        })}
    </Grid>
}

function LoadingBlock() {
    return <Grid xs={12} md={4} sm item>
            <Skeleton width="100%" height={200} animation="wave" />
            <Skeleton width="100%" height={30} animation="wave" />
            <Skeleton width="100%" height={30} animation="wave" />
    </Grid>
}

const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {
            margin: theme.spacing(2)
        },
        header: {
            display: "inline",
            fontSize: "1.2em",
            "&:hover": {
                cursor: "pointer",
                color: theme.palette.primary.main
            }
        },
        image: {
            textAlign: "center",
        },
        text: {
            textAlign: "justify",
        },
        date: {
            fontWeight: "bold",
            color: theme.palette.primary.main,
            margin: 5
        }
    }
})
