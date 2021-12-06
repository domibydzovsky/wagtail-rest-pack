import React from 'react'
import {makeStyles} from "@material-ui/core/styles";

import {Container} from "@material-ui/core";
export interface Props {
  name: string
  children: any|any[]
}


export function Component(props: Props) {
    const classes = useStyles()
    return <Container className={classes.root}>
      {props.name}
      {props.children}
    </Container>
}

const useStyles = makeStyles(() => {
    return {
        root: {

        }
    }
})
