import styles from './layout.module.css'
import React from 'react'
import FollowTray from './followtray'
import { Link } from 'react-router-dom'
import Text from '../components/text'
import lang from '../lang/lang.json'

class Footer extends React.Component {

  constructor(props) {
    super(props);
    this.state = { width: window.innerWidth, height: window.innerHeight };
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

  render() {
    return (
      <div className="z-100 relative bg-gray-7 shadow-xl py-6 px-16 xl:px-64 bottom-0">
        <div className="sm:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 tracking-tight font-medium text-white text-center md:text-left">
          {this.state.width < 640 ?
            <div className="mr-auto mb-2">
              <FollowTray />
            </div> : <></>
          }
          <div className="sm:col-span-1 md:ml-auto">
            <Link to="/">
              <p className="font-bold text-2xl sm:text-3xl">
                <Text>{lang.footer.title}</Text>
              </p>
            </Link>
            <a href="mailto:dullesrobotics@gmail.com" target="_blank" rel="noopener noreferrer" className="font-medium hover:underline"><p>{lang.footer.email}</p></a>
            <Link to="/contact">
              {lang.footer.address}
            </Link>
            <br />
            © {new Date().getFullYear()} {lang.footer.copyright_name}
          </div>
          {this.state.width >= 640 ?
            <div className="col-span-1 md:col-span-2 xl:col-span-3 pl-4 md:pl-12 lg:pl-20">
              <FollowTray />
            </div> : <></>
          }
        </div>
      </div>
    );
  }
}

export default Footer;