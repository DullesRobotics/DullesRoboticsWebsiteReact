import React, { useState } from 'react'
import Spacer from '../components/spacer'
import Button from '../components/button'
import SectionDivider from '../components/sectiondivider'
import Text from '../components/text'
import lang from '../lang/lang.json'
import ServerImage from '../components/serverimage'
import images from '../lang/images.json'

import { useSelector, useDispatch } from 'react-redux'
import {
  loadMediaFile,
  selectMedia
} from '../slices/mediaSlice'

export default function AboutFirst(props) {

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth
  })

  React.useEffect(() => {
    function handleResize() {
      setDimensions({
        width: window.innerWidth
      })
    }
    window.addEventListener('resize', handleResize)
    return _ => window.removeEventListener('resize', handleResize)
  })

  const dispatch = useDispatch();
  const blobs = useSelector(selectMedia);
  let url

  if (blobs.cached.has(images.about_first.banner))
    url = blobs.cached.get(images.about_first.banner)
  else
    dispatch(loadMediaFile(images.about_first.banner))

  return (
    <div>
      <div className="z-10">
        <div className="pt-24 lg:pt-64 pb-16 lg:pb-48">
          <div className="lg:my-24 md:col-span-3 lg:col-span-2 lg:grid lg:grid-cols-2">
            <div className="col-span-1 mr-3">
              <p className="text-center lg:text-right text-white text-6xl lg:text-7xl font-bold">
                <Text>{lang.about_first.title_before_first}</Text>
              </p>
            </div>
            <div className="lg:flex col-span-1 lg:mt-4 md:mb-3 lg:mr-48 xl:mr-64 md:ml-3">
              <ServerImage className="mx-auto lg:mx-0" file={images.about_first.logo} alt="FIRST" />
            </div>
          </div>
        </div>
        <SectionDivider divider="skew-invtri" color1={100} color2={3} height="40px" />
        <div className="bg-gray-3 text-white md:grid md:grid-cols-6 lg:grid-cols-5">
          <div className="col-span-1" />
          <div className="col-span-4 mx-5 md:mx-0 lg:col-span-3">
            <p className="pt-4 mb-2 font-bold text-5xl">
              <Text>{lang.about_first.introduction.title}</Text>
            </p>
            <p className="text-lg">
              <Text>{lang.about_first.introduction.content}</Text>
            </p>
            <p className="mt-6 mb-2 font-bold text-5xl">
              <Text>{lang.about_first.mission.title}</Text>
            </p>
            <p className="text-lg">
              <Text>{lang.about_first.mission.content}</Text>
            </p>
            <div className="py-8 flex sm:block">
              <a className="mx-auto sm:mx-0" href="https://www.firstinspires.org/about/vision-and-mission" target="_blank" rel="noopener noreferrer">
                <Button bstyle="primary" animate><p className="m-1">{lang.about_first.learn_more_button} <i><strong>First</strong></i><i className="ml-2 fas fa-external-link-square-alt" /></p></Button>
              </a>
            </div>
          </div>
          <div className="col-span-1" />
        </div>
        <SectionDivider divider="skew-invtri" color1={3} color2={2} height="40px" />
        <div className="bg-gray-2 text-white md:grid md:grid-cols-6">
          <div className="col-span-1" />
          <div className="col-span-4 md:grid md:grid-cols-2 pb-16 md:pb-0">
            <div className="col-span-1 p-5 xl:m-10">
              <ServerImage className="mx-auto w-2/3" file={images.about_first.ftc} alt="FTC Logo" />
              <p className="mt-6 mb-2 font-bold text-3xl">
                <Text>{lang.about_first.ftc.title}</Text>
              </p>
              <p className="text-lg">
                <Text>{lang.about_first.ftc.content}</Text>
              </p>
              <div className="xl:grid xl:grid-cols-2 pt-4">
                <div className="xl:col-span-1 flex xl:mr-1 mb-2 xl:mb-0">
                  <a className="mx-auto xl:mr-0 xl:ml-auto" href="https://www.firstinspires.org/robotics/ftc" target="_blank" rel="noopener noreferrer">
                    <Button bstyle="primary" animate>
                      <p className=" xl:m-1">
                        {lang.about_first.ftc.learn_more}
                        <i className="ml-2 fas fa-external-link-square-alt" />
                      </p>
                    </Button>
                  </a>
                </div>
                <div className="xl:col-span-1 flex xl:ml-1">
                  <a className="mx-auto xl:mx-0" href="https://www.firstinspires.org/robotics/ftc/game-and-season" target="_blank" rel="noopener noreferrer">
                    <Button bstyle="primary" animate>
                      <p className="m-0 xl:m-1">
                        {lang.about_first.ftc.this_year}
                        <i className="ml-2 fas fa-external-link-square-alt" />
                      </p>
                    </Button>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-span-1 p-5 xl:m-10">
              <ServerImage className="pb-2 mx-auto w-2/3" file={images.about_first.frc} alt="FRC Logo" />
              <p className="mt-6 mb-2 font-bold text-3xl">
                <Text>{lang.about_first.frc.title}</Text>
              </p>
              <p className="text-lg">
                <Text>{lang.about_first.frc.content}</Text>
              </p>
              <div className="xl:grid xl:grid-cols-2 pt-4">
                <div className="xl:col-span-1 flex xl:mr-1 mb-2 xl:mb-0">
                  <a className="mx-auto xl:mr-0 xl:ml-auto" href="https://www.firstinspires.org/robotics/frc" target="_blank" rel="noopener noreferrer">
                    <Button bstyle="primary" animate>
                      <p className=" xl:m-1">
                        {lang.about_first.frc.learn_more}
                        <i className="ml-2 fas fa-external-link-square-alt" />
                      </p>
                    </Button>
                  </a>
                </div>
                <div className="xl:col-span-1 flex xl:ml-1">
                  <a className="mx-auto xl:mx-0" href="https://www.firstinspires.org/robotics/frc/game-and-season" target="_blank" rel="noopener noreferrer">
                    <Button bstyle="primary" animate>
                      <p className="m-0 xl:m-1">{lang.about_first.frc.this_year}
                        <i className="ml-2 fas fa-external-link-square-alt" />
                      </p>
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1" />
        </div>
        <SectionDivider divider="skew-invtri" color1={2} color2={3} height="40px" />
        <div className="bg-gray-3 text-white md:grid md:grid-cols-6">
          <div className="col-span-1" />
          <div className="col-span-4 pb-16">
            <p className="pt-6 mb-2 font-bold text-center text-5xl">
              <Text>{lang.about_first.firsts_values.title}</Text>
            </p>
            <div className="md:grid grid-cols-2">
              <div className="col-span-1 mx-6 md:mx-0 md:mr-6">
                <p className="mt-6 mb-2 text-center font-bold text-3xl">
                  <Text>{lang.about_first.firsts_values.gracious_professionalism.title}</Text>
                </p>
                <p className="text-lg text-center">
                  <Text>{lang.about_first.firsts_values.gracious_professionalism.content}</Text>
                </p>
              </div>
              <div className="col-span-1 mx-6 md:mx-0 md:ml-6">
                <p className="mt-6 mb-2 text-center font-bold text-3xl">
                  <Text>{lang.about_first.firsts_values.coopertition.title}</Text>
                </p>
                <p className="text-lg text-center">
                  <Text>{lang.about_first.firsts_values.coopertition.content}</Text>
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-1" />
        </div>
      </div>
      <div className={"absolute"} style={{
        "z-index": "-9", "top": "-100px",
        "backgroundImage": "linear-gradient(to bottom, rgba(36, 229, 155, 0.6) 0%, rgba(36, 149, 229, 0.65) 90%)", "backgroundRepeat": "no-repeat", "backgroundSize": "cover"
        , margin: '0 auto', width: '100%', height: (dimensions.width >= 1280 ? "1200px" : (dimensions.width >= 1024 ? "950px" : (dimensions.width >= 768 ? "600px" : "510px"))), backgroundPosition: "center center"
      }} />

      <div className={"absolute"} style={{
        "z-index": "-11", "top": "-100px",
        "backgroundImage": `url(${url})`, "backgroundRepeat": "no-repeat", "backgroundSize": "cover"
        , margin: '0 auto', width: '100%', height: (dimensions.width >= 1280 ? "1200px" : (dimensions.width >= 1024 ? "950px" : (dimensions.width >= 768 ? "600px" : "510px"))), backgroundPosition: "center center"
      }} />
    </div>
  );
}