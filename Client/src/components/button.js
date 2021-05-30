import React from 'react'
import styles from './button.module.css'
import hoverCSS from '../styles/hover.module.css'

const buttonStyle = "cursor-pointer transition duration-150 ease-in-out items-center font-bold focus:outline-none"
const primaryStyle = "rounded bg-blue-1 hover:bg-blue-2 active:bg-blue-2 text-white py-2 px-4 transform";
const primaryGray = "rounded bg-gray-1 hover:bg-blue-1 active:bg-blue-1 text-white py-2 px-4 transform";
const primaryGreen = "rounded bg-green-500 hover:bg-green-600 active:bg-green-600 text-white py-2 px-4 transform";
const secondaryStyle = "shadow hover:shadow-none inline-flex inline-block align-baseline text-sm py-2 px-3";
const secondaryDisabledStyle = "shadow hover:shadow-none inline-flex inline-block align-baseline text-sm py-2 px-3 bg-gray-300 text-blue-800 cursor-not-allowed";
const disabledStyle = "rounded cursor-not-allowed py-2 px-4 transform text-gray-500 bg-gray-200";
const secondarySelectedStyle = "rounded shadow shadow-none inline-flex inline-block align-baseline text-sm py-2 px-3";
const navigationStyle = "py-2 px-1 xl:px-2 rounded-none hover:bg-blue-3 inline-flex inline-block";
const mobileNavSecondary = "bg-blue-1 hover:bg-blue-2 active:bg-blue-2 text-white shadow hover:shadow-none inline-flex inline-block align-baseline text-sm py-2 px-3"
const tertiaryStyle = "rounded bg-blue-1 hover:bg-blue-2 active:bg-blue-2 text-white py-1 px-2 transform";
const customStyle = "rounded transform";

class Button extends React.Component {
  render() {
    const _type = this.props.type ? this.props.type : "button";
    let style = `${buttonStyle} `;
    switch (this.props.bstyle) {
      case "primary": style += `${primaryStyle}`; break;
      case "tertiary": style += `${tertiaryStyle}`; break;
      case "secondary": style += `${secondaryStyle} ${styles.secondarybutton}`; break;
      case "disabled": style += `${disabledStyle}`; break;
      case "secondarySelected": style += `${secondarySelectedStyle} ${styles.secondarySelectedButton}`; break;
      case "secondaryDisabled": style += `${secondaryDisabledStyle}`; break;
      case "nav": style += `${navigationStyle}`; break;
      case "mobileNavSecondary": style += `${mobileNavSecondary}`; break;
      case "primaryGreen": style += `${primaryGreen}`; break;
      case "primaryGray": style += `${primaryGray}`; break;
      case "custom": style += `${customStyle}`; break;
      default: return <p>No type specified.</p>;
    }
    if (this.props.animate)
      switch (this.props.animate) {
        case 1: style += ` ` + hoverCSS.hvrbob; break;
        default: style += ` ` + hoverCSS.hvrfloat; break;
      }
    style += ` ` + this.props.className;
    return <button className={style} onClick={this.props.onClick} type={_type}> {this.props.children} </button>;
  }
}

export default Button;

