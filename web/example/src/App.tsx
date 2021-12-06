import React from 'react'

import { ExampleComponent } from 'wagtail-rest-pack'
import 'wagtail-rest-pack/dist/index.css'
import {ChipsExample} from "./components/ChipsExample";

const App = () => {
  return <React.Fragment>
    <ChipsExample/>
    <ExampleComponent text="Create React Library Example 😄" />
  </React.Fragment>
}

export default App
