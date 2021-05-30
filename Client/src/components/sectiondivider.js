import styles from './sectiondivider.module.css'
import PropTypes from 'prop-types'
import React from 'react';

const colors = {
  0: '#989898',
  1: '#7A7A7A',
  2: '#767676',
  3: '#6C6C6C',
  4: '#54595F',
  5: '#424445',
  6: '#3D3E3F',
  7: 'rgba(82, 82, 82, 0.92)',
  100: 'rgba(82, 82, 82, 0)',
}

class SectionDivider extends React.Component {
  render() {

    let color1 = colors[this.props.color1] ? colors[this.props.color1] : this.props.color1,
      color2 = colors[this.props.color2] ? colors[this.props.color2] : this.props.color2;

    switch (this.props.divider) {
      case "skew-c": return (<div className={this.props.className + " " + styles.skew_c} style={{ '--color-1': color1, '--color-2': color2 }} />);
      case "skew-cc": return (<div className={this.props.className + " " + styles.skew_cc} style={{ '--color-1': color1, '--color-2': color2 }} />);
      case "skew-triangle":
      case "skew-tri": return (<div
        className={this.props.className + " " + styles.skew_triangle}
        style={{
          '--color-1': color1,
          '--color-2': color2,
          "--tri-height": this.props.height
        }} />);
      case "skew-invtriangle":
      case "skew-invtri": return (<div
        className={this.props.className + " " + styles.skew_triangle_inv}
        style={{
          '--color-1': color2,
          '--color-2': color1,
          "--tri-height": this.props.height
        }} />);
      default: return <></>;
    }
  }
}

SectionDivider.propTypes = {
  divider: PropTypes.string.isRequired,
  color1: PropTypes.string.isRequired,
  color2: PropTypes.string.isRequired,
  height: PropTypes.string
}

SectionDivider.defaultProps = {
  height: "30px"
}

export default SectionDivider;