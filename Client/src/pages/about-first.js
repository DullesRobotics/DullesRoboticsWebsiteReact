import React from 'react'
import Spacer from '../components/spacer'
import Button from '../components/button'
import SectionDivider from '../components/sectiondivider'

class AboutFirst extends React.Component {

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
          <div className="pt-24 lg:pt-64 pb-16 lg:pb-48">
            <div className="lg:my-24 md:col-span-3 lg:col-span-2 lg:grid lg:grid-cols-2">
              <div className="col-span-1 mr-3">
                <p className="text-center lg:text-right text-white text-6xl lg:text-7xl font-bold">About</p>
              </div>
              <div className="lg:flex col-span-1 lg:mt-4 md:mb-3 lg:mr-48 xl:mr-64 md:ml-3">
                <img className="mx-auto lg:mx-0" src={process.env.PUBLIC_URL + "/media/FIRST-small.png"} alt="FIRST" />
              </div>
            </div>
          </div>
          <SectionDivider divider="skew-invtri" color1={100} color2={3} height="40px" />
          <div className="bg-gray-3 text-white md:grid md:grid-cols-6 lg:grid-cols-5">
            <div className="col-span-1" />
            <div className="col-span-4 mx-5 md:mx-0 lg:col-span-3">
              <p className="pt-4 mb-2 font-bold text-5xl">Introduction</p>
              <p className="text-lg">{
                "FIRST (For Inspiration and Recognition of Science and Technology) was founded in 1989 " +
                "to inspire young people’s interest and participation in science and technology. Based in Manchester, NH, " +
                "the 501(c)(3) not-for-profit public charity designs accessible, innovative programs that motivate " +
                "young people to pursue education and career opportunities in science, technology, engineering, and math," +
                " while building self-confidence, knowledge, and life skills."
              }</p>
              <p className="mt-6 mb-2 font-bold text-5xl">Mission</p>
              <p className="text-lg">{
                "The mission of FIRST® is to inspire young people to be science and technology leaders and innovators, " +
                "by engaging them in exciting mentor-based programs that build science, engineering, and technology skills, " +
                "that inspire innovation, and that foster well-rounded life capabilities including self-confidence, communication, and leadership."
              }</p>
              <div className="py-8 flex sm:block">
                <a className="mx-auto sm:mx-0" href="https://www.firstinspires.org/about/vision-and-mission" target="_blank" rel="noopener noreferrer">
                  <Button bstyle="primary" animate><p className="m-1">Learn More About <i><strong>First</strong></i><i className="ml-2 fas fa-external-link-square-alt" /></p></Button>
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
                <img className="mx-auto w-2/3" src={process.env.PUBLIC_URL + "/media/FTC.png"} alt="FTC Logo" />
                <p className="mt-6 mb-2 font-bold text-3xl"><i className="mr-1">FIRST</i> Tech Challenge</p>
                <p className="text-lg">{
                  "Teams of middle and high school-aged students are challenged to design, build, and program " +
                  "a robot to play a floor game against other teams’ creations. Team 12456 and Team 13822 have " +
                  "been competing in the FIRST Tech Challenge since 2016 and 2017 respectively."
                }</p>
                <div className="xl:grid xl:grid-cols-2 pt-4">
                  <div className="xl:col-span-1 flex xl:mr-1 mb-2 xl:mb-0">
                    <a className="mx-auto xl:mr-0 xl:ml-auto" href="https://www.firstinspires.org/robotics/ftc" target="_blank" rel="noopener noreferrer">
                      <Button bstyle="primary" animate><p className=" xl:m-1">Learn More About <strong>FTC</strong><i className="ml-2 fas fa-external-link-square-alt" /></p></Button>
                    </a>
                  </div>
                  <div className="xl:col-span-1 flex xl:ml-1">
                    <a className="mx-auto xl:mx-0" href="https://www.firstinspires.org/robotics/ftc/game-and-season" target="_blank" rel="noopener noreferrer">
                      <Button bstyle="primary" animate><p className="m-0 xl:m-1">This Year's <strong>FTC</strong> Game <i className="ml-2 fas fa-external-link-square-alt" /></p></Button>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-span-1 p-5 xl:m-10">
                <img className="pb-2 mx-auto w-2/3" src={process.env.PUBLIC_URL + "/media/FRC.png"} alt="FRC Logo" />
                <p className="mt-6 mb-2 font-bold text-3xl"><i className="mr-1">FIRST</i> Robotics Challenge</p>
                <p className="text-lg">{
                  "High school-aged teams compete head to head on a special playing field with robots they have " +
                  "designed, built, and programmed. Students learn about pneumatics and other technologies." +
                  " Team 7494 has been competing in the First Robotics " +
                  "Competition since its rookie year in 2019."
                }</p>
                <div className="xl:grid xl:grid-cols-2 pt-4">
                  <div className="xl:col-span-1 flex xl:mr-1 mb-2 xl:mb-0">
                    <a className="mx-auto xl:mr-0 xl:ml-auto" href="https://www.firstinspires.org/robotics/frc" target="_blank" rel="noopener noreferrer">
                      <Button bstyle="primary" animate><p className=" xl:m-1">Learn More About <strong>FRC</strong><i className="ml-2 fas fa-external-link-square-alt" /></p></Button>
                    </a>
                  </div>
                  <div className="xl:col-span-1 flex xl:ml-1">
                    <a className="mx-auto xl:mx-0" href="https://www.firstinspires.org/robotics/frc/game-and-season" target="_blank" rel="noopener noreferrer">
                      <Button bstyle="primary" animate><p className="m-0 xl:m-1">This Year's <strong>FRC</strong> Game <i className="ml-2 fas fa-external-link-square-alt" /></p></Button>
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
              <p className="pt-6 mb-2 font-bold text-center text-5xl">FIRST's Values</p>
              <div className="md:grid grid-cols-2">
                <div className="col-span-1 mx-6 md:mx-0 md:mr-6">
                  <p className="mt-6 mb-2 text-center font-bold text-3xl">Gracious Professionalism®</p>
                  <p className="text-lg text-center">{"Gracious Professionalism is part of the ethos of FIRST." +
                    " It’s a way of doing things that encourages high-quality work," +
                    " emphasizes the value of others, and respects individuals and the community." +
                    " With Gracious Professionalism, fierce competition and mutual gain are not separate notions." +
                    " Gracious professionals learn and compete like crazy, but treat one another with respect and" +
                    " kindness in the process. They avoid treating anyone like losers. No chest thumping tough talk," +
                    " but no sticky-sweet platitudes either. "}</p>
                </div>
                <div className="col-span-1 mx-6 md:mx-0 md:ml-6">
                  <p className="mt-6 mb-2 text-center font-bold text-3xl">Coopertition®</p>
                  <p className="text-lg text-center">{"At FIRST, Coopertition is displaying unqualified kindness" +
                    " and respect in the face of fierce competition. Coopertition is founded on the concept and a philosophy" +
                    " that teams can and should help and cooperate with each other even as they compete. Coopertition involves" +
                    " learning from teammates. It is teaching teammates. It is learning from Mentors. And it is managing and being managed." +
                    " Coopertition means competing always, but assisting and enabling others when you can."}</p>
                </div>
              </div>
            </div>
            <div className="col-span-1" />
          </div>
        </div>
        <div className={"absolute"} style={{
          "z-index": "-9", "top": "-100px",
          "backgroundImage": "linear-gradient(to bottom, rgba(36, 229, 155, 0.6) 0%, rgba(36, 149, 229, 0.65) 90%)", "backgroundRepeat": "no-repeat", "backgroundSize": "cover"
          , margin: '0 auto', width: '100%', height: (this.state.width >= 1280 ? "1200px" : (this.state.width >= 1024 ? "950px" : (this.state.width >= 768 ? "600px" : "510px"))), backgroundPosition: "center center"
        }} />

        <div className={"absolute"} style={{
          "z-index": "-11", "top": "-100px",
          "backgroundImage": "url(" + process.env.PUBLIC_URL + "/media/outreach.jpg)", "backgroundRepeat": "no-repeat", "backgroundSize": "cover"
          , margin: '0 auto', width: '100%', height: (this.state.width >= 1280 ? "1200px" : (this.state.width >= 1024 ? "950px" : (this.state.width >= 768 ? "600px" : "510px"))), backgroundPosition: "20% 20%"
        }} />
      </div>
    );
  }
}

export default AboutFirst;