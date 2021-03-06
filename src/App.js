import React from 'react';
import Layout from './components/layout'
import { BrowserRouter, Router, Route, Switch, useLocation, Redirect } from "react-router-dom";
import HomeScreen from './pages/home'
import Resources from './pages/resources'
import Announcements from './pages/announcements'
import Posts from './pages/post'
import Contact from './pages/contact'
import Support from './pages/support'
import Sponsors from './pages/sponsors'
import FourOFourPage from './pages/404'
import AboutFirst from './pages/about-first'
import Alumni from './pages/alumni'
import AboutUs from './pages/about-us'
import Robots from './pages/robots/robots'
import Outreach from './pages/outreach'
import Interest from './pages/interest'
import Media from './pages/media'

class App extends React.Component {
  render() {
    return (
      <>
        <BrowserRouter basename="/">
          <Layout callbackLocation={this.callbackLocation}>
            <Switch>
              <Route path="/" exact><HomeScreen /></Route>
              <Route path="/about-us" exact><AboutUs /></Route>
              <Route path="/about" exact><Redirect to="/about-us" /></Route>
              <Route path="/about-us/alumni" exact><Alumni /></Route>
              <Route path="/alumni" exact><Redirect to="/about-us/alumni" /></Route>
              <Route path="/about-us/first" exact><AboutFirst /></Route>
              <Route path="/about-first" exact><Redirect to="/about-us/first" /></Route>
              <Route path="/news" exact><Announcements /></Route>
              <Route path="/news/post/:id" ><Posts /></Route>
              <Route path="/news/post" exact><Redirect to="/news" /></Route>
              <Route path="/announcements" exact><Redirect to="/news" /></Route>
              <Route path="/outreach" exact><Outreach /></Route>
              <Route path="/resources" exact><Resources /></Route>
              <Route path="/resources/media" exact><Media /></Route>
              {/*<Route path="/club-resources" exact><div className="text-center text-4xl font-bold">Club Resources.</div></Route>*/}
              <Route path="/support-us" exact><Support /></Route>
              <Route path="/support" exact><Redirect to="/support-us" /></Route>
              <Route path="/sponsor" exact><Redirect to="/support-us" /></Route>
              <Route path="/sponsor-us" exact><Redirect to="/support-us" /></Route>
              <Route path="/sponsors" exact><Sponsors /></Route>
              <Route path="/our-sponsors" exact><Redirect to="/sponsors" /></Route>
              <Route path="/contact" exact><Contact /></Route>
              <Route path="/contact-us" exact><Redirect to="/contact" /></Route>
              <Route path="/robots" exact><Robots /></Route>
              <Route path="/documents" exact><Redirect to="/resources" /></Route>
              <Route path="/media" exact><Redirect to="/resources/media" /></Route>
              <Route path="/resources/documents" exact><Redirect to="/resources" /></Route>
              <Route path="/interest" exact><Interest /></Route>
              <Route><FourOFourPage /></Route>
            </Switch>
          </Layout>
        </BrowserRouter>
      </>
    )
  }
}

export default App;
