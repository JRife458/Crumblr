import React from "react";
import "./Footer.css"

function Footer() {
  return (
    <div className="footer">
      <div>
        <a className="footer-link"
        href="https://github.com/Mancussion"
        target="_blank"
        rel="noopener noreferrer"
        ><i className="fa-brands fa-square-github fa-2x"></i></a>
      </div>
      <div className="footer-middle">
        <p className="footerText">Crumblr</p>
      </div>
      <div>
        <a className="footer-link"
        href="https://www.linkedin.com/in/justin-rife-730875181/"
        target="_blank"
        rel="noopener noreferrer"
        ><i className="fa-brands fa-linkedin fa-2x"></i></a>
      </div>
    </div>
  )
}

export default Footer;
