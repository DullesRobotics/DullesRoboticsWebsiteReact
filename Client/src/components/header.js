import styles from './layout.module.css'
import React from 'react'
import Button from './button'
import { slide as Menu } from 'react-burger-menu'
import { Link } from 'react-router-dom'
import { NavBar, MobileMenu } from './navbar'
import Text from '../components/text'
import lang from '../lang/lang.json'

const topSpacing = '100px';

const borgerstyles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    left: '36px',
    top: '36px',
    visibility: 'hidden',
  },
  bmBurgerBars: {
    background: '#373a47'
  },
  bmBurgerBarsHover: {
    background: '#a90000'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenuWrap: {
    top: 0,
    position: 'fixed',
    height: '100%',
    width: '16rem',
  },
  bmMenu: {
    background: '#54595F',
    fontSize: '1.15em',
    boxShadow: 'inset 0 5px 6px 0 rgba(0, 0, 0, 0.08)'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em'
  },
  bmItem: {
    display: 'inline-block'
  },
  bmOverlay: {
    top: 0,
    background: 'rgba(0, 0, 0, 0.3)'
  }
}

const headerCSS = {
  html: {
    scrollPaddingTop: topSpacing,
    margin: topSpacing + ' auto',
    marginBottom: topSpacing
  }
}


class Header extends React.Component {
  //w - 1024
  constructor(props) {
    super(props);
    this.state = { width: window.innerWidth, height: window.innerHeight, menuOpen: false };
  }

  updateDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };
  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  toggleMenu() {
    this.setState(state => ({ menuOpen: !state.menuOpen }))
  }

  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen })
  }

  render() {
    document.documentElement.style.setProperty('--top-spacing', (this.state.height >= 496 ? (this.state.width >= 640 ? '72px' : '50px') : (this.state.width >= 640 ? '55px' : '50px')));

    return (
      <div className="z-0 outer-container overflow-hidden">
        <div className={"fixed top-0 min-w-full " + styles.header}>
          <nav className={"flex items-center justify-between flex-wrap bg-gray-7 shadow-xl py-1 mx-auto " + styles.navbar}>
            <div className="mx-auto">
              <Link to={this.props.dir === "/" ? "#" : "/"}>
                <div className="mr-2 md:mr-4 flex items-center flex-shrink-0 text-white">
                  {this.state.width >= 328 ? <img className={(this.state.height >= 496 ? "h-10 w-10 sm:h-16 sm:w-16" : "h-10 w-10") + " rounded-full p-0 sm:p-1"} alt="Dulles Robotics's Logo" src={process.env.PUBLIC_URL + "/media/profilerounded.png"}></img> : <></>}
                  <span className={"pl-2 font-bold " + (this.state.height >= 496 ? "text-2xl sm:text-4xl text-center" : "text-xl")}>
                    <Text>{lang.header.title}</Text>
                  </span>
                </div>
              </Link>
            </div>

            <div className="mx-auto">
              <div className="flex items-center gap-3">
                {this.state.width >= 1295 ? <NavBar /> :
                  <div className="">
                    <button onClick={() => { this.toggleMenu() }}>
                      <Button bstyle="primary">
                        <div className="p-1 flex items-center gap-3 flex-shrink-0 text-white">
                          <svg class={"fill-current " + (this.state.width > 290 ? "h-5" : "h-4") + " sm:h-6 w-auto"}
                            viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>{lang.header.menu_button}</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                        </div>
                      </Button>
                    </button>
                  </div>
                }
              </div>
            </div>
          </nav>
        </div>
        <Menu styles={borgerstyles} disableAutoFocus right pageWrapId={"page-wrap"} outerContainerId={"outer-container"} onStateChange={(state) => this.handleStateChange(state)} isOpen={this.state.menuOpen} >
          <MobileMenu dir={this.props.dir} />
        </Menu>
      </div>
    );
  }
}

export default Header;