import React from 'react'

import 'wagtail-rest-pack/dist/index.css'
import {ChipsExample} from "./components/ChipsExample";
import {PageTitleExample} from "./components/pagetitle/PageTitleExample";

const App = () => {
  return <React.Fragment>
    <PageTitleExample/>
    <ChipsExample/>
  </React.Fragment>
}

export default App
