import React from 'react'
import Spacer from '../components/spacer'
import Button from '../components/button'
import { Link } from 'react-router-dom'


class FourOFourPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { width: window.innerWidth, height: window.outerHeight };
  }

  updateDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.outerHeight });
  };
  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  render() {

    let height = document.documentElement.scrollHeight;

    return (
      <div>
        <div
          style={{
            backgroundImage: "url(" + process.env.PUBLIC_URL + "/media/robotnotfound.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            margin: '0 auto',
            width: '100%',
            backgroundPosition: "center center"
          }}>
          <div
            style={{
              backgroundImage: "linear-gradient(to bottom, rgba(0, 203, 221, 0.6) 0%, rgba(165, 28, 28, 0.65) 90%)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              margin: '0 auto',
              width: '100%',
              backgroundPosition: "center center"
            }}
          >
            <p className="text-white font-bold text-center -mb-10 md:-mb-20 pt-32" style={{ textShadow: "10px 10px 5px rgba(119,119,119,0.5)", fontSize: this.state.width > 767 ? "270px" : "150px" }}>404</p>
            <p className="text-white text-2xl md:text-5xl font-bold text-center">That Page Can't Be Found
            <p className="mt-6 md:mt-0">
                <Link to="/">
                  <Button bstyle="primary" className="text-lg shadowmx-auto shadow-bluehover" animate>Return Home</Button>
                </Link>
              </p>
            </p>
            <div style={{ 'min-height': '45vh' }}></div>
          </div>
        </div>
      </div>
    );
  }
}

export default FourOFourPage;