import React, { useState } from 'react'
import SectionDivider from '../components/sectiondivider'
import Button from '../components/button'

import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

import mobile from "is-mobile"
import NewsFeed from "../components/newsfeed"
import { Link } from 'react-router-dom'

import Text from '../components/text'
import lang from '../lang/lang.json'

import ServerImage from '../components/serverimage'
import images from '../lang/images.json'

import { useSelector, useDispatch } from 'react-redux'
import {
  loadMediaFile,
  selectMedia
} from '../slices/mediaSlice'

const slides = [
  (<ServerImage alt="Waste Management Logo" className="h-24 w-auto mx-auto" file={images.sponsors.wm} />),
  (<ServerImage alt="NASA Logo" className="h-32 w-auto mx-auto" file={images.sponsors.nasa} />),
  (<ServerImage alt="TMiller Financial Logo" className="h-32 w-auto mx-auto" file={images.sponsors.tmiller} />)
]

const nextButton = <button className="rounded ml-3"><Button bstyle="secondary"><i className="text-blue-2 fas fa-chevron-right"></i></Button></button>,
  backButton = <button className="rounded mr-3"><Button bstyle="secondary"><i className="text-blue-2 fas fa-chevron-left"></i></Button></button>

export default function HomeScreen(props) {

  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth
  })

  //const [slide, setSlide] = useState(0)

  React.useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      })
    }
    window.addEventListener('resize', handleResize)
    return _ => window.removeEventListener('resize', handleResize)
  })

  const dispatch = useDispatch();
  const blobs = useSelector(selectMedia);
  let topBannerURL, middleBannerURL

  if (blobs.cached.has(images.home.top_banner))
    topBannerURL = blobs.cached.get(images.home.top_banner)
  else
    dispatch(loadMediaFile(images.home.top_banner))

  if (blobs.cached.has(images.home.middle_banner))
    middleBannerURL = blobs.cached.get(images.home.middle_banner)
  else
    dispatch(loadMediaFile(images.home.middle_banner))

  return (
    <div>
      <div className="z-20">
        <div className="pt-20 sm:pt-32 lg:pt-48 xl:pt-64" style={{ "text-shadow": "0px 0px 5px #777777" }}>
          <p className="text-white font-bold mx-auto text-center text-4xl sm:text-5xl lg:text-7xl">
            <Text>{lang.home.title}</Text>
          </p>
          <p className="text-white text-xl md:text-3xl font-bold mx-auto text-center">
            <Text>{lang.home.subtitle}</Text>
          </p>
        </div>
        <div>
          <SectionDivider className="mt-20 lg:mt-32 xl:mt-64 h-2 md:h-5 lg:h-20" divider="skew-c" color1={100} color2={4} />
          <div className="grid grid-cols-1 md:grid-cols-9 lg:grid-cols-5 xl:grid-cols-9 bg-gray-4 py-8">
            <div className="md:col-span-1 xl:col-span-2" />
            <div className="px-4 md:px-0 col-span-1 md:col-span-7 lg:col-span-3 xl:col-span-5 text-left text-white">
              <p className="font-bold text-3xl">
                <Text>{lang.home.about_us.title}</Text>
              </p>
              <p className="font-base text-xl md:text-2xl py-2">
                <Text>{lang.home.about_us.content}</Text>
              </p>
              <div className="mt-5 text-center">
                <Link to="/about-us">
                  <Button className="mr-1 sm:mr-2" bstyle="primary" animate>
                    {lang.home.about_us.buttons.more} <i className="ml-2 fas fa-arrow-right hidden sm:inline"></i>
                  </Button>
                </Link>
                <Link to="/about-us/first">
                  <Button className="ml-1 sm:ml-2" bstyle="primary" animate>
                    {lang.home.about_us.buttons.about} <i>FIRST</i> <i className="hidden sm:inline ml-2 fas fa-arrow-right"></i>
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:col-span-1 xl:col-span-2" />
          </div>
          <SectionDivider className="h-2 md:h-5 lg:h-20" divider="skew-c" color1={4} color2={100} />
          <div>
            <p className="text-center text-white text-2xl sm:text-3xl md:text-4xl font-bold my-32 md:my-48 xl:my-100 mx-2">
              <Text>{lang.home.image_box}</Text>
            </p>
          </div>
          <SectionDivider className="h-2 md:h-5 lg:h-20" divider="skew-c" color1={100} color2={/*1*/ 5} />

          {/* <div className="xl:grid xl:grid-cols-8 bg-gray-1 py-10">
            <div className="xl:col-span-2 relative" />
            <div className="mx-3 lg:mx-10 xl:mx-0 xl:col-span-4 text-left text-white">
              <p className="font-bold text-4xl pl-10 mb-5">Our Sponsors</p>

              <CarouselHolder key={dimensions.width} onSlideChange={setSlide} slideValue={slide} />
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
              <p className="font-bold text-3xl">
                <Text>{lang.home.news.title}</Text>
              </p>
              <NewsFeed max={4} />
              <div className="mt-5 text-center">
                <Link to="/news">
                  <Button bstyle="primary" animate>
                    {lang.home.news.more_button} <i className="ml-2 fas fa-arrow-right hidden sm:inline"></i>
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:col-span-1 xl:col-span-2" />
          </div>

          <SectionDivider className="h-2 md:h-5 lg:h-20" divider="skew-c" color1={5} color2={1} />

          <div className="xl:grid xl:grid-cols-8 bg-gray-1 pt-5 pb-10">
            <div className="xl:col-span-2 relative" />
            <div className="mx-3 lg:mx-10 xl:mx-0 xl:col-span-4 text-left text-white">
              <p className="font-bold text-4xl text-center"><Text>{lang.home.support_box.title}</Text></p>
              <p className="text-lg text-center">
                <Text>{lang.home.support_box.content}</Text>
              </p>
              <div className="flex justify-center mt-5">
                <Link to="/support-us" className="ml-1">
                  <Button bstyle="primary" animate>
                    {lang.home.support_box.button} <i className="ml-2 fas fa-arrow-right hidden sm:inline"></i>
                  </Button>
                </Link>
              </div>
            </div>
            <div className="xl:col-span-2 relative" />
          </div>

        </div>
      </div>
      {/* Background elements, in order from front to back */}
      <div className={"absolute"} style={{
        "z-index": "-7", "top": (dimensions.width >= 1280 ? "1000px" : (dimensions.width >= 768 ? "600px" : (dimensions.width >= 335 ? "500px" : "600px"))),
        "backgroundImage": "linear-gradient(to bottom, rgba(113, 9, 232, 0.5) 0%, rgba(242, 41, 91, 0.5) 120%)", "backgroundRepeat": "no-repeat", "backgroundSize": "cover"
        , margin: '0 auto', width: '100%', height: (dimensions.width >= 1280 ? "1200px" : (dimensions.width >= 1024 ? "950px" : (dimensions.width >= 768 ? "600px" : "510px"))), backgroundPosition: "center center"
      }} />

      <div className={"absolute"} style={{
        "z-index": "-8", "top": (dimensions.width >= 1280 ? "1000px" : (dimensions.width >= 768 ? "600px" : (dimensions.width >= 335 ? "500px" : "600px"))),
        "backgroundImage": `url(${middleBannerURL})`, "backgroundRepeat": "no-repeat", "backgroundSize": "cover"
        , margin: '0 auto', width: '100%', height: (dimensions.width >= 1280 ? "1200px" : (dimensions.width >= 1024 ? "950px" : (dimensions.width >= 768 ? "600px" : "510px"))), backgroundPosition: "center center"
      }} />

      <div className={"absolute"} style={{
        "z-index": "-9", "top": "-100px",
        "backgroundImage": "linear-gradient(to bottom, rgba(0, 203, 221, 0.6) 0%, rgba(165, 28, 28, 0.65) 90%)", "backgroundRepeat": "no-repeat", "backgroundSize": "cover"
        , margin: '0 auto', width: '100%', height: (dimensions.width >= 1280 ? "1200px" : (dimensions.width >= 1024 ? "950px" : (dimensions.width >= 768 ? "600px" : "510px"))), backgroundPosition: "center center"
      }} />

      {!mobile() ? <div className="absolute top-0" style={{ "z-index": "-10" }}>
        <iframe
          title="Youtube Video"
          width={dimensions.width - 17}
          height={9 * (dimensions.width / 16)}
          src={`https://www.youtube-nocookie.com/embed/${images.home.yt_video}?autoplay=1&loop=1&playlist=${images.home.yt_video}&version=3&disablekb=1&mute=1&controls=0&start=21&end=197`}
          frameborder="0">
        </iframe>
      </div> : <></>}

      <div className={"absolute"} style={{
        "z-index": "-11", "top": "-100px",
        "backgroundImage": `url(${topBannerURL})`, "backgroundRepeat": "no-repeat", "backgroundSize": "cover"
        , margin: '0 auto', width: '100%', height: (dimensions.width >= 1280 ? "1200px" : (dimensions.width >= 1024 ? "950px" : (dimensions.width >= 768 ? "600px" : "510px"))), backgroundPosition: "center center"
      }} />
    </div>
  );

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
