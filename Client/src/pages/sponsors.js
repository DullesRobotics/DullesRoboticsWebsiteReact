import React from 'react'
import Spacer from '../components/spacer'
import Button from '../components/button'
import SectionDivider from '../components/sectiondivider'
import Particles from "react-tsparticles";
import mobile from "is-mobile"

const tierList = [
  {
    name: "Diamond Sponsors",
    icon: "gem",
    particleColor: "#18f3f7",
    particleOpacity: 0.8,
    particleRate: 0.08,
    sponsors: [
      {
        name: "Waste Management",
        description: "Our title sponsor, WM, is our biggest supporter and strives to make us the best we could possibly be by providing mentors and financial assistance. " +
          "WM works supports younger generations and helps our team members get the education needed beyond school life. " +
          "With the gracious support of WM, Team 7494 has been and will be able to reach new heights and continue to succeed.",
        image_url: "%public%/media/wm.png",
        image_width: "25rem",
        website: "https://www.wm.com"
      }
    ]
  },
  {
    name: "Gold Sponsors",
    icon: "medal",
    particleColor: "#eadb04",
    particleOpacity: 0.7,
    particleRate: 0.2,
    sponsors: []
  },
  {
    name: "Silver Sponsors",
    icon: "heart",
    particleColor: "#9aa4a5",
    particleOpacity: 0.7,
    particleRate: 0.3,
    sponsors: []
  },
  {
    name: "Grants",
    icon: "thumbs-up",
    particleColor: "#fc20f5",
    particleOpacity: 0.8,
    particleRate: 0.3,
    sponsors: [
      {
        name: "NASA",
        description: "NASA and their yearly grants have allowed us to continue to pay for registration and participate in FRC. Their continued support through grants is greatly appreciated.",
        image_url: "%public%/media/nasa.png",
        image_width: "18rem",
        website: "https://www.nasa.gov"
      }
    ]
  },
  {
    name: "Bronze Sponsors",
    icon: "sun",
    particleColor: "#cc6e16",
    particleOpacity: 0.6,
    particleRate: 0.3,
    sponsors: []
  },
  {
    name: "Primary Sponsors",
    icon: "star",
    particleColor: "#a08872",
    particleOpacity: 0.8,
    particleRate: 0.35,
    sponsors: [
      {
        name: "TMiller Financial",
        description: "TMiller Financial engages with Business Owners, Professionals, Retirees and Pre-Retirees, and their families to help provide positive financial outcomes. We are thankful for their gracious support.",
        image_url: "%public%/media/tmiller.png",
        image_width: "20rem",
        website: "https://www.tmillerfinancial.com/"
      }
    ]
  },

]

function Sponsors(props) {
  const bundle = [];

  for (let i in tierList) {
    if (tierList[i].sponsors.length > 0) {
      const inception = [];
      for (let j in tierList[i].sponsors) {
        inception.push(
          <div className="row-span-1 md:grid md:grid-cols-2 my-10">
            <div className="md:col-span-1">
              <a href={tierList[i].sponsors[j].website} target="_blank" rel="noopener noreferrer">
                <img className="mx-auto" style={{ width: tierList[i].sponsors[j].image_width }} src={tierList[i].sponsors[j].image_url.replace("%public%", process.env.PUBLIC_URL)} alt={tierList[i].sponsors[j].name + " Logo"} />
              </a>
            </div>
            <div className="mt-10 md:mt-0 md:col-span-1 ml-4">
              <a href={tierList[i].sponsors[j].website} target="_blank" rel="noopener noreferrer">
                <p className="text-4xl md:text-5xl leading-10">
                  {tierList[i].sponsors[j].name}
                </p>
              </a>
              <p className="font-normal text-lg my-5">{tierList[i].sponsors[j].description}</p>
            </div>
          </div>
        );
      }

      bundle.push(
        <div>
          <p className="ml-2 text-4xl md:text-5xl">{tierList[i].name} <i className={`text-2xl ml-3 fas fa-${tierList[i].icon}`} /></p>
          <Particles
            className="h-10"
            canvasClassName="rounded-b-md"
            options={{
              fpsLimit: 60,
              particles: {
                number: {
                  value: 0,
                  density: { enable: true, value_area: 800 }
                },
                color: { value: "#eadb04" },
                shape: { type: "circle" },
                opacity: {
                  value: tierList[i].particleOpacity,
                  random: false,
                  animation: { enable: true, speed: 0.4, minimumValue: 0, sync: false }
                },
                size: {
                  value: 1,
                  random: { enable: true, minimumValue: 3 },
                  animation: { enable: false, speed: 20, minimumValue: 1, sync: false }
                },
                move: {
                  enable: true,
                  gravity: { enable: true, acceleration: 0.5 },
                  speed: 1,
                  direction: "top",
                  random: false,
                  straight: false,
                  outModes: { default: "destroy", bottom: "destroy" },
                  attract: {
                    enable: true, distance: 300, rotate: { x: 600, y: 1200 }
                  }
                }
              },
              interactivity: { detectsOn: "canvas", events: { resize: true } },
              detectRetina: true,
              background: { color: "#767676" },
              emitters: [
                {
                  direction: "top",
                  particles: { color: tierList[i].particleColor },
                  rate: { quantity: 1, delay: mobile() ? tierList[i].particleRate * 6 : tierList[i].particleRate },
                  size: { width: 100, height: 10 },
                  position: { x: 50, y: 100 }
                },
                {
                  direction: "top",
                  particles: { color: tierList[i].particleColor },
                  rate: { quantity: 1, delay: mobile() ? 0.5 : 0.1 },
                  size: { width: 100, height: 10 },
                  position: { x: 50, y: 100 }
                }
              ]
            }} />
          <hr style={{ borderTopWidth: "1px" }} />
          <div className={`grid grid-rows-${tierList[i].sponsors.length}`}>
            {inception}
          </div>
        </div>
      );
    }
  }

  return (
    <div>
      <Spacer className="bg-gray-1" />
      <div className="pt-6 pb-5 md:grid md:grid-cols-4 bg-gray-4">
        <div className="col-span-1" />
        <p className="col-span-2 text-center text-white text-5xl md:text-6xl font-bold">Our Sponsors</p>
        <div className="col-span-1" />
      </div>
      <SectionDivider divider="skew-tri" color1="4" color2="2" height="30px" />
      <div className="pt-4 pb-5 md:grid md:grid-cols-6 lg:grid-cols-5 bg-gray-2">
        <div className="col-span-1" />
        <div className={`col-span-4 lg:col-span-3 text-left text-white font-bold mx-3`}>
          {bundle}
          <div />
        </div>
        <div className="col-span-1" />
      </div>
      <div className="bg-gray-2" style={{ 'min-height': '20vh' }}></div>
    </div>
  );
}

export default Sponsors;