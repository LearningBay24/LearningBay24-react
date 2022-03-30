import React, { Component } from 'react'
import { ShowHeader, ShowNavbar } from './App'
export class Kursansicht extends Component {
  render() {
    return (
      <div>
        <ShowHeader />
        <h1>Kursansicht</h1>
        <ShowNavbar />
      </div>
    )
  }
}

export default Kursansicht