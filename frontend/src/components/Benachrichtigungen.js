import React, { Component } from 'react'
import { ShowHeader, ShowNavbar } from './App'
export class Benachrichtigungen extends Component {
  render() {
    return (
      <div>
        <ShowHeader />
        <h1>Benachrichtigungen</h1>
        <ShowNavbar />
      </div>
    )
  }
}

export default Benachrichtigungen