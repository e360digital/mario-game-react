import "./Footer.css";

const Footer = () => {
  return (
    <div className="copyright">Copyright © {new Date().getFullYear()} {" "}
      <a href="https://cellularport.com" target="_blank" rel="noreferrer" className="copyright-link">Cellularport</a>
    </div>
  )
}
export default Footer