import React, { Fragment, Component } from 'react';
import Lightbox from 'react-image-lightbox';
import {makeStyles, Theme} from "@material-ui/core/styles";
import 'react-image-lightbox/style.css';
import {Grid} from "@material-ui/core";
import {LazyImage} from "./LazyLoadImage";

export interface GalleryImageSize {
    url: string
    alt: string
    width: number
    height: number
}

export interface GalleryImage {
    id: number
    title: string
    caption: string
    large: GalleryImageSize
    small: GalleryImageSize
}

export interface GalleryProps {
    name?: string
    images: {image: GalleryImage}[]
    container: React.ComponentType
    largeContainer: React.ComponentType
}

export function Gallery(props: GalleryProps) {
    const [opened, setOpened] = React.useState(false)
    const [index, setIndex] = React.useState(0)
    const classes = useStyles()
    let image = props.images[index].image;
    let previous = index > 0 ? props.images[index-1].image : undefined
    let following = props.images[index+1] ? props.images[index+1].image : undefined
    const LargeContainer = props.largeContainer;
    const Container = props.container;
    return <React.Fragment>
        { opened &&  (<Lightbox
            mainSrc={image.large.url}
            mainSrcThumbnail={image.small.url}
            prevSrcThumbnail={previous? previous.small.url: undefined}
            prevLabel={previous?previous.title:undefined}
            prevSrc={previous?previous.large.url: undefined}
            nextSrcThumbnail={following? following.small.url: undefined}
            nextLabel={following?following.title:undefined}
            nextSrc={following?following.large.url:undefined}
            imageTitle={image.title}
            imageCaption={image.caption}
            enableZoom={true}
            clickOutsideToClose={true}
            zoomOutLabel={"Oddálit"}
            zoomInLabel={"Přiblížit"}
            wrapperClassName={classes.root}
            closeLabel={"Zavřít"}
            onMoveNextRequest={() => setIndex(index+1)}
            onMovePrevRequest={() => setIndex(index-1)}
            onCloseRequest={() => setOpened(false)}/>)}
        {props.name && <Container>
            <h2>{props.name}</h2>
        </Container>}
        <LargeContainer>
            <Grid container alignItems={"center"} justify={"center"}>
                { props.images.map((image,index) => {
                    return <Grid item xs={12} sm={6} md={4} lg={3} key={index}
                                 className={classes.item}
                                 onClick={() => {setIndex(index); setOpened(true)}}>
                        <LazyImage alt={image.image.title}
                                   className={classes.img}
                                   width={image.image.small.width}
                                   height={image.image.small.height}
                                   src={image.image.small.url}/>
                    </Grid>
                })}
            </Grid>
        </LargeContainer>
    </React.Fragment>
};

const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {
            zIndex: theme.zIndex.drawer
        },
        item: {
            padding: 5,
            textAlign: "center",
            verticalAlign: "center",
            cursor: "pointer",
            overflow: "hidden"
        },
        img: {
            boxShadow: theme.shadows[3],
            verticalAlign: "center",
            minWidth: 300,
            minHeight: 200,
        }
    }
})
