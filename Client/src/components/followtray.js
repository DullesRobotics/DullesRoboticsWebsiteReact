import React from 'react';
import Button from './button'
import PropTypes from 'prop-types'
import lang from '../lang.json'


class FollowTray extends React.Component {
    render() {
        return (
            <div>
                <p className="font-bold text-2xl sm:text-3xl">{this.props.heading ? lang.footer.follow_us : ""}</p>
                <a href="https://www.facebook.com/dullesrobotics/" target="_blank" rel="noopener noreferrer">
                    <Button bstyle={this.props.colorful ? "custom" : "primary"} className={this.props.colorful ? "bg-blue-700 py-2 px-4 text-white mb-1" : "mb-1"} animate>
                        <span className="text-xl">
                            <i class="fab fa-facebook align-middle" />
                        </span>
                    </Button>
                </a>
                <a className="ml-1" href="https://twitter.com/dulles_robotics" target="_blank" rel="noopener noreferrer">
                    <Button bstyle={this.props.colorful ? "custom" : "primary"} className={this.props.colorful ? "bg-blue-1 py-2 px-4 text-white mb-1" : "mb-1"} animate>
                        <span className="text-xl">
                            <i class="fab fa-twitter align-middle" />
                        </span>
                    </Button>
                </a>
                <a className="ml-1" href="https://www.youtube.com/channel/UC2LGV0aJWqBB2dNQNPcwoEg" target="_blank" rel="noopener noreferrer">
                    <Button bstyle={this.props.colorful ? "custom" : "primary"} className={this.props.colorful ? "bg-red-700 py-2 px-4 text-white mb-1" : "mb-1"} animate>
                        <span className="text-xl">
                            <i class="fab fa-youtube align-middle" />
                        </span>
                    </Button>
                </a>
                <a className="ml-1" href="https://www.instagram.com/dulles_robotics/" target="_blank" rel="noopener noreferrer">
                    <Button bstyle={this.props.colorful ? "custom" : "primary"} className={this.props.colorful ? "bg-purple-700 py-2 px-4 text-white mb-1" : "mb-1"} animate>
                        <span className="text-xl">
                            <i class="fab fa-instagram align-middle" />
                        </span>
                    </Button>
                </a>
                {this.props.heading ? <a className="ml-1" href="https://github.com/DullesRobotics/" target="_blank" rel="noopener noreferrer">
                    <Button bstyle={this.props.colorful ? "custom" : "primary"} className={this.props.colorful ? "bg-green-600 py-2 px-4 text-white mb-1" : "mb-1"} animate>
                        <span className="text-xl">
                            <i class="fab fa-github align-middle" />
                        </span>
                    </Button>
                </a> : <></>}
            </div>
        );
    }
}

FollowTray.propTypes = {
    heading: PropTypes.bool,
    colorful: PropTypes.bool,
}

FollowTray.defaultProps = {
    heading: true,
    colorful: false,
}

export default FollowTray;
