import React from 'react'
import Spacer from '../components/spacer'
import Button from '../components/button'
import LoadingIcon from '../components/lottiecomponents/loading'
import FollowTray from '../components/followtray'
import Input, { TextArea } from '../components/input'
import mobile from "is-mobile"
import dataJson from "../data.json"
import Text from '../components/text'
import lang from '../lang/lang.json'


const gMapsHeight = 300;
const emailRegx = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

class Contact extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth - (mobile() ? 0 : 15)
    }
  }

  updateDimensions = () => {
    this.setState({ width: window.innerWidth - (mobile() ? 0 : 15) });
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
        <Spacer className="bg-gray-100" />
        <div className="absolute" style={{ zIndex: -11, left: (this.state.width / 2) - 40, top: (gMapsHeight + 45) / 2 }}>
          <LoadingIcon />
          <p className="text-white font-semibold">
            <Text>{lang.contact.loading_map}</Text>
          </p>
        </div>
        <div>
          <iframe
            title="Dulles Google Map"
            width={this.state.width}
            height={gMapsHeight}
            frameborder="0"
            className="focus:outline-none z-10"
            style={{ "border": 0 }}
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAo6AmatfJyvW9uJHGBQGyWdc2BHrC3YE4&q=Dulles+High+School,Sugar+Land+TX" allowfullscreen>
          </iframe>
        </div>
        <div className="py-3 md:grid md:grid-cols-5 xl:grid-cols-7 bg-gray-4">
          <div className="col-span-1 xl:col-span-2" />
          <p className="mx-12 md:mx-0 text-white col-span-3 xl:col-span-3 text-left text-4xl font-bold">
            <Text>{lang.contact.title}</Text>
          </p>
          <div className="col-span-1 xl:col-span-2" />
        </div>
        <div className="pb-5 md:grid md:grid-cols-5 xl:grid-cols-7 bg-gray-6">
          <div className="col-span-1 xl:col-span-2" />
          <div className="text-white col-span-3 xl:col-span-3 mx-12 md:mx-0">
            <p className="pt-5 text-left text-2xl font-bold">
              <Text>{lang.contact.social}</Text>
            </p>
            <div className="mt-4 mb-6"><FollowTray heading={false} colorful={true} /></div>
            <p className="text-left text-2xl font-bold">
              <Text>{lang.contact.email_us.title}</Text>
            </p>
            <p>
              {lang.contact.email_us.content} <a
                className="font-semibold text-blue-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
                href="mailto:dullesrobotics@gmail.com">
                {lang.contact.email_us.email}
              </a>.
            </p>
            <Text>{lang.contact.email_us.warning}</Text>
            <div className="mt-4 mb-6"><ContactForm /></div>
          </div>
          <div className="col-span-1 xl:col-span-2" />
        </div>
        <div className="bg-gray-6" style={{ 'min-height': '6vh' }}></div>
      </div>
    );
  }
}

const warns = ["", lang.contact.email_us.fields.required_field, lang.contact.email_us.fields.invalid_email]

class ContactForm extends React.Component {

  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.state = {
      fields: {
        name: { value: "", warn: 0, failed: false },
        email: { value: "", warn: 0, failed: false },
        phone: { value: "", warn: 0, failed: false },
        subject: { value: "", warn: 0, failed: false },
        message: { value: "", warn: 0, failed: false }
      },
      loadingLook: false,
      message: "",
    }
    this.loading = false;
    this.error = false;
  }

  updateField(field, value) {
    let fields = this.state.fields;
    let warn = fields[field].warn;
    if (field !== "phone") //is required
      warn = (this.state.fields[field].failed && value === "") ? 1 : 0;
    if (field === "email") //is email
      warn = (this.state.fields.email.failed && !emailRegx.test(value.toLowerCase())) ? 2 : 0;
    fields[field].warn = warn;
    fields[field].value = value;
    this.setState({ fields: fields })
  }

  submit() {
    if (this.loading || this.error) return;
    let fields = this.state.fields, anyFailed = false;
    for (let f in fields) {
      let warn = fields[f].warn;
      if (f !== "phone") //is required
        warn = (fields[f].value === "") ? 1 : 0;
      if (f === "email") //is email
        warn = (!emailRegx.test(fields[f].value.toLowerCase())) ? 2 : 0;
      if (warn !== 0) {
        anyFailed = true;
        fields[f].failed = true;
      }
      fields[f].warn = warn;
    }
    this.setState({ fields: fields })
    if (anyFailed) return;
    else {
      this.loading = true;
      this.setState({ loadingLook: true });

      try {
        fetch(`${dataJson.api_server}/contact`, {
          mode: 'cors',
          credentials: 'include',
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          },
          body: JSON.stringify({
            name: this.state.fields.name.value,
            email: this.state.fields.email.value,
            phone: this.state.fields.phone.value,
            subject: this.state.fields.subject.value,
            message: this.state.fields.message.value
          }),
        }).then(res => res.json())
          .then(json => {
            if (!json || json.error) {
              this.error = true;
              this.setState({ message: json && json.error ? json.error : lang.contact.email_us.fields.json_error })
              return;
            } else {
              this.loading = false;
              document.getElementById("contactForm").reset();
              this.setState({
                fields: {
                  name: { value: "", warn: 0, failed: false },
                  email: { value: "", warn: 0, failed: false },
                  phone: { value: "", warn: 0, failed: false },
                  subject: { value: "", warn: 0, failed: false },
                  message: { value: "", warn: 0, failed: false }
                },
                loadingLook: false,
                message: json.response ? json.response : lang.contact.email_us.fields.success
              })
            }
          }).catch(() => {
            this.error = true
            this.setState({ message: lang.contact.email_us.fields.fetch_error })
            return
          });
      } catch (err) {
        this.error = true;
        this.setState({ message: lang.contact.email_us.fields.global_error });
        return;
      }
    }
  }

  render() {
    let disabled = false;
    for (let f in this.state.fields) {
      if ((f !== "phone" && this.state.fields[f].value === "") || this.state.fields[f].warn !== 0) {
        disabled = true;
        break;
      }
    }
    return (
      <form id="contactForm">
        <Input change={(event) => this.updateField("name", event.target.value)} warn={warns[this.state.fields.name.warn]} name={lang.contact.email_us.fields.name} id="nameField" required />
        <Input change={(event) => this.updateField("email", event.target.value)} warn={warns[this.state.fields.email.warn]} name={lang.contact.email_us.fields.email} id="emailField" required />
        <Input change={(event) => this.updateField("phone", event.target.value)} warn={warns[this.state.fields.phone.warn]} name={lang.contact.email_us.fields.phone} id="phoneField" />
        <Input change={(event) => this.updateField("subject", event.target.value)} warn={warns[this.state.fields.subject.warn]} name={lang.contact.email_us.fields.subject} id="subjectField" required />
        <TextArea change={(event) => this.updateField("message", event.target.value)} warn={warns[this.state.fields.message.warn]} name={lang.contact.email_us.fields.message} id="messageField" required />
        <div>
          {this.state.message ? <p className={`${this.error ? "text-red-500" : "text-white"} font-bold text-left`}>{this.state.message}</p> : this.state.loadingLook ? <LoadingIcon /> : <></>}
          <div className="mt-3">
            <Button
              onClick={(e) => { if (!disabled && !this.loading && !this.error) this.submit() }}
              type="button"
              bstyle={disabled || this.loading || this.error ? "disabled" : "primary"}>
              {lang.contact.email_us.fields.send_button}
            </Button>
          </div>
        </div>
      </form>
    );
  }
}

export default Contact;