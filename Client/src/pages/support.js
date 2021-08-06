import React from 'react'
import Spacer from '../components/spacer'
import Button from '../components/button'
import SectionDivider from '../components/sectiondivider'
import hoverCSS from '../styles/hover.module.css'
import Particles from "react-tsparticles";
import mobile from "is-mobile"
import Text from '../components/text'
import lang from '../lang/lang.json'
import SponsorshipTiersJSON from '../lang/sponsorship_tiers.json'
import ServerImage from '../components/serverimage'

class Support extends React.Component {
  render() {
    return (
      <div>
        <Spacer className="bg-gray-4" />
        <div className="pt-6 pb-5 bg-gray-4">
          <p className="text-center text-white text-4xl md:text-5xl font-bold -mb-1 mx-3 md:mx-0">
            <Text>{lang.support.title}</Text>
          </p>
        </div>
        <SectionDivider divider="skew-tri" color1="4" color2="3" height="30px" />
        <div className="pt-8 pb-8 md:pb-6 md:grid md:grid-cols-6 lg:grid-cols-4 bg-gray-3 md:-mb-2">
          <div className="col-span-1" />
          <div className="col-span-4 lg:col-span-2 text-white mx-3 md:mx-0">
            <p className="text-center font-semibold text-xl">
              <Text>{lang.support.description}</Text>
            </p>
          </div>
          <div className="col-span-1" />
        </div>
        <SectionDivider divider="skew-tri" color1="3" color2="2" height="30px" />
        <div className="pt-6 pb-6 lg:grid lg:grid-cols-7 bg-gray-2">
          <div className="col-span-1" />
          <div className={`lg:col-span-5 text-white md:mx-5 lg:mx-0`}>
            <p className="text-left text-white text-3xl md:text-4xl font-bold ml-10 md:ml-0">
              <Text>{lang.support.sponsorship_tiers_header}</Text>
            </p>
            <hr className="border-gray-400 hidden md:block" />
            <div className="md:grid md:grid-cols-5 mt-3 min-h-0">
              <div className="col-span-1 my-5 md:my-0 mx-10 md:mx-0 md:mr-3"><SponsorBobble tier={0} /></div>
              <div className="col-span-1 my-5 md:my-0 mx-10 md:mx-0 md:mr-3"><SponsorBobble tier={1} /></div>
              <div className="col-span-1 my-5 md:my-0 mx-10 md:mx-0 md:mr-3"><SponsorBobble tier={2} /></div>
              <div className="col-span-1 my-5 md:my-0 mx-10 md:mx-0 md:mr-3"><SponsorBobble tier={3} /></div>
              <div className="col-span-1 my-5 md:my-0 mx-10 md:mx-0 md:mr-3"><SponsorBobble tier={4} /></div>
            </div>
            <div className="mt-12 md:mt-24">
              <div className="flex">
                <a className="mx-auto" href={lang.documents.url + lang.support.packet_file_name} target="_blank" rel="noopener noreferrer">
                  <Button className="shadow-md border-2 hover:border-green-500" bstyle="primaryGreen" animate={1}>
                    <div className="my-1">
                      {lang.support.packet_button}
                      <i class="fas fa-file-pdf ml-2 mt-1" />
                    </div>
                  </Button>
                </a>
              </div>
              <div className="mt-4 flex">
                <a className="mx-auto" href={`mailto:${lang.support.email}`} target="_blank" rel="noopener noreferrer">
                  <Button className="shadow-lg border-4 hover:border-green-500" bstyle="primaryGreen" animate={1}>
                    <div className="mx-6 my-3 font-bold text-2xl">
                      {lang.support.sponsor_button}
                      <i class="fas fa-envelope ml-2 mt-1" /></div>
                  </Button>
                </a>
              </div>
            </div>
          </div>
          <div className="col-span-1" />
        </div>
        <div className="bg-gray-2" style={{ 'min-height': '5vh' }}></div>
        <SectionDivider divider="skew-tri" color1="2" color2="3" height="40px" />
        <div className="pt-6 pb-8 md:grid md:grid-cols-6 lg:grid-cols-4 bg-gray-3">
          <div className="col-span-1" />
          <div className="col-span-4 lg:col-span-2 text-white mx-3 md:mx-0">
            <p className="text-center font-bold text-4xl">
              <Text>{lang.support.legal.title}</Text>
            </p>
            <p className="text-center text-lg mt-3">
              <Text>{lang.support.legal.content}</Text>
            </p>
          </div>
          <div className="col-span-1" />
        </div>
      </div>
    );
  }
}

class SponsorBobble extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth
    }
  }

  updateDimensions = () => {
    this.setState({ width: window.innerWidth });
  };
  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  render() {
    const tier = this.props.tier;
    const validTiers = SponsorshipTiersJSON.filter((m) => !m.hidden)
    let name = validTiers[tier].name,
      price = "$" + validTiers[tier].min_cost + "+",
      details = validTiers[tier].benefits,
      list = [],
      img = validTiers[tier].img,
      particleColor = validTiers[tier].color,
      particleRate = validTiers[tier].particle_delay_period,
      particleOpacity = validTiers[tier].opacity_percent;

    for (let i in details)
      list.push(<li key={i}>{details[i]}</li>)

    return (
      <div className={"bg-gray-5 shadow-xl rounded-md " + hoverCSS.hvrfloat} style={{ height: "118%" }}>
        <div className="pt-2 pr-2 pl-3">
          <div className="flex my-4"><ServerImage className="mx-auto" file={img} alt={name + " Tier Icon"} /></div>
          <p className="text-2xl text-white text-left font-bold" >{name}</p>
          <p className="text-xl text-white text-left font-semibold" >{price}</p>
          <supportbobble>
            <ul className="ml-5 text-lg md:text-md">
              {list}
            </ul>
          </supportbobble>
        </div>
        <div className="md:absolute md:bottom-0 w-full">
          <Particles
            id={this.props.tier}
            className="h-16"
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
                  value: particleOpacity,
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
              background: { color: "#424445" },
              emitters: [
                {
                  direction: "top",
                  particles: { color: particleColor },
                  rate: { quantity: 1, delay: mobile() ? particleRate * 6 : particleRate },
                  size: { width: 200, height: 10 },
                  position: { x: 50, y: 100 }
                },
                {
                  direction: "top",
                  particles: { color: particleColor },
                  rate: { quantity: 1, delay: mobile() ? 0.5 : 0.1 },
                  size: { width: 200, height: 10 },
                  position: { x: 50, y: 100 }
                }
              ]
            }} />
        </div>
      </div>
    );
  }
}

export default Support;