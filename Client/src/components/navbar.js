import React from 'react';
import Button from './button'
import { HashLink as Link } from 'react-router-hash-link'
import NavCSS from './navbar.module.css'
import lang from '../lang/lang.json'

const topLevel = [
    { key: 1, title: lang.header.nav.home, link: "/" },
    { key: 2, title: lang.header.nav.about_us.title, link: "/about-us" },
    { key: 3, title: lang.header.nav.news, link: "/news" },
    { key: 4, title: lang.header.nav.robots, link: "/robots" },
    { key: 5, title: lang.header.nav.outreach, link: "/outreach" },
    { key: 6, title: lang.header.nav.resources, link: "/resources" },
    { key: 7, title: lang.header.nav.support_us, link: "/support-us" },
    { key: 8, title: lang.header.nav.contact, link: "/contact" },
    { key: 9, title: lang.header.nav.interested, link: "/interest", important: true }
]

const subMenus = {
    2: [
        { key: 20, title: lang.header.nav.about_us.who_we_are, link: "/about-us#who-we-are" },
        { key: 21, title: lang.header.nav.about_us.alumni, link: "/about-us/alumni" },
        { key: 22, title: lang.header.nav.about_us.about_first, link: "/about-us/first" },
        { key: 23, title: lang.header.nav.about_us.teams, link: "/about-us#teams" },
        { key: 24, title: lang.header.nav.about_us.departments, link: "/about-us#departments" },
        { key: 25, title: lang.header.nav.about_us.awards, link: "/about-us#awards" },
        //{ key: 26, title: lang.header.nav.about_us.mentors, link: "/about-us#mentors" },
    ],
    // 6: [
    //     { key: 60, title: 'DOCUMENTS', link: "/documents" },
    //     { key: 60, title: 'CLUB RESOURCES', link: "/club-resources" },
    // ],
    // 7: [
    //     { key: 70, title: 'OUR SPONSORS', link: "/sponsors" },
    // ],
    // 9: [
    //     { key: 90, title: 'MEMBER HOME', link: "#" },
    //     { key: 91, title: 'VOLUNTEER HOME', link: "#" },
    //     { key: 92, title: 'SETTINGS', link: "#" },
    //     { key: 93, title: 'LOGOUT', link: "#" },
    // ],
}

class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentSubMenu: null,
        }
    }

    onHover = (key) => {
        this.setState({
            currentSubMenu: key,
        });
    }

    onMouseAway = () => {
        this.setState({
            currentSubMenu: null,
        });
    }

    render() {

        var final = [];
        var submenu = [];

        if (subMenus.hasOwnProperty(this.state.currentSubMenu))
            for (let sl of subMenus[this.state.currentSubMenu]) {
                if (!sl) continue
                const idx = subMenus[this.state.currentSubMenu].indexOf(sl);
                submenu.push(
                    <li key={sl.key}>
                        <Link to={sl.link}>
                            <Button bstyle="nav" className={(idx === 0 ? subMenus[this.state.currentSubMenu].length === 1 ? `rounded-tr-md rounded-b-md` : `rounded-tr-md` : idx === subMenus[this.state.currentSubMenu].length - 1 ? `rounded-b-md` : ``)}>
                                <div className="w-48 p-1 flex items-center gap-3 flex-shrink-0 text-white">
                                    <span className="mx-auto text-center">{sl.title}</span>
                                </div>
                            </Button>
                        </Link>
                    </li>);
            }

        for (let tl of topLevel) {
            final.push(
                <span className="inline-block" onMouseEnter={() => this.onHover(tl.key)} onMouseLeave={() => this.onMouseAway()}>
                    <div>
                        <Link to={tl.link}>
                            <Button bstyle="nav" className={"mr-0 xl:mr-1 rounded " + (tl.important ? "bg-blue-2" : "")}>
                                <div className="p-1 flex items-center gap-3 flex-shrink-0 text-white">
                                    <span className="text-center"><p>{tl.title}</p></span>
                                </div>
                            </Button>
                        </Link>
                    </div>
                    {(tl.key === this.state.currentSubMenu ? <ul className={"bg-gray-5 shadow-lg rounded-tr-md rounded-b-md absolute w-36 " + (tl.right === true ? "right-0" : "")}>{submenu}</ul> : <></>)}
                </span>
            );
        }

        return <div className="relative">{final}</div>;
    }
}

class MobileMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSubMenu: null,
        }
    }

    onClickSubIcon = (key) => {
        this.setState({
            currentSubMenu: key === this.state.currentSubMenu ? null : key,
        });
    }

    render() {
        var final = [];
        var submenu = [];

        if (subMenus.hasOwnProperty(this.state.currentSubMenu))
            for (let sl of subMenus[this.state.currentSubMenu]) {
                if (!sl) continue
                submenu.push(<li className="my-2" key={sl.key}>
                    <Link to={sl.link}>
                        <Button className="rounded" bstyle="mobileNavSecondary">
                            <span className="text-left w-32">{sl.title}</span>
                        </Button>
                    </Link>
                </li>);
            }

        for (let tl of topLevel) {
            final.push(
                <div className="py-2 min-w-full">
                    <Link to={this.props.dir === tl.link ? "#" : tl.link}>
                        <Button
                            className={(subMenus.hasOwnProperty(tl.key) ? "rounded-l rounded-r-none" : "rounded") + (tl.important ? " bg-blue-2 hover:text-white text-white hover:bg-blue-4" : "")}
                            bstyle={this.props.dir === tl.link ? "secondarySelected" : "secondary"}
                        >
                            <span className="text-left" style={{ width: subMenus.hasOwnProperty(tl.key) ? "108px" : "144px" }}><p>{tl.title}</p></span>
                        </Button>
                    </Link>
                    {(subMenus.hasOwnProperty(tl.key) ?
                        <button onClick={() => this.onClickSubIcon(tl.key)}>
                            <Button className="rounded-r rounded-l-none" bstyle={(tl.key === this.state.currentSubMenu ? "mobileNavSecondary" : "secondary")}>
                                <i class={NavCSS.dropdownicon + " my-auto fas fa-chevron-" + (tl.key === this.state.currentSubMenu ? "up" : "down")}></i>
                            </Button>
                        </button>
                        : <></>)}
                    {(tl.key === this.state.currentSubMenu ? <ul className={""}>{submenu}</ul> : <></>)}
                </div>
            );
        }

        return <div>{final}</div>;
    }
}

export {
    NavBar,
    MobileMenu,
}
