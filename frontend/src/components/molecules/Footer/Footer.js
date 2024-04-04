import "./Footer.css";

const Footer = () => {
  return (
    <div className="copyright">Copyright © {new Date().getFullYear()} {" "}
      <a href="https://cellularport.com" target="_blank" rel="noreferrer" className="copyright-link">Cellular port</a>
    </div>
  )
}
export default Footer