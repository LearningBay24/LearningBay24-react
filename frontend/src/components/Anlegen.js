import React, { Component } from 'react'
import { ShowHeader, ShowNavbar } from './App'

export class Anlegen extends Component {
  render() {
    return (
      <div>
        <ShowHeader ClassName='Header'/>
        <h1>Anlegen</h1>
        <ShowNavbar />
      </div>
    )
  }
}

export default Anlegen