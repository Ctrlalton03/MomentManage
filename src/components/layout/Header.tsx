import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import classes from '@/styles/header.module.css'


const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent scrolling when menu is open
    document.body.style.overflow = isMenuOpen ? 'unset' : 'hidden';
  };


  return (
    <>
      <header className={classes.header}>
        <div className={classes['header-container']}>
          <Link className={classes['header-logo']} to="/">
            <span className={classes['header-logo-text']}>
              Moment Manager
            </span>
          </Link>
          <nav className={classes['header-nav']}>
            <Link className={classes['header-nav-link']} to="#features">
              Features
            </Link>
            <Link className={classes['header-nav-link']} to="#testimonials">
              Testimonials
            </Link>
            <Link to="/signup">
                <Button variant="outline" className={classes['header-nav-link']} >
                    Sign Up
                </Button>
            </Link>
            
          </nav>
          <Button 
            className={classes['header-menu-button']} 
            variant="ghost" 
            size="icon"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
            <span className="sr-only"></span>
          </Button>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      {isMenuOpen && (
        <div className={classes['mobile-menu']}>
            <Button 
            className={classes['mobile-menu-close']} 
            variant="ghost" 
            size="icon"
            onClick={toggleMenu}
          >
            <X className="h-6 w-6" />
            <span className="sr-only"></span>
          </Button>
          <div className={classes['mobile-menu-content']}>
            <Link 
              className={classes['mobile-menu-link']} 
              to="#features"
              onClick={toggleMenu}
            >
              Features
            </Link>
            <Link 
              className={classes['mobile-menu-link']} 
              to="#testimonials"
              onClick={toggleMenu}
            >
              Testimonials
            </Link>
            <Link to="/signup">
            <Button 
              className={classes['mobile-menu-link']}
              onClick={toggleMenu}
            >
              Sign up
            </Button>
            </Link>
            <Link to="/login">
            <Button 
              className={classes['mobile-menu-link']}
              onClick={toggleMenu}
            >
              Login
            </Button>
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

export default Header