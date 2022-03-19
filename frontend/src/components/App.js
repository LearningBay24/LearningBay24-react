import '../App.css';

import {
  Link,

} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <h1>Home</h1>
      <RenderFooter />
    </div>

  );
}

function RenderFooter() {
  return (
    <footer>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/abgabenuebersicht">Abgabenübersicht</Link></li>
        <li><Link to="/anlegen">Anlegen</Link></li>
        <li><Link to="/benachrichtigungen">Benachrichtigungen</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/institution">Institution</Link></li>
        <li><Link to="/klausurenuebersicht">Klausurenübersicht</Link></li>
        <li><Link to="/kursansicht">Kursansicht</Link></li>
        <li><Link to="/kursuebersicht">Kursübersicht</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/profil">Profil</Link></li>
        <li><Link to="/stundenplan">Stundenplan</Link></li>
      </ul>
    </footer>
  )
}
export default App;
export { RenderFooter };

