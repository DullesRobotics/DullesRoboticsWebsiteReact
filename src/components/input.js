import React from 'react';
import PropTypes from 'prop-types'

class Input extends React.Component {
  render() {
    return (
      <div className="mb-3">
        <label className={`block text-white text-md font-bold mb-1`}>
          {this.props.name}
          {
            this.props.required ?
              <span className="text-red-500"> *</span>
              : <></>
          }
        </label>
        <input
          onChange={(e) => { if (this.props.change) this.props.change(e) }}
          value={this.props.value}
          className={
            "shadow transition font-semibold duration-150 ease-in-out appearance-none border rounded w-full py-2 px-3" +
            " text-black leading-tight focus:outline-none focus:shadow-md " +
            (this.props.warn && this.props.warn !== "" ? "border-red-500 focus:border-red-700" : "border-gray-200 focus:border-blue-600")}
          type={this.props.type}
          placeholder={this.props.placeholder}
          style={{ borderWidth: "4px" }}
          id={this.props.id}>
          {this.props.children}
        </input>
        {this.props.warn && this.props.warn !== "" ?
          <p className="text-red-500 text-md font-bold italic">
            {this.props.warn}
          </p>
          : <></>}
      </div>
    );
  }
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  warn: PropTypes.string,
  id: PropTypes.string.isRequired,
  required: PropTypes.bool,
  change: PropTypes.func.isRequired
}

Input.defaultProps = {
  type: "text", //other types: password
  required: false
}

export class TextArea extends React.Component {
  render() {
    return (
      <div className="mb-3">
        <label className={`block text-white text-md font-bold mb-1`}>
          {this.props.name}
          {
            this.props.required ?
              <span className="text-red-500"> *</span>
              : <></>
          }
        </label>
        <textarea
          onChange={(e) => { this.props.change(e) }}
          value={this.props.value}
          className={"font-semibold shadow transition duration-150 ease-in-out appearance-none" +
            " border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-md" +
            (this.props.warn && this.props.warn !== "" ? " border-red-500 focus:border-red-700" : " border-gray-200 focus:border-blue-600")}
          type={this.props.type}
          placeholder={this.props.placeholder}
          id={this.props.id}
          style={{ borderWidth: "4px" }}
          cols={60}
          rows={8}>
          {this.props.children}
        </textarea>
        {this.props.warn && this.props.warn !== "" ? <p className="text-red-500 text-md font-bold italic -mt-2">{this.props.warn}</p> : <></>}
      </div>
    );
  }
}

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  warn: PropTypes.string,
  id: PropTypes.string.isRequired,
  required: PropTypes.bool,
  change: PropTypes.func.isRequired
}

TextArea.defaultProps = {
  type: "text", //other types: password
  required: false
}

export default Input;