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
}

export function PageTitle(props: Props) {
  const classes = useStyles()
  let clazz = classes.root;
  if (props.bottomBorder != false) {
      clazz += " " + classes.bottomBorder;
  }
  return <div className={clazz}>
    {props.showSubtitle && props.subTitle && <React.Fragment>
      {props.variant === "h1" && <h2 className={classes.subtitle}>{props.subTitle}</h2>}
      {props.variant === "h2" && <h3 className={classes.subtitle}>{props.subTitle}</h3>}
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
    root: {
      width: "100%",
      float: "left",
      paddingBottom: theme.spacing(2),
    },
    subtitle: {
      margin: 0,
      color: theme.palette.secondary.main,
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
    }
  }
})
