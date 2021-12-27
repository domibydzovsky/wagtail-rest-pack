import React from 'react'

import { ExampleComponent } from 'wagtail-rest-pack'
import 'wagtail-rest-pack/dist/index.css'
import {ChipsExample} from "./components/ChipsExample";
import {PageTitleExample} from "./components/pagetitle/PageTitleExample";

const App = () => {
  return <React.Fragment>
    <PageTitleExample/>
    <ChipsExample/>
    <ExampleComponent text="Create React Library Example 😄" />
  </React.Fragment>
}

export default App
