import React from 'react';
import {makeStyles, Theme} from "@material-ui/core/styles";
import {toDateStr} from "../utils/date";


export interface Props {
  title: string
  subTitle?: string
  showSubtitle?: boolean
  last_published_at?: string | number
  variant: "h1" | "h2"
  bottomBorder?: boolean
  onClick?: () => void
  spacing?: boolean
}

export function PageTitle(props: Props) {
  const classes = useStyles()
  let clazz = classes.root;
  let subtitleClazz = classes.subtitle;
  if (props.bottomBorder != false) {
      clazz += " " + classes.bottomBorder;
  }
  if (props.spacing !== false) {
      clazz != " " + classes.rootPadding;
      subtitleClazz = " "+ classes.subtitlePadding;
  }
  if (props.onClick) {
      clazz += " " + classes.clickable;
  }
  return <div className={clazz} onClick={() => props.onClick && props.onClick()}>
    {props.showSubtitle && props.subTitle && <React.Fragment>
      {props.variant === "h1" && <h2 className={subtitleClazz}>{props.subTitle}</h2>}
      {props.variant === "h2" && <h3 className={subtitleClazz}>{props.subTitle}</h3>}
    </React.Fragment>}
    {props.variant === "h1" && <React.Fragment>
      <h1 className={classes.title}>{props.title}</h1>
    </React.Fragment>}
    {props.variant === "h2" && <React.Fragment>
      <h2 className={classes.title}>{props.title}</h2>
    </React.Fragment>}
    {props.last_published_at && <p className={classes.modifiedAt}>
      Zveřejněno {toDateStr(props.last_published_at)}
    </p>}
  </div>
}

const useStyles = makeStyles((theme: Theme) => {
  return {
    bottomBorder: {
      borderBottom: "1px solid " + theme.palette.divider,
    },
    clickable: {
      "&:hover": {
        cursor: "pointer",
        color: theme.palette.primary.main
      }
    },
    root: {
      width: "100%",
      float: "left",
    },
    rootPadding: {
      paddingBottom: theme.spacing(2),
    },
    subtitle: {
      margin: 0,
      color: theme.palette.secondary.main,
    },
    subtitlePadding:{
      paddingBottom: theme.spacing(1),
    },
    title: {
      margin: 0,
      color: theme.palette.primary.main,
    },
    modifiedAt: {
      margin: 0,
      paddingTop: theme.spacing(1),
      color: theme.palette.grey.A700,
      textIndent: 0
    }
  }
})
