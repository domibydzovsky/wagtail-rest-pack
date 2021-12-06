import React from 'react'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import {makeStyles, Theme} from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import {Breadcrump} from "./breadcrumpsData";
import HomeIcon from '@material-ui/icons/Home';

export interface Props {
  openPage: (url: string) => void,
  items: Breadcrump[],
  loading: boolean
}

export function Breadcrumps(props: Props) {
    // todo loading
    const classes = useStyles()
    if (props.items.length == 0) {
        return null
    }
    if (props.items.length == 1 && props.items[0].url == "/") {
        return null
    }
    const homeBreadcrump: Breadcrump ={
        icon: <HomeIcon fontSize="small"/>,
        slug: "home",
        id: "0",
        url: "/",
        title: "Domů"
    }
    const breadcrumps: Breadcrump[] = props.items.concat(homeBreadcrump)
    const maxItems = 2

    return <Breadcrumbs separator="›" maxItems={maxItems} aria-label="breadcrumb" className={classes.root}>
        {breadcrumps.reverse().map((item, indx) => {
            let last = indx === (breadcrumps.length - 1);
            if (last) {
                return <Typography>{item.title}</Typography>
            }
            return <div title={item.url}>

                <Link className={classes.item}
                      key={item.id}
                      onClick={() => {
                          props.openPage(item.url)
                      }}>
                    {item.icon && item.icon}{item.title}
                </Link>
            </div>
        })
        }
    </Breadcrumbs>
}

const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {
            margin: theme.spacing(1)
        },
        item: {
            cursor: "pointer",
            display: "flex"
        },
        icon: {
            marginRight: 2,
            width: 22,
            height: 22,
        }
    }
})