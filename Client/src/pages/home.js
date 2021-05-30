import React from 'react'
import SectionDivider from '../components/sectiondivider'
import Button from '../components/button'

import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

import mobile from "is-mobile"
import NewsFeed from "../components/newsfeed"
import { Link } from 'react-router-dom'

const slides = [
  (<img alt="Waste Management Logo" className="h-24 w-auto mx-auto" src={process.env.PUBLIC_URL + "/media/wm.png"} />),
  (<img alt="NASA Logo" className="h-32 w-auto mx-auto" src={process.env.PUBLIC_URL + "/media/nasa.png"} />),
  (<img alt="TMiller Financial Logo" className="h-32 w-auto mx-auto" src={process.env.PUBLIC_URL + "/media/tmiller.png"} />),
]

const nextButton = <button className="rounded ml-3"><Button bstyle="secondary"><i className="text-blue-2 fas fa-chevron-right"></i></Button></button>,
  backButton = <button className="rounded mr-3"><Button bstyle="secondary"><i className="text-blue-2 fas fa-chevron-left"></i></Button></button>

class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { width: window.innerWidth, height: window.innerHeight, slideValue: 0 };
    this.onSlideChange = this.onSlideChange.bind(this);
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

  onSlideChange(slideValue) {
    this.setState({ slideValue })
  }

  render() {
    return (
      <div>
        <div className="z-20">
          <div className="pt-20 sm:pt-32 lg:pt-48 xl:pt-64" style={{ "text-shadow": "0px 0px 5px #777777" }}>
            <p className="text-white font-bold mx-auto text-center text-4xl sm:text-5xl lg:text-7xl">Dulles Robotics</p>
            <p className="text-white text-xl md:text-3xl font-bold mx-auto text-center">Preparing Our Members For The Future</p>
          </div>
          <div>
            <SectionDivider className="mt-20 lg:mt-32 xl:mt-64 h-2 md:h-5 lg:h-20" divider="skew-c" color1={100} color2={4} />
            <div className="grid grid-cols-1 md:grid-cols-9 lg:grid-cols-5 xl:grid-cols-9 bg-gray-4 py-8">
              <div className="md:col-span-1 xl:col-span-2" />
              <div className="px-4 md:px-0 col-span-1 md:col-span-7 lg:col-span-3 xl:col-span-5 text-left text-white">
                <p className="font-bold text-3xl">About Us</p>
                <p className="font-base text-xl md:text-2xl py-2">
                  We are a robotics club based out of Dulles High School in Sugar Land, Texas.
                  Dulles Robotics is home to the FTC Teams 12456 and 13822 as well as FRC team 7494.
                  These teams participate in the <i>FIRST</i> Robotics programs.
                </p>
                <div className="mt-5 text-center">
                  <Link to="/about-us">
                    <Button className="mr-1 sm:mr-2" bstyle="primary" animate>More About Us <i className="ml-2 fas fa-arrow-right hidden sm:inline"></i></Button>
                  </Link>
                  <Link to="/about-us/first">
                    <Button className="ml-1 sm:ml-2" bstyle="primary" animate>About <strong><i>First</i></strong> <i className="hidden sm:inline ml-2 fas fa-arrow-right"></i></Button>
                  </Link>
                </div>
              </div>
              <div className="md:col-span-1 xl:col-span-2" />
            </div>
            <SectionDivider className="h-2 md:h-5 lg:h-20" divider="skew-c" color1={4} color2={100} />
            <div>
              <p className="text-center text-white text-2xl sm:text-3xl md:text-4xl font-bold my-32 md:my-48 xl:my-100 mx-2">Fostering An Interest In STEM To Allow Our Students To Become The Leaders Of Tomorrow.​</p>
            </div>
            <SectionDivider className="h-2 md:h-5 lg:h-20" divider="skew-c" color1={100} color2={/*1*/ 5} />

            {/* <div className="xl:grid xl:grid-cols-8 bg-gray-1 py-10">
              <div className="xl:col-span-2 relative" />
              <div className="mx-3 lg:mx-10 xl:mx-0 xl:col-span-4 text-left text-white">
                <p className="font-bold text-4xl pl-10 mb-5">Our Sponsors</p>

                <CarouselHolder key={this.state.width} onSlideChange={this.onSlideChange} slideValue={this.state.slideValue} />
                <div className="flex justify-center mt-5">
                  <Link to="/sponsors" className="mr-1"><Button bstyle="primary" animate>About our Sponsors<i className="ml-2 fas fa-arrow-right hidden sm:inline"></i></Button></Link>
                  <Link to="/support-us" className="ml-1"><Button bstyle="primary" animate>Support Us<i className="ml-2 fas fa-arrow-right hidden sm:inline"></i></Button></Link>
                </div>

              </div>
              <div className="xl:col-span-2 relative" />
            </div> */}
            {/* 
            <SectionDivider className="h-2 md:h-5 lg:h-20" divider="skew-c" color1={1} color2={5} /> */}

            <div className="grid grid-cols-1 md:grid-cols-9 lg:grid-cols-5 xl:grid-cols-9 bg-gray-5 py-8">
              <div className="md:col-span-1 xl:col-span-2" />
              <div className="px-4 md:px-0 col-span-1 md:col-span-7 lg:col-span-3 xl:col-span-5 text-left text-white">
                <p className="font-bold text-3xl">Recent News and Announcements</p>
                <NewsFeed max={4} />
                <div className="mt-5 text-center">
                  <Link to="/news"><Button bstyle="primary" animate>More News<i className="ml-2 fas fa-arrow-right hidden sm:inline"></i></Button></Link>
                </div>
              </div>
              <div className="md:col-span-1 xl:col-span-2" />
            </div>

            <SectionDivider className="h-2 md:h-5 lg:h-20" divider="skew-c" color1={5} color2={1} />

            <div className="xl:grid xl:grid-cols-8 bg-gray-1 pt-5 pb-10">
              <div className="xl:col-span-2 relative" />
              <div className="mx-3 lg:mx-10 xl:mx-0 xl:col-span-4 text-left text-white">
                <p className="font-bold text-4xl text-center">We Need Support!</p>
                <p className="text-lg text-center">
                  Sponsors and supporters allow us to afford registration, travel, and robot part costs.
                  <br />
                  Consider supporting our excellent teams and get sweet perks:
                </p>
                <div className="flex justify-center mt-5">
                  <Link to="/support-us" className="ml-1"><Button bstyle="primary" animate>Support Us<i className="ml-2 fas fa-arrow-right hidden sm:inline"></i></Button></Link>
                </div>
              </div>
              <div className="xl:col-span-2 relative" />
            </div>

          </div>
        </div>
        {/* Background elements, in order from front to back */}
        <div className={"absolute"} style={{
          "z-index": "-7", "top": (this.state.width >= 1280 ? "1000px" : (this.state.width >= 768 ? "600px" : (this.state.width >= 335 ? "500px" : "600px"))),
          "backgroundImage": "linear-gradient(to bottom, rgba(113, 9, 232, 0.5) 0%, rgba(242, 41, 91, 0.5) 120%)", "backgroundRepeat": "no-repeat", "backgroundSize": "cover"
          , margin: '0 auto', width: '100%', height: (this.state.width >= 1280 ? "1200px" : (this.state.width >= 1024 ? "950px" : (this.state.width >= 768 ? "600px" : "510px"))), backgroundPosition: "center center"
        }} />

        <div className={"absolute"} style={{
          "z-index": "-8", "top": (this.state.width >= 1280 ? "1000px" : (this.state.width >= 768 ? "600px" : (this.state.width >= 335 ? "500px" : "600px"))),
          "backgroundImage": "url(" + process.env.PUBLIC_URL + "/media/groupphotohome.jpg)", "backgroundRepeat": "no-repeat", "backgroundSize": "cover"
          , margin: '0 auto', width: '100%', height: (this.state.width >= 1280 ? "1200px" : (this.state.width >= 1024 ? "950px" : (this.state.width >= 768 ? "600px" : "510px"))), backgroundPosition: "center center"
        }} />

        <div className={"absolute"} style={{
          "z-index": "-9", "top": "-100px",
          "backgroundImage": "linear-gradient(to bottom, rgba(0, 203, 221, 0.6) 0%, rgba(165, 28, 28, 0.65) 90%)", "backgroundRepeat": "no-repeat", "backgroundSize": "cover"
          , margin: '0 auto', width: '100%', height: (this.state.width >= 1280 ? "1200px" : (this.state.width >= 1024 ? "950px" : (this.state.width >= 768 ? "600px" : "510px"))), backgroundPosition: "center center"
        }} />

        {!mobile() ? <div className="absolute top-0" style={{ "z-index": "-10" }}>
          <iframe title="Youtube Video" width={this.state.width - 17} height={9 * (this.state.width / 16)} src="https://www.youtube-nocookie.com/embed/EXGHTNbBxB8?autoplay=1&loop=1&playlist=EXGHTNbBxB8&version=3&disablekb=1&mute=1&controls=0&start=21&end=197" frameborder="0"></iframe>
        </div> : <></>}

        <div className={"absolute"} style={{
          "z-index": "-11", "top": "-100px",
          "backgroundImage": "url(" + process.env.PUBLIC_URL + "/media/txpasteam.jpg)", "backgroundRepeat": "no-repeat", "backgroundSize": "cover"
          , margin: '0 auto', width: '100%', height: (this.state.width >= 1280 ? "1200px" : (this.state.width >= 1024 ? "950px" : (this.state.width >= 768 ? "600px" : "510px"))), backgroundPosition: "center center"
        }} />
      </div>
    );
  }
}

export class CarouselHolder extends React.Component {

  render() {
    return (
      <div>
        <Carousel
          autoPlay={5000}
          infinite={true}
          slidesPerPage={1}
          addArrowClickHandler={true}
          arrowRight={nextButton}
          arrowLeft={backButton}
          onChange={this.props.onSlideChange}
          slides={slides}
          value={this.props.slideValue}
          plugins={[
            'centered'
          ]}
        />
        <Dots className="mt-8" value={this.props.slideValue} onChange={this.props.onSlideChange} number={slides.length} />
      </div>
    )
  }
}

export default HomeScreen;