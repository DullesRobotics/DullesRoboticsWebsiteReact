import React from 'react'
import Spacer from '../components/spacer'
import SectionDivider from '../components/sectiondivider'
import AlumniList from './alumni.json'
import PropTypes from 'prop-types';
import Text from '../components/text'
import lang from '../lang.json'

const alumCol = "col-span-1 mx-6 sm:mx-16 md:mx-2 mb-6 md:mb-0 rounded-lg",
  existStyle = "bg-gray-4 hover:bg-gray-5",
  notExistStyle = "bg-gray-2 shadow-inner",
  shadowStyle = { boxShadow: "3px 3px rgba(0,0,0,0.5)", transition: "0.25s" };

function Alumni(props) {

  let yearBundle = [];
  for (let yr in AlumniList) {

    let rowBundle = [], currentRow = [];
    for (let i = 0; i < AlumniList[yr].alumni.length; i++) {
      if (i !== 0 && i % 4 === 0) {
        rowBundle.push(currentRow);
        currentRow = [];
      }
      let alum = AlumniList[yr].alumni[i];
      currentRow.push(
        <AlumniBobble
          imageURL={alum.imageURL}
          name={alum.name}
          college={alum.college}
          major={alum.major}
          message={alum.message}
        />);
    }
    if (currentRow !== []) rowBundle.push(currentRow);

    let totalBundle = [];
    for (let r in rowBundle) {
      totalBundle.push(
        <div className="md:grid md:grid-cols-4 mb-6" >
          <div className={alumCol + " " + existStyle} style={shadowStyle}>
            {rowBundle[r][0]}
          </div>
          <div
            className={alumCol + " " + (rowBundle[r][1] ? existStyle : notExistStyle)}
            style={rowBundle[r][1] ? shadowStyle : {}}>
            {rowBundle[r][1]}
          </div>
          <div
            className={alumCol + " " + (rowBundle[r][2] ? existStyle : notExistStyle)}
            style={rowBundle[r][2] ? shadowStyle : {}}>
            {rowBundle[r][2]}
          </div>
          <div
            className={alumCol + " " + (rowBundle[r][3] ? existStyle : notExistStyle)}
            style={rowBundle[r][3] ? shadowStyle : {}}>
            {rowBundle[r][3]}
          </div>
        </div>
      );
    }

    yearBundle.push(
      <div>
        {Number(yr) !== 0 ? <SectionDivider divider="skew-tri" color1="3" color2="#44A2FF" height="40px" /> : <></>}
        <p style=
          {{
            backgroundImage: "linear-gradient(to bottom, #44A2FF, #2D8CEB 70%)",
            textShadow: "3px 3px rgba(0,0,0,0.2)"
          }}
          className="text-center text-white text-5xl font-bold -mb-6 pt-2">
          {AlumniList[yr].year}
        </p>
        <SectionDivider divider="skew-tri" color1="#2D8CEB" color2="3" height="40px" />
        <div className="pt-8 pb-8 lg:grid lg:grid-cols-10 xl:grid-cols-6 bg-gray-3">
          <div className="col-span-1" />
          <div className={`lg:col-span-8 xl:col-span-4 text-left text-white`}>
            {totalBundle}
          </div>
          <div className="col-span-1" />
        </div >
      </div >
    )
  }

  return (
    <div>
      <Spacer className="bg-gray-1" />
      <div className="pt-6 bg-gray-4">
        <p className="col-span-2 text-center text-white text-6xl font-bold">
          <Text>{lang.alumni.title}</Text>
        </p>
      </div>
      <SectionDivider divider="skew-tri" color1="4" color2="#44A2FF" height="40px" />
      {yearBundle}
      <div className="bg-gray-3" style={{ 'min-height': '30vh' }}></div>
    </div>
  );
}

function AlumniBobble(props) {
  return (
    <div >
      <div className="p-4">
        {props.imageURL ?
          <img
            className="rounded-lg mx-auto"
            src={process.env.PUBLIC_URL + props.imageURL}
            alt={props.name} /> :
          <p className="text-center text-7xl mt-5">
            <i className="fas fa-user-circle" />
          </p>
        }
        <p className="mt-4 text-3xl font-bold">{props.name}</p>
        <div className="my-4 text-lg text-blue-3 font-bold">
          <p>{props.college ? props.college : ""}</p>
          <p className="mt-2">{props.major ? "Major: " + props.major : ""}</p>
        </div>
        <p>{props.message ? props.message : ""}</p>
      </div>
    </div>
  );
}

AlumniBobble.propTypes = {
  imageURL: PropTypes.string,
  name: PropTypes.string.isRequired,
  college: PropTypes.string,
  major: PropTypes.string,
  message: PropTypes.string,
};

export default Alumni;