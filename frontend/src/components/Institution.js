import React, { Component } from 'react'
import { ShowHeader, ShowNavbar } from './App'
export class Institution extends Component {
  render() {
    return (
      <div>
        <ShowHeader />
        <h1>Institution</h1>
        <ShowNavbar />
      </div>
    )
  }
}

export default Institution