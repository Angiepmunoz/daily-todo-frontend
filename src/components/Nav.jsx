import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="main-page___nav">
      <div className="main-page___nav-icon"><Link to="/">TickTockTask</Link></div>
      <div className="main-page___nav-link-one">Link</div>
      <div className="main-page___nav-link-two">Link</div>
    </nav>
  );
}
