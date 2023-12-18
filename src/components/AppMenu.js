
import { Link, BrowserRouter } from "react-router-dom";
import "../App.css";
import Routess from "../routes";
export default function AppMenu(){
    return (
        <div>
            <BrowserRouter>
          <nav className="navbar">
            <ul>
              <li>
                <Link className="links" to="/"> Add sector </Link>
              </li>
              <li>
                <Link className="links" to="user/sector/">Update sector</Link>
              </li>
            </ul>
          </nav>
          <Routess/>
        </BrowserRouter>
            
        </div>
    )
}