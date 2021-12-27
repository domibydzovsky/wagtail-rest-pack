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
      {props.name}<hr/>
      {props.children}
      <div style={{clear: "both"}}></div>
    </Container>
}

const useStyles = makeStyles(() => {
    return {
        root: {
          clear: "both",
          marginTop: 50,
          paddingBotton: 50,
          borderLeft: "2px solid lightblue"
        }
    }
})
