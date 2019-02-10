import * as React from "react"
import { Link } from "gatsby"

// import { rhythm, scale } from "../utils/typography"

class Menu extends React.Component {
  render() {
    return (<div
      style={{
        marginBottom: `20px`,
      }}>
      <Link to={"/"}>Home</Link>&nbsp;&nbsp;
      <Link to={"/about"}>About Me</Link>
    </div>);
  }
}

export default Menu;