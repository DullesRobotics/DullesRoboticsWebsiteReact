import React, { Component } from "react";
import Lottie from "react-lottie";
import PropTypes from 'prop-types';

/**
 * Renders a lottie
 */
class UncontrolledLottie extends Component {

  render() {
    const animationData = require(`../lotties/${this.props.name}.json`);

    const defaultOptions = {
      loop: this.props.loop,
      autoplay: this.props.autoplay,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    return (
      <div>
        <Lottie
          options={defaultOptions}
          height={this.props.height}
          width={this.props.width}
          isClickToPauseDisabled={true}
          style={{ cursor: "default" }}
        />
      </div>
    )
  }
}

UncontrolledLottie.defaultProps = {
  loop: true,
  autoplay: true,
  name: "loader",
  width: 100,
  height: 100
}

UncontrolledLottie.propTypes = {
  loop: PropTypes.bool,
  autoplay: PropTypes.bool,
  name: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number
}

export default UncontrolledLottie;
