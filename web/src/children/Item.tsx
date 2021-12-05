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

export interface Props {
  self: PageChild,
  tagProps: TagProps,
  openPage: (url: string)=>void
}

export function Item(props: Props) {
    const classes = useStyles();

    const data = props.self
    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        R
                    {/* todo add avatar, so add owner parsing to BannerSerializer? */}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="goto"
                                onClick={() => props.openPage(data.url)}
                                title={data.url}>
                        <OpenInBrowserIcon />
                    </IconButton>
                }
                title={data.banner.title}
                subheader={toDateStr(data.last_published_at)}
            />
            {data.banner.image && <CardMedia
                className={classes.media}
                image={data.banner.image.url}
                title={data.banner.title}
            />}
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {data.banner.subtitle}

                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Chips names={data.keywords ? data.keywords : []}
                       tagProps={props.tagProps}/>
                {/*<IconButton aria-label="add to favorites">*/}
                {/*    <FavoriteIcon />*/}
                {/*</IconButton>*/}
                {/*<IconButton aria-label="share">*/}
                {/*    <ShareIcon />*/}
                {/*</IconButton>*/}
                {/*<IconButton*/}
                {/*    className={clsx(classes.expand, {*/}
                {/*        [classes.expandOpen]: expanded,*/}
                {/*    })}*/}
                {/*    onClick={handleExpandClick}*/}
                {/*    aria-expanded={expanded}*/}
                {/*    aria-label="show more"*/}
                {/*>*/}
                {/*    <ExpandMoreIcon />*/}
                {/*</IconButton>*/}
            </CardActions>

        </Card>
    );
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        margin: 10,
        boxShadow: theme.shadows[5],
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
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
