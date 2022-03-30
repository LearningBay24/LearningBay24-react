import React, { Component } from 'react'
import { ShowHeader, ShowNavbar } from './App'

export class Abgabenuebersicht extends Component {
  render() {
    return (
      <div>
        <ShowHeader />
        <h1>Abgabenuebersicht</h1>
        <ShowNavbar />
      </div>
    )
  }
}

export default Abgabenuebersicht