import React from 'react'
import {HiddenUntilThreshold} from "./HiddenUntilThreshold";
import {scrollToTop} from "../utils/scroll";
import {Button} from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import {makeStyles, Theme} from "@material-ui/core/styles";

export interface Props {
    text?: string
}

export function ScrollToTop(props: Props) {
    const classes = useStyles()
    return <HiddenUntilThreshold className={classes.root}>
        <div onClick={scrollToTop}>
            <Button
                variant="contained"
                color="primary"
                startIcon={<ArrowUpwardIcon/>}>
                { props.text ? props.text : "Scroll Up"}
            </Button>
        </div>
    </HiddenUntilThreshold>
}

const useStyles = makeStyles((theme: Theme) =>{
    return {
        root: {
            opacity: 0.7,
            position: "fixed",
            color: theme.palette.primary.main,
            bottom: theme.spacing(2),
            right: theme.spacing(3),
            cursor: "pointer",
            "&:hover": {
                color: theme.palette.primary.light
            }
        }
    }
})
