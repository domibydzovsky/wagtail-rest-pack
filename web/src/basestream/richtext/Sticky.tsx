import React from 'react'
import {makeStyles, Theme} from "@material-ui/core/styles";
import clsx from "clsx";

export interface Props {
    id: string
    children: any
}
export function Sticky(props: Props) {

    const elementId = props.id + "-wrapper-ytsticky";
    const scrollId = props.id + "-wrapper-ytsticky-scroll";
    const buttonId = props.id + "-wrapper-ytsticky-button";
    const classes = useStyles()
    const [enabled, setEnabled] = React.useState(true);
    const [visible, setVisibility] = React.useState(false);
    const [offsetHeight, setOffsetHeight] = React.useState(0);
    const closeSticky =() => {
        setEnabled(false);
        setVisibility(false);
    }
    const stickyFunction = () => {
        console.log("sticky fnction");
        var scrollY = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
        let el = document.getElementById(props.id);
        let wrapperEl = document.getElementById(elementId)
        if (wrapperEl && el && enabled && !visible && scrollY > (wrapperEl.offsetTop + wrapperEl.offsetHeight)){
            setOffsetHeight(el.offsetHeight);
            setVisibility(true)
        } else if (enabled && wrapperEl && visible && scrollY <= (wrapperEl.offsetTop + wrapperEl.offsetHeight)){
            closeSticky();
        }
    }

    React.useEffect(() => {
        window.addEventListener("scroll", stickyFunction);
        window.addEventListener("onload", stickyFunction);
        window.addEventListener("resize", stickyFunction);
        window.addEventListener("touchmove", stickyFunction);
        return () => {
            window.removeEventListener("scroll", stickyFunction);
            window.removeEventListener("onload", stickyFunction);
            window.removeEventListener("resize", stickyFunction);
            window.removeEventListener("touchmove", stickyFunction);
        }
    }, []);
    return <React.Fragment>
        <div id={elementId} style={{height: offsetHeight}} className={
            clsx(classes.wrapper, {
                [classes.hidden]: !enabled,
                [classes.visible]: enabled,
                [classes.wrapperVisible] : visible
            })}>
            <div id={scrollId} className={clsx(classes.scrollWrapper, {
                [classes.scrollableVisible]: visible
            })}>
                <div className={classes.videoWrapper}>
                    {props.children}
                    <span id={buttonId} className={clsx(classes.button, {
                        [classes.hidden]: !visible,
                        [classes.visibleInline] : visible
                    })} onClick={closeSticky}>
                        Zavřít
                    </span>
                </div>
            </div>
        </div>
    </React.Fragment>
}

const useStyles = makeStyles((theme: Theme) => {
    return {
        hidden: {
            display: 'none'
        },
        visible: {
            display: 'block'
        },
        wrapper: {
            position: "relative",
            width: "auto",
        },
        scrollableVisible: {
            position: "fixed",
            zIndex: "9999999",
            top: "10px",
            right: "10px",
        },
        wrapperVisible: {
            width: "360px",
            height: "213px",
            minHeight: "200px",
            position: "absolute",
            top: "30px",
            right: "0px",
            left: "",
            bottom: "",
        },
        scrollWrapper: {
            position: 'relative',
            display: 'block'
        },
        videoWrapper: {
            position: 'relative',
            display: 'block'
        },
        visibleInline: {
            display: 'inline-block',
        },
        button: {
            boxSizing: "border-box",
            wordBreak: "normal",
            padding: "5px 8px",
            position: "absolute",
            cursor: "pointer",
            top: "0px",
            right: "0px",
            background: "#eee",
            borderRadius: "10px",
            lineHeight: "14px",
            fontSize: "15px",
            fontWeight: "bold",
            zIndex: "9999",
        }
    }
})