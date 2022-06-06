import React, { useState } from 'react'
import Spacer from '../components/spacer'
import SectionDivider from '../components/sectiondivider'
import Button from '../components/button'
import NewsFeed from "../components/newsfeed"
import LoadingIcon from '../components/lottiecomponents/loading'
import { Timeline } from 'react-twitter-widgets'
import TBAFeed from '../components/tba/feed'
import Loading from '../components/lottiecomponents/loading'
import { useSelector, useDispatch } from 'react-redux'
import Text from '../components/text'
import lang from '../lang/lang.json'

export default function Announcements(props) {

  const [feed, setFeed] = useState(0)

  return (
    <div>
      <Spacer className="bg-gray-1" />
      <div className="pt-6 md:pt-10 pb-5 md:grid md:grid-cols-6 xl:grid-cols-5 bg-gray-1">
        <div className="col-span-1" />
        <p className="md:col-span-4 xl:col-span-3 text-center md:text-left text-white text-4xl sm:text-5xl font-bold mx-5 leading-10">
          <Text>{lang.news.title}</Text>
        </p>
        <div className="col-span-1" />
      </div>
      <SectionDivider className="h-2 md:h-5 lg:h-8" divider="skew-cc" color1={1} color2={5} />
      <div className="pt-4 pb-3 md:grid md:grid-cols-6 xl:grid-cols-5 bg-gray-5">
        <div className="col-span-1"></div>
        <div className="md:col-span-4 xl:col-span-3 text-white">
          <TBAFeed courtesy />
        </div>
        <div className="col-span-1" />
      </div>
      <SectionDivider className="h-2 md:h-5 lg:h-8 " divider="skew-cc" color1={5} color2={3} />
      <div className="pt-4 pb-5 md:grid md:grid-cols-12 xl:grid-cols-6 bg-gray-3">
        <div className="col-span-1" />
        <div className="md:col-span-6 xl:col-span-3 text-white pr-2 md:pr-4 md:pl-0">
          <p className="md:hidden text-white text-4xl font-bold text-center">
            <Text>{lang.news.recent_news}</Text></p>
          <NewsFeed allowMore={true} />
        </div>
        <div className="mx-5 md:mx-0 pt-2 col-span-4 xl:col-span-1 text-white">
          <p className="text-2xl font-semibold">
            <Text>{lang.news.social_feed}</Text>
          </p>
          <div className="grid grid-cols-3 mb-4 text-center text-xl">
            <button onClick={() => setFeed(0)} className="focus:outline-none">
              <div className={`rounded-l-lg col-span-1 border-2 border-white transition-colors duration-100 hover:bg-blue-2 py-1 border-opacity-${feed === 0 ? "100 bg-blue-2" : "0 bg-blue-3"}`}>
                <i className="fab fa-twitter mt-2" />
              </div>
            </button>
            <button onClick={() => setFeed(2)} className="focus:outline-none">
              <div className={`col-span-1 border-2 border-white py-1 transition-colors duration-100 hover:bg-blue-700 border-opacity-${feed === 2 ? "100 bg-blue-700" : "0 bg-blue-600"}`}>
                <i className="fab fa-facebook mt-2" />
              </div>
            </button>
            <button onClick={() => setFeed(1)} className="focus:outline-none">
              <div className={`col-span-1 py-1 rounded-r-lg border-2 border-white transition-colors duration-100 hover:bg-purple-600 border-opacity-${feed === 1 ? "100 bg-purple-600" : "0 bg-purple-500"}`}>
                <i className="fab fa-instagram mt-2" />
              </div>
            </button>
          </div>
          <div className="flex justify-center">
            {feed === 0 ?
              <Timeline
                dataSource={{
                  sourceType: 'profile',
                  screenName: 'dulles_robotics'
                }}
                options={{
                  height: '800',
                  theme: 'dark',
                  dnt: true,
                  chrome: "nofooter",
                }}
                renderError={_err =>
                  <div>
                    <LoadingIcon />
                    <p className="text-gray-300 text-center">
                      <Text>{lang.news.cant_load_twitter}</Text>
                    </p>
                    <div className="mb-48"></div>
                  </div>
                }
              /> : <></>}
            {feed === 1 ?
              <a href='https://www.instagram.com/dulles_robotics/' target="_blank" rel="noopener noreferrer" className='mx-auto'>
                <Button bstyle="primary">Visit Our Instagram Here</Button>
              </a>
              : <></>}
            {feed === 2 ?
              <iframe
                title="Dulles Robotics' Facebook Feed (@dullesrobotics)"
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fdullesrobotics&tabs=timeline&height=800&width=320&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                height="800"
                width="320"
                className="overflow-hidden border-none"
                scrolling="no"
                frameBorder="1"
                allowFullScreen="false"
                allow="encrypted-media; web-share">
              </iframe> : <></>}
          </div>
        </div>
        <div className="col-span-1" />
      </div>
      <div className="bg-gray-3" style={{ 'min-height': '20vh' }}></div>
    </div >
  );

}
