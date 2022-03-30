import React, { Component } from 'react'
import { ShowHeader, ShowNavbar } from './App'
export class Profil extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "Max",
      surname: "Mustermann",
      title: "",
      email: "max.musterman@web.de",
      graduation: "Abitur",
      job: "Student",
      location: "Offenburg",
      institutionlocation: "Offenburg",
      bio: "abc",
      courses: ["Prog1", "Projekt1", "Mathe1"]

    }
  }
  render() {
    return (
      <div>
        <ShowHeader />
        <h1>Profil</h1>
        <p>{this.state.title} {this.state.surname}, {this.state.name}</p>
        <p>{this.state.email}</p>
        <p>{this.state.graduation}</p>
        <p>{this.state.job}</p>
        <p>{this.state.location}</p>
        <p>{this.state.institutionlocation}</p>
        <input type="text" id="bio" defaultValue={this.state.bio} onInput={this.ChangeBio} ></input>
        <this.FillCourses />
        <ShowNavbar />
      </div>
    )
  }

  ChangeBio = () => {
    this.state.bio = document.getElementById("bio").value
    alert(this.state.bio)
  }

  FillCourses = () => {
    let t = ""
    for (let course of this.state.courses) {
      t += course + ","
    }
    return <p>{t}</p>
  }
}



export default Profil