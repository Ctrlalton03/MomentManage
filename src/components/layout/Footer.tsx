import footerStyles from '../../styles/modules/footer.module.css'
import { Link } from "react-router-dom"


const Footer: React.FC = () => {
  return (
    <footer className={footerStyles.footer}>
      <div className={footerStyles['footer-container']}>
        <p className={footerStyles['footer-copyright']}>
          © {new Date().getFullYear()} Moment Manager. All rights reserved.
        </p>
        <nav className={footerStyles['footer-nav']}>
          <Link className={footerStyles['footer-nav-link']} to="#">
            Terms of Service
          </Link>
          <Link className={footerStyles['footer-nav-link']} to="#">
            Privacy Policy
          </Link>
          <Link className={footerStyles['footer-nav-link']} to="#">
            Contact Us
          </Link>
        </nav>
      </div>
    </footer>
  )
}

export default Footer