import React from 'react'
import Spacer from '../components/spacer'
import Button from '../components/button'
import SectionDivider from '../components/sectiondivider'
import Typewriter from 'typewriter-effect'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Awards from './awards.json'
import ReactMarkdown from 'react-markdown/with-html'
import gfm from 'remark-gfm'
import hoverCSS from '../styles/hover.module.css'
import Text from '../components/text'
import lang from '../lang.json'

class AboutUs extends React.Component {

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
      <div>
        <div className="z-10">
          <div className="pt-32 md:pt-48 lg:pt-64 pb-24 md:pb-32 lg:pb-48">
            <div className="lg:my-24 md:col-span-3 lg:col-span-2">
              <p className="text-center text-white text-5xl lg:text-6xl font-bold">
                <Typewriter
                  options={{
                    strings: lang.about_us.header_ticker,
                    autoStart: true,
                    loop: true,
                  }}
                />
              </p>
            </div>
          </div>
          <SectionDivider divider="skew-invtri" color1={100} color2={2} height="40px" />
          <div id="who-we-are" className="bg-gray-2 text-white pb-4 -mt-2" >
            <p className="text-center font-bold text-5xl md:text-6xl">
              <Text>{lang.about_us.title}</Text>
            </p>
          </div>
          <SectionDivider divider="skew-invtri" color1={2} color2="#E37476" height="40px" />
          <div
            style={{ backgroundImage: "linear-gradient(to bottom, #E37476 0%, #5CA9D0 100%)" }}
            className="text-white text-center md:grid md:grid-cols-6 lg:grid-cols-5">
            <div className="col-span-1" />
            <div className="col-span-4 mx-5 pb-8 md:mx-0 lg:col-span-3 text-white">
              <p className="text-3xl font-bold">
                <Text>{lang.about_us.mission_statement.title}</Text>
              </p>
              <p className="italic text-xl my-4">
                <Text>{lang.about_us.mission_statement.statement}</Text>
              </p>
              <p className="text-xl italic font-bold">
                <Text>{lang.about_us.mission_statement.credit}</Text>
              </p>
            </div>
            <div className="col-span-1" />
          </div>
          <SectionDivider divider="skew-invtri" color1="#5CA9D0" color2={2} height="40px" />
          <div className="bg-gray-2 text-white md:grid md:grid-cols-6 lg:grid-cols-5">
            <div className="col-span-1" />
            <div className="col-span-4 mx-5 md:mx-0 lg:col-span-3">
              <p className="pt-4 mb-2 font-bold text-3xl italic">
                <Text>{lang.about_us.about_the_club.title}</Text>
              </p>
              <p className="text-lg">
                <Text>{lang.about_us.about_the_club.content}</Text>
              </p>
              <p className="pt-10 mb-2 font-bold text-3xl italic">
                <Text>{lang.about_us.community_impact.title}</Text>
              </p>
              <p className="text-lg">
                <Text>{lang.about_us.community_impact.content}</Text></p>
              <p className="py-8 font-bold text-center text-4xl">
                <Text>{lang.about_us.core_values.title}</Text>
              </p>
              <p className="mb-2 font-bold text-3xl italic">
                <Text>{lang.about_us.core_values.gracious_professionalism.title}</Text>
              </p>
              <p className="text-lg">
                <Text>{lang.about_us.core_values.gracious_professionalism.content}</Text>
              </p>
              <p className="pt-10 mb-2 font-bold text-3xl italic">
                <Text>{lang.about_us.core_values.learning.title}</Text>
              </p>
              <p className="text-lg">
                <Text>{lang.about_us.core_values.learning.content}</Text>
              </p>
              <p className="pt-10 mb-2 font-bold text-3xl italic">
                <Text>{lang.about_us.core_values.having_fun.title}</Text>
              </p>
              <p className="text-lg">
                <Text>{lang.about_us.core_values.having_fun.content}</Text>
              </p>
              <div className="xl:grid xl:grid-cols-2 py-8">
                <div className="xl:col-span-1 flex xl:mr-1 mb-2 xl:mb-0">
                  <div className="mx-auto xl:mr-0 xl:ml-auto">
                    <Link to="/about-us/first">
                      <Button bstyle="primary" animate>
                        <p className=" xl:m-1">
                          <Text>{lang.about_us.buttons.about_first}</Text>
                        </p>
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="xl:col-span-1 flex xl:ml-1">
                  <div className="mx-auto xl:mx-0">
                    <Link to="/about-us/alumni">
                      <Button bstyle="primary" animate>
                        <p className="m-0 xl:m-1">
                          <Text>{lang.about_us.buttons.alumni}</Text>
                        </p>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-1" />
          </div>
          <SectionDivider className="h-10 lg:h-15" divider="skew-c" color1={2} color2={4} />
          <div id="teams" className="bg-gray-4 text-white py-3 px-6 sm:px-10 md:px-0">
            <div>
              <p className="text-center font-bold text-5xl md:text-6xl"><Text>{lang.about_us.our_teams.title}</Text></p>
            </div>
            <div className="md:grid md:grid-cols-6 py-4">
              <div className="col-span-1" />
              <div className="col-span-4 md:grid md:grid-cols-4">
                <div className="col-span-1 pb-4">
                  <img className="mx-auto w-1/3 md:w-2/5 pt-4" src={process.env.PUBLIC_URL + "/media/bigred.png"} alt="FTC Logo" />
                </div>
                <div className="col-span-3">
                  <p className="font-bold text-3xl">
                    <i><Text>{lang.about_us.our_teams.big_red.title}</Text></i>
                  </p>
                  <p className="text-lg">
                    <Text>{lang.about_us.our_teams.big_red.content}</Text>
                  </p>
                </div>
              </div>
              <div className="col-span-1" />
            </div>
            <div className="md:grid md:grid-cols-6 py-4">
              <div className="col-span-1" />
              <div className="col-span-4 md:grid md:grid-cols-4">
                <div className="col-span-1 pb-4">
                  <img className="mx-auto w-1/3 md:w-2/5 pt-4" src={process.env.PUBLIC_URL + "/media/viking.png"} alt="FTC Logo" />
                </div>
                <div className="col-span-3">
                  <p className="font-bold text-3xl"><i>
                    <Text>{lang.about_us.our_teams.robovikes.title}</Text></i>
                  </p>
                  <p className="text-lg">
                    <Text>{lang.about_us.our_teams.robovikes.content}</Text>
                  </p>
                </div>
              </div>
              <div className="col-span-1" />
            </div>
            <div className="md:grid md:grid-cols-6 py-4">
              <div className="col-span-1" />
              <div className="col-span-4 md:grid md:grid-cols-4">
                <div className="col-span-1 pb-4">
                  <img className="mx-auto w-1/3 md:w-2/5 pt-4" src={process.env.PUBLIC_URL + "/media/cb.png"} alt="FTC Logo" />
                </div>
                <div className="col-span-3">
                  <p className="font-bold text-3xl">
                    <i><Text>{lang.about_us.our_teams.circuit_bizurkers.title}</Text></i>
                  </p>
                  <p className="text-lg">
                    <Text>{lang.about_us.our_teams.circuit_bizurkers.content}</Text>
                  </p>
                </div>
              </div>
              <div className="col-span-1" />
            </div>
          </div>
          <SectionDivider className="h-10 lg:h-15" divider="skew-c" color1={4} color2={5} />
          <div className="bg-gray-5 text-white lg:grid lg:grid-cols-6" id="departments">
            <div className="col-span-1" />
            <div className="text-center col-span-4 pb-16">
              <p className="font-bold text-5xl md:text-6xl"><Text>{lang.about_us.departments.title}</Text></p>
              <div className="md:grid grid-cols-3 mt-5">
                <div className="col-span-1 mx-5">
                  <img className="rounded-lg mx-auto transform ease-in-out duration-300 scale-100 hover:scale-110" alt="Member Building" src={process.env.PUBLIC_URL + "/media/build.jpg"} />
                  <p className="mt-3 md:mt-6 mb-2 font-bold text-2xl">
                    <Text>{lang.about_us.departments.build.title}</Text>
                  </p>
                  <p><Text>{lang.about_us.departments.build.content}</Text>
                  </p>
                </div>
                <div className="col-span-1 mx-5 mt-10 md:mt-0">
                  <img className="rounded-lg mx-auto transform ease-in-out duration-300 scale-100 hover:scale-110" alt="Member Building" src={process.env.PUBLIC_URL + "/media/programming.png"} />
                  <p className="mt-3 md:mt-6 mb-2 font-bold text-2xl">
                    <Text>{lang.about_us.departments.programming.title}</Text>
                  </p>
                  <p>
                    <Text>{lang.about_us.departments.programming.content}</Text>
                  </p>
                </div>
                <div className="col-span-1 mx-5 mt-10 md:mt-0">
                  <img className="rounded-lg mx-auto transform ease-in-out duration-300 scale-100 hover:scale-110" alt="Member Building" src={process.env.PUBLIC_URL + "/media/design.png"} />
                  <p className="mt-3 md:mt-6 mb-2 font-bold text-2xl">
                    <Text>{lang.about_us.departments.design.title}</Text>
                  </p>
                  <p>
                    <Text>{lang.about_us.departments.design.content}</Text>
                  </p>
                </div>
              </div>
              <div className="md:grid grid-cols-4 mt-10">
                <div style={{ columnWidth: "15%" }} className="col-span-1" />
                <div style={{ columnWidth: "35%" }} className="mx-5 col-span-1" >
                  <img className="rounded-lg mx-auto transform ease-in-out duration-300 scale-100 hover:scale-110" alt="Member Building" src={process.env.PUBLIC_URL + "/media/presentation.jpg"} />
                  <p className="mt-3 md:mt-6 mb-2 font-bold text-2xl">
                    <Text>{lang.about_us.departments.presentation.title}</Text>
                  </p>
                  <p>
                    <Text>{lang.about_us.departments.presentation.content}</Text>
                  </p>
                </div>
                <div style={{ columnWidth: "35%" }} className="mx-5 col-span-1 mt-10 md:mt-0">
                  <img className="rounded-lg mx-auto transform ease-in-out duration-300 scale-100 hover:scale-110" alt="Member Building" src={process.env.PUBLIC_URL + "/media/marketing.png"} />
                  <p className="mt-3 md:mt-6 mb-2 font-bold text-2xl">
                    <Text>{lang.about_us.departments.marketing.title}</Text>
                  </p>
                  <p>
                    <Text>{lang.about_us.departments.marketing.content}</Text>
                  </p>
                </div>
                <div style={{ columnWidth: "15%" }} className="col-span-1" />
              </div>
            </div>
            <div className="col-span-1" />
          </div>
          <SectionDivider className="h-10 lg:h-15" divider="skew-tri" color1={5} color2={1} />
          <div id="awards" className="bg-gray-1 text-white lg:grid lg:grid-cols-5 text-center pb-8">
            <div className="col-span-1" />
            <div className="col-span-4 mx-0 lg:mx-5 lg:col-span-3">
              <p className="font-bold text-5xl md:text-6xl">
                <Text>{lang.about_us.awards.title}</Text>
              </p>
              <AwardChart />
            </div>
            <div className="col-span-1" />
          </div>
          <SectionDivider className="h-10 lg:h-15" divider="skew-tri" color1={1} color2="#6146FF" />
          <div style={{ backgroundImage: "linear-gradient(to bottom, #6146FF 0%, #4054B2 100%)" }}>
            <div className="px-5 pt-6 pb-8 sm:pb-4 lg:pb-8 text-white">
              <div className="grid grid-cols-none lg:grid-cols-6 grid-rows-2 lg:grid-rows-none">
                <div className="lg:col-span-1 hidden lg:block" />
                <div className="lg:col-span-1 row-span-1 block">
                  <span className={"mx-auto lg:mx-0 lg:float-right lg:mr-6 xl:mr-10 w-40 h-40 text-6xl lg:mt-2 flex justify-center items-center bg-blue-5 hover:bg-blue-6 px-4 pt-3 pb-2 rounded-full transition duration-300 " + hoverCSS.hvrfloat}>
                    <p className=""><i className="fas fa-level-up-alt" /></p>
                  </span>
                </div>
                <div className="lg:col-span-3 row-span-1 ml-5 text-left flex items-center">
                  <div className="align-center text-4xl font-bold text-center lg:text-left">
                    <Text>{lang.about_us.awards.advanced_message}</Text>
                  </div>
                </div>
                <div className="lg:col-span-1 hidden lg:block" />
              </div>
            </div>
          </div>
          <SectionDivider className="h-10 lg:h-15" divider="skew-tri" color1="#4054B2" color2={3} />
          <div id="mentors" className="bg-gray-3 text-white lg:grid lg:grid-cols-10">
            <div className="col-span-1" />
            <div className="col-span-8 pb-16">
              <p className="text-center font-bold text-5xl md:text-6xl">
                <Text>{lang.about_us.mentors.title}</Text>
              </p>
              <div className="md:grid grid-cols-4 text-center">
                <div
                  className="col-span-1 mx-5 md:mx-2 bg-gray-4 transition duration-200 hover:bg-gray-5"
                  style={{ boxShadow: "3px 3px rgba(66, 68, 69, 1)" }}>
                  <div className="p-5 m-5 md:m-0">
                    <p className="text-6xl"><i className="fas fa-user-circle" /></p>
                    <p className="text-3xl font-bold -mt-2 tracking leading-8">Brian Sonnier</p>
                    <p className="uppercase text-md font-bold text-blue-3 -mt-1 md:mt-1">Lead Mentor</p>
                    <p className="text-sm mt-2">{"Sonnier has been the club sponsor and lead mentor since the club was founded. " +
                      "His engineering and organizational skills help our club grow and develop member's futures around STEM."}</p>
                  </div>
                </div>
                <div
                  className="col-span-1 mx-5 md:mx-2 bg-gray-4 transition duration-200 hover:bg-gray-5"
                  style={{ boxShadow: "3px 3px rgba(66, 68, 69, 1)" }}>
                  <div className="p-5 m-5 md:m-0">
                    <p className="text-6xl"><i className="fas fa-user-circle" /></p>
                    <p className="text-3xl font-bold -mt-2 tracking leading-8">Justin Maham</p>
                    <p className="uppercase text-md font-bold text-blue-3 -mt-1 md:mt-1">Technical Mentor</p>
                    <p className="text-sm mt-2">{"Since Fall 2019, he has brought his Mechanical Engineering skills " +
                      "and FIRST robotics experience to help us design and build our robot."}</p>
                  </div>
                </div>
                <div
                  className="col-span-1 mx-5 md:mx-2 bg-gray-4 transition duration-200 hover:bg-gray-5"
                  style={{ boxShadow: "3px 3px rgba(66, 68, 69, 1)" }}>
                  <div className="p-5 m-5 md:m-0">
                    <p className="text-6xl"><i className="fas fa-user-circle" /></p>
                    <p className="text-3xl font-bold -mt-2 tracking leading-8">Shagun Ahluwalia</p>
                    <p className="uppercase text-md font-bold text-blue-3 -mt-1 md:mt-1">Non-Technical Mentor</p>
                    <p className="text-sm mt-2">{"She has been volunteering since Fall 2019 and brings her business knowledge " +
                      "and management consulting skills to help members enhance their organizational strategy."}</p>
                  </div>
                </div>
                <div
                  className="col-span-1 mx-5 md:mx-2 bg-gray-4 transition duration-200 hover:bg-gray-5"
                  style={{ boxShadow: "3px 3px rgba(66, 68, 69, 1)" }}>
                  <div className="p-5 m-5 md:m-0">
                    <p className="text-6xl"><i className="fas fa-user-circle" /></p>
                    <p className="text-3xl font-bold -mt-2 tracking leading-8">Mikala Garcia</p>
                    <p className="uppercase text-md font-bold text-blue-3 -mt-1 md:mt-1">WM Mentor</p>
                    <p className="text-sm mt-2">{"As the Talent Branding Coordinator at Waste Management, " +
                      "Ms. Garcia helps our club have the resources we need to develop and build our robots."}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-1" />
          </div>
        </div>
        <div className={"absolute"} style={{
          "z-index": "-9", "top": "-100px",
          "backgroundImage": "linear-gradient(to right, rgba(242, 41, 91, 0.6) 0%, rgba(38, 149, 228, 0.65) 100%)", "backgroundRepeat": "no-repeat", "backgroundSize": "cover"
          , margin: '0 auto', width: '100%', height: (this.state.width >= 1280 ? "1200px" : (this.state.width >= 1024 ? "950px" : (this.state.width >= 768 ? "600px" : "510px"))), backgroundPosition: "center center"
        }} />

        <div className={"absolute"} style={{
          "z-index": "-11", "top": "-100px",
          "backgroundImage": "url(" + process.env.PUBLIC_URL + "/media/7494-scaled.jpg)", "backgroundRepeat": "no-repeat", "backgroundSize": "cover"
          , margin: '0 auto', width: '100%', height: (this.state.width >= 1280 ? "1200px" : (this.state.width >= 1024 ? "950px" : (this.state.width >= 768 ? "600px" : "510px"))), backgroundPosition: "top center"
        }} />
      </div >
    );
  }
}

function AwardChart(props) {

  let yearBundle = [];

  for (let year in Awards) {

    let awardCol1 = [], awardCol2 = [];
    let i = 0;
    for (let j = 0; j < Awards[year].ftc.length; j++) {
      const award = Awards[year].ftc[j],
        awardBobble = <AwardBobble year={Awards[year].year} name={award.name} description={award.description} icon={award.icon} important={award.important} isFTC={true} />;
      if (i % 2 === 0) awardCol1.push(awardBobble);
      else awardCol2.push(awardBobble);
      i++;
    }
    if (Awards[year].frc)
      for (let j = 0; j < Awards[year].frc.length; j++) {
        const award = Awards[year].frc[j],
          awardBobble = <AwardBobble year={Awards[year].year} name={award.name} description={award.description} icon={award.icon} important={award.important} isFTC={false} />;
        if (i % 2 === 0) awardCol1.push(awardBobble);
        else awardCol2.push(awardBobble);
        i++;
      }

    yearBundle.push(
      <div>
        <p className="pt-5 mb-2 font-bold text-4xl italic">{`${Awards[year].earlyYear} - ${Awards[year].year}${Awards[year].disclaimer ? "*" : ""}`}</p>
        <div className="md:grid md:grid-cols-2">
          <div className="col-span-1 ml-6 sm:ml-0 mr-8 sm:mr-20 md:mr-12 lg:mr-0">
            {awardCol1}
          </div>
          <div className="md:-ml-10 ml-6 sm:ml-0 mr-8 sm:mr-20 md:mr-12 lg:mr-0 lg:ml-10 col-span-1">
            {awardCol2}
          </div>
        </div>
        {Awards[year].disclaimer ? <p className="italic mt-6 text-center text-sm">*{Awards[year].disclaimer}</p> : <></>}
      </div>
    );
  }

  return (
    <div>
      {yearBundle}
    </div >
  );
}

function AwardBobble(props) {
  if (!props.name) return;
  return (
    <div id={`award${props.year}_${props.name.replace(" ", "_")}`} className="grid grid-cols-3 mt-5">
      <div className="col-span-1">
        <span className={`float-right align-middle w-20 text-3xl mt-2 ${props.important ? `bg-yellow-600 shadow-md hover:bg-yellow-500 hover:shadow-lg` : `bg-blue-2 hover:shadow-blue shadow-bluehover hover:bg-blue-4`} px-4 pt-3 pb-2 rounded-full transition duration-300`}>
          <i className={`fas fa-${props.icon}`} />
        </span>
      </div>
      <div className="col-span-2 ml-5 text-left">
        <div className="text-2xl font-bold">{props.name}</div>
        <post>
          <ReactMarkdown allowDangerousHtml plugins={[gfm]}>
            {props.description}
          </ReactMarkdown>
        </post>
      </div>
    </div>
  );
}

AwardBobble.propTypes = {
  year: PropTypes.number.isRequired,
  isFTC: PropTypes.bool,
  important: PropTypes.bool,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};


export default AboutUs;