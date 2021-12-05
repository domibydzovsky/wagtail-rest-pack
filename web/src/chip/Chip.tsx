import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import {Tooltip} from "@material-ui/core";
import LabelIcon from '@material-ui/icons/Label';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'wrap',
        padding: theme.spacing(0.5),
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
}));

export interface TagProps {
    onClick: (tag: string) => void
    active?: string[]
}

export function Chips(props: { names: string[], tagProps: TagProps }) {
    const classes = useStyles()
    return <div className={classes.root}>
        {props.names.map((name) => {
            const active = props.tagProps.active?.includes(name)
            return <Tooltip key={name} title={"Search by tag"}>
                <Chip size="small"
                      icon={<LabelIcon/>}
                      color={active ? "primary" : undefined}
                      label={name}
                      onClick={() => props.tagProps.onClick(name)}/>
            </Tooltip>
        })}
    </div>
}
