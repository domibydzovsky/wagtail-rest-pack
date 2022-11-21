import React from 'react'
import {makeStyles, Theme, useTheme} from "@material-ui/core/styles";
import {GalleryImageSize} from "../essential/Gallery";
import {Carousel as ReactCarousel} from 'react-responsive-carousel'
import {CircularProgress, useMediaQuery} from "@material-ui/core";
import {LazyImage} from "../essential/LazyLoadImage";
import 'react-responsive-carousel/lib/styles/carousel.css'
import Skeleton from "@material-ui/lab/Skeleton";
import clsx from "clsx";

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
    const [loaded, setLoaded] = React.useState(false)
    const [ lastSliders, setLastSliders ] = React.useState([] as CarouselItem[])
    React.useEffect(() => {
        if (props.sliders && props.sliders.length > 0) {
            setLastSliders(props.sliders)
        }
        setLoaded(false)
    }, [props.sliders])
    const finalSliders = (props.sliders && props.sliders.length > 0) ? props.sliders : lastSliders
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
                finalSliders && finalSliders.map((slider) => {
                    let image = smallerImage ? slider.small : slider.large
                    return <div className={clsx(classes.item, {[classes.loading]: !loaded})} key={image.url}>
                        {/*<div className={classes.textWrapper}>*/}
                        {/*    <Typography className={classes.text}>{slider.text}</Typography>*/}
                        {/*</div>*/}
                        <LazyImage
                            onLoad={() => setLoaded(true)}
                            width={"100%"}
                            height={"auto"}
                            src={image.url}
                            alt={""}/>
                    </div>
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
        loading: {
            maxHeight: "0px !important"
        },
        carousel: {
            position: "relative",
        },
        item: {
            transition: "max-height 0.5s ease-out",
            position: "relative",
            padding: 0,
            margin: 0,
            [theme.breakpoints.up("md")]: {
                maxHeight: 350
            },
            [theme.breakpoints.down("sm")]: {
                maxHeight: 100
            },
        },
        text: {
            color: "white",
            fontSize: theme.typography.fontSize.toExponential(4)
        }
    }
})
