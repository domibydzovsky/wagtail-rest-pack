import React from 'react'
import {makeStyles, Theme, useTheme} from "@material-ui/core/styles";
import {GalleryImageSize} from "../essential/Gallery";
import {Carousel as ReactCarousel} from 'react-responsive-carousel'
import {useMediaQuery} from "@material-ui/core";
import {LazyImage} from "../essential/LazyLoadImage";
import 'react-responsive-carousel/lib/styles/carousel.css'

export interface CarouselItem {
    large: GalleryImageSize,
    small: GalleryImageSize,
    text: string
}

export interface CarouselItems {
    sliders: CarouselItem[] | undefined
}

interface PossibleSkeleton {
    skeleton?: boolean
}

export function Carousel(props: CarouselItems) {
    const classes = useStyles()
    const theme = useTheme();
    const smallerImage = useMediaQuery(theme.breakpoints.down('sm'));
    let showControl = props.sliders && props.sliders.length > 1;
    let skeletons = [{}]
    return <div className={classes.root}>
        <ReactCarousel
            showArrows={showControl}
            showIndicators={false}
            centerSlidePercentage={100}
            centerMode={true}
            dynamicHeight={false}
            swipeable={showControl}
            useKeyboardArrows={showControl}
            className={classes.carousel}
            showThumbs={false}>
            {
                props.sliders && props.sliders.map((slider) => {
                    let image = smallerImage ? slider.small : slider.large
                    return <div className={classes.item} key={image.url}>
                        {/*<div className={classes.textWrapper}>*/}
                        {/*    <Typography className={classes.text}>{slider.text}</Typography>*/}
                        {/*</div>*/}
                        <LazyImage
                            width={"100%"}
                            height={"auto"}
                            src={image.url}
                            alt={image.alt}/>
                    </div>
                }) || skeletons.map((it, index) => {

                    return <div key={index}/>
                    // return <div className={classes.item}><CircularProgress /></div>
                    // return <Skeleton className={classes.item} height={"calc(100vh - 60px)"} animation="wave" />
                })
            }
        </ReactCarousel>
    </div>
}

const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {
            boxShadow: theme.shadows[2]
        },
        carousel: {
            position: "relative",
        },
        item: {
            position: "relative",
            padding: 0,
            margin: 0,
            [theme.breakpoints.up("md")]: {
                height: 350,
            },
            [theme.breakpoints.down("sm")]: {
                height: 100,
            },
        },
        text: {
            color: "white",
            fontSize: theme.typography.fontSize.toExponential(4)
        }
    }
})
