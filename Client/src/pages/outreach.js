import React from 'react'
import Button from '../components/button'
import SectionDivider from '../components/sectiondivider'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown/with-html'
import gfm from 'remark-gfm'
import OutreachJSON from '../lang/outreach.json'
import Text from '../components/text'
import lang from '../lang/lang.json'

class Outreach extends React.Component {

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

    const outreachList = []
    for (let j in OutreachJSON)
      outreachList.push(
        <div>
          <p className="pt-4 mb-2 font-bold text-3xl">
            <ReactMarkdown allowDangerousHtml plugins={[gfm]}>
              {OutreachJSON[j].title}
            </ReactMarkdown>
          </p>
          <p className="text-lg">
            <ReactMarkdown allowDangerousHtml plugins={[gfm]}>
              {OutreachJSON[j].description}
            </ReactMarkdown>
          </p>
          {OutreachJSON[j].media_url ?
            <div className="my-4">
              <Link to={OutreachJSON[j].media_url}>
                <Button bstyle="secondary">View Media</Button>
              </Link>
            </div> : <></>}
        </div>
      )


    return (
      <div>
        <div className="z-10">
          <div className="pt-32 md:pt-48 lg:pt-64 pb-24 md:pb-32 lg:pb-48">
            <div className="lg:my-24 md:col-span-3 lg:col-span-2">
              <p className="text-center text-white text-5xl lg:text-6xl font-bold">
                <Text>{lang.outreach.title}</Text>
              </p>
            </div>
          </div>
          <SectionDivider divider="skew-invtri" color1={100} color2={2} height="40px" />
          <div className="bg-gray-2 text-white md:grid md:grid-cols-6 lg:grid-cols-5">
            <div className="col-span-1" />
            <div className="col-span-4 mx-5 md:mx-0 lg:col-span-3 pt-4 pb-8">
              {outreachList}
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


export default Outreach;