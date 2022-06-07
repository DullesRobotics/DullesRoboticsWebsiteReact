import React from 'react'
import Spacer from '../components/spacer'
import SectionDivider from '../components/sectiondivider'
import Particles from "react-tsparticles";
import mobile from "is-mobile"
import SponsorTiersJSON from '../lang/sponsorship_tiers.json'
import ServerImage from '../components/serverimage'
import { Redirect } from "react-router-dom";

function Sponsors(props) {
  const bundle = [];
  const tLFinalized = SponsorTiersJSON.reverse()

  for (let i in tLFinalized) {
    if (tLFinalized[i].sponsors.length > 0) {
      const inception = [];
      for (let j in tLFinalized[i].sponsors) {
        const sponsor = tLFinalized[i].sponsors[j];
        inception.push(
          <div className="row-span-1 md:grid md:grid-cols-2 my-10">
            <div className="md:col-span-1">
              <a href={sponsor.website} target="_blank" rel="noopener noreferrer">
                <ServerImage className={`mx-auto ${sponsor.image_properties}`} style={{ width: sponsor.big_image_width }} file={sponsor.image_url} alt={sponsor.name + " Logo"} />
              </a>
            </div>
            <div className="mt-10 md:mt-0 md:col-span-1 ml-4">
              <a href={sponsor.website} target="_blank" rel="noopener noreferrer">
                <p className="text-4xl md:text-5xl leading-10">
                  {sponsor.name}
                </p>
              </a>
              <p className="font-normal text-lg my-5">{sponsor.description}</p>
            </div>
          </div>
        );
      }

      bundle.push(
        <div>
          <p className="ml-2 text-4xl md:text-5xl">{tLFinalized[i].name} <i className={`text-2xl ml-3 fas fa-${tLFinalized[i].icon}`} /></p>
          {tLFinalized[i].opacity_percent !== 0 ? <Particles
            id={i}
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
                  value: tLFinalized[i].opacity_percent,
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
                  particles: { color: tLFinalized[i].color },
                  rate: { quantity: 1, delay: mobile() ? tLFinalized[i].particle_delay_period * 6 : tLFinalized[i].particle_delay_period },
                  size: { width: 100, height: 10 },
                  position: { x: 50, y: 100 }
                },
                {
                  direction: "top",
                  particles: { color: tLFinalized[i].color },
                  rate: { quantity: 1, delay: mobile() ? 0.5 : 0.1 },
                  size: { width: 100, height: 10 },
                  position: { x: 50, y: 100 }
                }
              ]
            }} /> : <></>}
          <hr style={{ borderTopWidth: "1px" }} />
          <div className={`grid grid-rows-${tLFinalized[i].sponsors.length}`}>
            {inception}
          </div>
        </div>
      );
    }
  }

  //if bundle is null redirect to support page
  if (bundle.length === 0) {
    return <Redirect to="/support" />
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
      <div className="bg-gray-2" style={{ 'min-height': bundle.length < 2 ? '35vh' : '20vh' }}></div>
    </div>
  );
}

export default Sponsors;