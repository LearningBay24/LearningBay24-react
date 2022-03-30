import React, { Component } from 'react'
import { ShowHeader, ShowNavbar } from './App'

export class Klausurenuebersicht extends Component {
  render() {
    return (
      <div>
        <ShowHeader />
        <h1>Klausurenuebersicht</h1>
        <ShowNavbar />
      </div>
    )
  }
}

export default Klausurenuebersicht