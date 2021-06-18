import React, { useState } from 'react'
import SectionDivider from '../../components/sectiondivider'
import Button from '../../components/button'
import RoboBlockCSS from './robots.module.css'
import RobotsJSON from '../../lang/robots.json'
import Popup from 'reactjs-popup'
import './modal.css'
import mobile from 'is-mobile'
import ReactMarkdown from 'react-markdown/with-html'
import gfm from 'remark-gfm'
import '../../styles/posts.module.css'
import Text from '../../components/text'
import lang from '../../lang/lang.json'
import { useSelector, useDispatch } from 'react-redux'
import {
  loadMediaFile,
  selectMedia
} from '../../slices/mediaSlice'
import images from '../../lang/images.json'

export default function Robots(props) {

  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth
  })

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
  let url

  if (blobs.cached.has(images.robot_page.banner))
    url = blobs.cached.get(images.robot_page.banner)
  else
    dispatch(loadMediaFile(images.robot_page.banner))

  return (
    <div>
      <div className="z-20">
        <div className="pt-20 sm:pt-32 lg:pt-48 xl:pt-64" style={{ "text-shadow": "4px 4px 0px rgba(0,0,0,0.4)" }}>
          <p className="pt-5 text-white font-bold mx-auto text-center text-5xl md:text-6xl lg:text-7xl">
            <Text>{lang.robots.title}</Text>
          </p>
        </div>
        <div>
          <div className="bg-gray-4 pt-5 mt-20 lg:mt-32 xl:mt-64">
            <div className="text-center text-white -mb-4">
              <BlockHandler />
            </div>
          </div>
        </div>
      </div>
      {/* Background elements, in order from front to back */}
      <div className={"absolute"} style={{
        "z-index": "-9", "top": "-100px",
        "backgroundImage": "linear-gradient(to bottom, rgba(0, 203, 221, 0.6) 0%, rgba(165, 28, 28, 0.65) 90%)", "backgroundRepeat": "no-repeat", "backgroundSize": "cover"
        , margin: '0 auto', width: '100%', height: (dimensions.width >= 1280 ? "1200px" : (dimensions.width >= 1024 ? "950px" : (dimensions.width >= 768 ? "600px" : "510px"))), backgroundPosition: "center center"
      }} />

      {/* {!mobile() ? <div className="absolute top-0" style={{ "z-index": "-10" }}>
          <iframe title="Youtube Video" width={dimensions.width - 17} height={9 * (dimensions.width / 16)} src="https://www.youtube-nocookie.com/embed/7w0nCwESmtc?autoplay=1&loop=1&playlist=7w0nCwESmtc&version=3&disablekb=1&mute=1&controls=0&start=21&end=197" frameborder="0"></iframe>
        </div> : <></>} */}

      <div className={"absolute"} style={{
        "z-index": "-11", "top": "-100px",
        "backgroundImage": `url(${url})`, "backgroundRepeat": "no-repeat", "backgroundSize": "cover"
        , margin: '0 auto', width: '100%', height: (dimensions.width >= 1280 ? "1200px" : (dimensions.width >= 1024 ? "950px" : (dimensions.width >= 768 ? "600px" : "510px"))), backgroundPosition: "center center"
      }} />
    </div>
  );

}

/**
 * @returns A list of rows containing two robots' HTML each, in order.
 */
export function BlockHandler() {
  let blockRowList = []
  for (let i = 0; i < RobotsJSON.length / 2; i++) {
    const index = i * 2
    const block1 = RobotsJSON[index] ? <RoboBlock json={RobotsJSON[index]} /> : null
    const block2 = RobotsJSON[index + 1] ? <RoboBlock json={RobotsJSON[index + 1]} /> : <i class="text-5xl text-gray-1 fas fa-robot hidden md:block md:mt-56 md:-mb-4" />
    blockRowList.push(
      <div className="md:grid md:grid-cols-2 mb-4">
        <div className="md:col-span-1 md:mr-2 md:ml-4 mb-4 md:mb-0">
          {block1}
        </div>
        <div className="md:col-span-1 md:ml-2 md:mr-4">
          {block2}
        </div>
      </div>
    )
  }
  return blockRowList
}

export function RoboBlock(props) {

  let modalSpecs = "", modalComps = "", modalFeatures = "";
  for (let i in props.json.specs)
    modalSpecs += `\n - **${i.replace(/^\w/, c => c.toUpperCase())}**: ${props.json.specs[i]} `
  for (let i in props.json.competitions) {
    const name = props.json.competitions[i].name, detail = props.json.competitions[i].detail;
    modalComps += `\n - **${name.replace(/^\w/, c => c.toUpperCase())}**${detail ? ": " + detail : ""} `
  }
  for (let i in props.json.features)
    modalFeatures += `\n - ${props.json.features[i]}`

  const dispatch = useDispatch();
  const blobs = useSelector(selectMedia);
  let url

  if (blobs.cached.has(props.json.image))
    url = blobs.cached.get(props.json.image)
  else
    dispatch(loadMediaFile(props.json.image))

  return (
    <div className={RoboBlockCSS["container"]}>
      <section
        className="md:col-span-1"
        style={{
          backgroundImage: `url(${url})`
        }}>
        <div style={{ "backgroundImage": props.json.gradient }}>
          <span className="p-8">
            <p
              className="text-6xl font-bold"
              style={{ "text-shadow": "3px 3px 0px rgba(0,0,0,0.5)" }}>{props.json.name}</p>
            <p
              className="text-3xl text-gray-200 -m-3 font-semibold"
              style={{ "text-shadow": "3px 3px 0px rgba(0,0,0,0.3)" }}>{`${props.json["team-name"]} - ${props.json.year}`}</p>
            <span className="flex justify-center mt-48 md:mt-64 mb-8">
              <Popup
                trigger={
                  <button className="button">
                    <Button bstyle="primaryGreen">
                      <Text>{lang.robots.more_info}</Text>
                    </Button>
                  </button>}
                modal>
                {close => (
                  <div className={`modal ${mobile() ? `` : `animate-modal`}`}>
                    <button className="close bg-gray-200 hover:bg-gray-500" onClick={close}>
                      <i class="far fa-times-circle"></i>
                    </button>
                    <div className="content p-5 md:p-6">
                      <p className="text-lg">
                        <post>
                          <p className="text-3xl md:text-4xl font-bold">{props.json.name}</p>
                          <ReactMarkdown allowDangerousHtml plugins={[gfm]}>
                            {`${props.json.description} 
                                \n - **Season**: ${props.json.year - 1} - ${props.json.year}
                                \n - **Team**: ${props.json.type} Team ${props.json["team-number"]}: ${props.json["team-name"]}
                                \n - **Game**: ${props.json.game}`}
                          </ReactMarkdown>
                          <hr className="my-4 border-gray-3 border-2" />
                          <p className="text-xl md:text-2xl font-bold">
                            <Text>{lang.robots.robot_descriptor_headings.specs}</Text>
                          </p>
                          <div className="max-w-screen-sm">
                            <ReactMarkdown allowDangerousHtml plugins={[gfm]}>
                              {modalSpecs}
                            </ReactMarkdown>
                          </div>
                          <hr className="mt-6 mb-4 border-gray-3 border-2" />
                          <p className="text-xl md:text-2xl font-bold">
                            <Text>{lang.robots.robot_descriptor_headings.competitions}</Text>
                          </p>
                          <div className="max-w-screen-sm">
                            <ReactMarkdown allowDangerousHtml plugins={[gfm]}>
                              {modalComps}
                            </ReactMarkdown>
                          </div>
                          <hr className="mt-6 mb-4 border-gray-3 border-2" />
                          <p className="text-xl md:text-2xl font-bold">
                            <Text>{lang.robots.robot_descriptor_headings.features}</Text>
                          </p>
                          <div className="max-w-screen-sm">
                            <ReactMarkdown allowDangerousHtml plugins={[gfm]}>
                              {modalFeatures}
                            </ReactMarkdown>
                          </div>
                        </post>
                      </p>
                    </div>
                  </div>
                )}
              </Popup>
            </span>
          </span>
        </div>
      </section>
    </div>);
}