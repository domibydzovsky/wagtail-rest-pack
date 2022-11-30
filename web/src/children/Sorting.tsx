import React from 'react'
import {makeStyles, Theme, useTheme} from "@material-ui/core/styles";
import {PageChild} from "./childrenData";
import {SortOptions} from "./PageList";
import {isWidthDown, Tooltip, useMediaQuery, withWidth} from "@material-ui/core";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';

export interface SortingProps {
    pages: PageChild[]
    sort: SortOptions
}

export function useSorting(props: SortingProps): SortUse {
    const defaultField = props.sort.fields.filter((field) => field.isDefault === true)[0]
    const [sortField, setSortField] = React.useState({
        fieldName: defaultField.field,
        directionUp: true
    } as OnChangeProp)
    return {
        props: props,
        pages: props.sort.enabled ? props.pages.sort((a,b) => {
            const available = props.sort.fields.filter(field => field.field === sortField.fieldName);
            if (available.length > 0) {
                if (sortField.directionUp) {
                    return available[0].sort(b, a)
                } else {
                    return available[0].sort(a, b)
                }
            }
            return 0;
        }) : props.pages,
        onChange: (change: OnChangeProp) => {
            setSortField(change)
        }
    }
}

export interface OnChangeProp {
    directionUp: boolean
    fieldName: string
}

export interface SortUse {
    onChange: (props: OnChangeProp) => void
    pages: PageChild[]
    props: SortingProps
}

export function Sorting(data: SortUse) {
    const classes = useStyles()
    const props = data.props
    const fields = props.sort.fields
    const defaultFieldName = props.sort.fields.filter((field) => field.isDefault === true)[0].field;
    const [actualField, setActualField] = React.useState(defaultFieldName)
    const [directionUp, setDirectionUp ] = React.useState(false)
    const theme = useTheme();
    const isMobileView = useMediaQuery(theme.breakpoints.down('md'));
    if (!data.props.sort.enabled) {
        return null;
    }
    return  <div className={classes.root}>
        <div className={classes.wrapper}>
            { fields.map((field) => {
                    const isSorting = field.field === actualField;
                    let name = field.nameUp;
                    // if (!directionUp && isSorting) {
                    //     name = field.nameDown;
                    // }
                    let clazz = "";
                    if (!isSorting) {
                        clazz = classes.nonactive
                    } else {
                        clazz = classes.active
                    }
                    return <div key={field.field} className={classes.item + " " + clazz} >
                        <Tooltip title={"Seřadit: " + name} className={classes.tooltip}>
                            <div onClick={() => {
                                if (isSorting) {
                                    const newDirectionUp= !directionUp;
                                    setDirectionUp(newDirectionUp)
                                    data.onChange({
                                        directionUp: newDirectionUp,
                                        fieldName: actualField
                                    })
                                } else {
                                    setDirectionUp(true)
                                    setActualField(field.field)
                                    data.onChange({
                                        directionUp: true,
                                        fieldName: actualField
                                    })
                                }
                            }}>
                                { field.icon }
                                { !isMobileView && name }
                                { isSorting && directionUp && <ArrowUpwardIcon fontSize="small"/> }
                                { isSorting && !directionUp && <ArrowDownwardIcon fontSize="small" /> }
                                { !isSorting && <UnfoldMoreIcon fontSize="small"/> }
                            </div>
                        </Tooltip>
                    </div>
                })
            }
        </div>

    </div>
}

const useStyles = makeStyles((theme: Theme) => {
    return {
        nonactive: {
            color: theme.palette.primary.dark
        },
        active: {
            color: theme.palette.primary.light,
        },
        root: {
            display: "flex"
        },
        label: {
            marginRight: theme.spacing(1)
        },
        wrapper: {
            display: "flex"
        },
        tooltip: {
            display: "flex",
            alignItems: "center"
        },
        item: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            display: 'flex',
            alignItems: 'center',
            "&:hover": {
                cursor: "pointer"
            }
        }
    }
})