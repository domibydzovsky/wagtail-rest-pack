import React from 'react'
import {makeStyles, Theme} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {PageChild} from "./childrenData";
import {Chips, TagProps} from "../chip/Chip";
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import {toDateStr} from "../utils/date";
import {PageTransition} from "../model/data";

export interface Props {
  self: PageChild,
  tagProps: TagProps,
  openPage: PageTransition,
  renderExtra: (props: {key: string, value: any}) => any
}

export function Item(props: Props) {
    const classes = useStyles();

    const data = props.self
    const openPage = () => props.openPage.openPage({url: data.url, title: data.banner.title});
    return (
        <Card className={classes.root}>
            {/*<CardHeader*/}
            {/*    title={data.banner.title}*/}
            {/*    className={classes.title}*/}
            {/*/>*/}
            {data.banner.image && <CardMedia
                onClick={openPage}
                className={classes.media}
                image={data.banner.image.url}
                title={data.banner.title}
            />}
            <CardContent className={classes.content}>
                <Typography variant="h2" className={classes.title} onClick={openPage}>
                    {data.banner.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {data.banner.subtitle}
                </Typography>
            </CardContent>
            { ((data.extra && Object.entries(data.extra).length > 0) || (data.keywords && data.keywords.length > 0)) && <CardActions disableSpacing className={classes.actions}>
                <div>
                    {data.extra && Object.entries(data.extra).map(value => {
                        return props.renderExtra({
                            key: value[0],
                            value: value[1]
                        })
                    })}
                    {data.keywords && <Chips names={data.keywords} tagProps={props.tagProps}/>}
                </div>
            </CardActions>}
            <CardActions disableSpacing className={classes.actions}>
                <IconButton aria-label="goto"
                            onClick={openPage}
                            size="small"
                            style={{marginLeft: 'auto'}}
                            color="primary"
                            title={data.url}>
                    <OpenInBrowserIcon />
                    Otevřít
                </IconButton>
            </CardActions>
        </Card>
    );
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        margin: 10,
        boxShadow: theme.shadows[5],
    },
    title: {
        fontSize: "1.5rem",
        "&:hover": {
            cursor: "pointer"
        }
    },
    content: {
        paddingBottom: 0
    },
    actions: {

    },
    media: {
        cursor: "pointer",
        height: 0,
        paddingTop: '56.25%', // 16:9
        "&:hover": {
            opacity: 0.9
        }
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: theme.palette.secondary.main,
    },
}));
