import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    selectCompetitions,
    loadCompetitions
} from '../../slices/competitionsSlice'
import PropTypes from 'prop-types';
import LoadingIcon from '../../components/lottiecomponents/loading';
import BobbleCSS from './bobble.module.css'
import Text from '../../components/text'
import lang from '../../lang/lang.json'
import Popup from 'reactjs-popup'
import '../../styles/modal.css'
import Button from '../../components/button'
import mobile from 'is-mobile'

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function TBAFeed(props) {
    const competitionsData = useSelector(selectCompetitions);
    const dispatch = useDispatch();
    if (competitionsData.comps.length === 0 && !competitionsData.loading && !competitionsData.error) {
        dispatch(loadCompetitions());
    }

    let bundle = [];
    let compFinal = [...competitionsData.comps].sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())
    for (let c in compFinal) {
        let city = compFinal[c].city, state_prov = compFinal[c].state_prov, country = compFinal[c].country;
        const loc = (city ? city + ", " : "") + (state_prov ? state_prov + ", " : "") + (country ? country : "");

        bundle.push(
            <Bobble className="mr-2"
                type={compFinal[c].type}
                title={compFinal[c].name}
                location={loc}
                startDate={compFinal[c].start_date}
                endDate={compFinal[c].end_date}
                status={compFinal[c].status}
                eventType={compFinal[c].event_type_string}
            // TODO add points points={compFinal[c].points}
            />
        );
    }

    const title = lang.news.competition_results.title.replace("%year% (+1)", competitionsData.season ? competitionsData.season : new Date().getFullYear())

    return (
        <div className="px-4">
            <p className="text-3xl font-bold leading-8">{title}</p>
            {!competitionsData.error ? competitionsData.loading ? <LoadingIcon /> :
                <div className={props.className}>
                    <p className="text-md">{"FRC: " + parseDescriptor(competitionsData.season, competitionsData.district_info, competitionsData.comps)}</p>
                    <section className={`min-w-full feeder ${BobbleCSS.feed}`}>
                        {bundle}
                    </section>
                </div>
                :
                <p className="text-md text-gray-300 mt-2">
                    <Text>{lang.news.tba_error}</Text>
                </p>
            }
            {props.courtesy ?
                <p className="text-sm mt-2">
                    {lang.news.competition_results.previous_years.prefix}
                    {getLink(lang.news.competition_results.previous_years.FRC, lang.news.competition_results.previous_years.FRC_link)},
                    &nbsp;
                    {getLink(lang.news.competition_results.previous_years.Bigred, lang.news.competition_results.previous_years.Bigred_link)},
                    &nbsp;
                    {getLink(lang.news.competition_results.previous_years.Robovikings, lang.news.competition_results.previous_years.Robovikings_link)}
                    <br />
                    {lang.news.competition_results.courtesy}&nbsp;
                    {getLink(lang.news.competition_results.tba, lang.news.competition_results.tba_link)}
                    &nbsp;and&nbsp;
                    {getLink(lang.news.competition_results.toa, lang.news.competition_results.toa_link)}

                </p> : <></>}
        </div>
    );
}

function getLink(name, link) {
    return (
        <a
            className="font-semibold text-blue-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
            href={link}>
            {name}
        </a>
    )
}


function parseDescriptor(currentSeason, state_info, comps) {
    if (currentSeason === null) return;

    let wins = 0, losses = 0, ties = 0;
    comps.forEach(c => {
        if (c["event_type_string"] && c["event_type_string"].toLowerCase().indexOf("offseason") === -1) {
            if (c["status"] && c["status"]["wins"])
                wins += Number(c["status"]["wins"]);
            if (c["status"] && c["status"]["losses"])
                losses += Number(c["status"]["losses"]);
            if (c["status"] && c["status"]["ties"])
                ties += Number(c["status"]["ties"]);
        }
    });

    if (wins === 0 && losses === 0 && ties === 0)
        return "Team FRC 7494 has not competed yet."

    let descriptor = "";
    if (state_info && state_info.rank && state_info.points) {
        descriptor += `Overall in the state of Texas, Dulles Robotics ${new Date().getFullYear() === Number(currentSeason) ? "is" : "was"} rank ${state_info.rank} with ${state_info.points} point`;
        descriptor += state_info.points === 1 ? `.` : `s.`;
    }
    descriptor += ` In official play, we ${new Date().getFullYear() === Number(currentSeason) ? "have" : ""} won ${wins} game`;
    descriptor += wins === 1 ? `` : `s`;
    descriptor += ties === 0 ? ` and` : `,`;
    descriptor += ` lost ${losses}`;
    descriptor += ties === 0 ? `` : `, and tied ${ties}`;
    return descriptor !== "" ? descriptor + "." : "";
}

class Bobble extends React.Component {

    awardListGenerator = (awards) => {
        if (!awards) return [];
        let awardList = [];
        let awardProps = awards.slice();
        awardProps.sort((a, b) => a.award_type - b.award_type);
        for (let a in awardProps)
            awardList.push(<li key={awardProps[a].award_type.toString()} className="ml-5">{awardProps[a].name}</li>);
        return awardList;
    }

    parseDescriptor = (num) => {
        let wins, losses, ties;
        if (num === 0) {
            wins = this.scoring[0] ? this.scoring[0] : 0
            losses = this.scoring[1] ? this.scoring[1] : 0
            ties = this.scoring[2] ? this.scoring[2] : 0
        } else if (num === 1) {
            wins = this.scoring2[0] ? this.scoring2[0] : 0
            losses = this.scoring2[1] ? this.scoring2[1] : 0
            ties = this.scoring2[2] ? this.scoring2[2] : 0
        }
        if (wins === 0 && losses === 0 && ties === 0)
            return "";

        let descriptor = ` We won ${wins} game`;
        descriptor += wins === 1 ? `` : `s`;
        descriptor += ties === 0 ? ` and` : `,`;
        descriptor += ` lost ${losses}`;
        descriptor += ties === 0 ? `` : `, and tied ${ties}`;
        return descriptor + ".";
    }

    render() {
        const teamed = (this.props.status.team12456 !== null || this.props.status.team13822 !== null) && isNaN(this.props.status.wins);
        this.rank = teamed ? this.props.status.team12456.rank : this.props.status.rank
        this.scoring = teamed ? [this.props.status.team12456.wins, this.props.status.team12456.losses, this.props.status.team12456.ties] : [this.props.status.wins, this.props.status.losses, this.props.status.ties]
        this.awards = teamed ? this.props.status.team12456.awards : this.props.status.awards

        this.team2 = this.props.status.team13822;
        if (teamed && this.team2) {
            this.rank2 = this.props.status.team13822.rank
            this.scoring2 = [this.props.status.team13822.wins, this.props.status.team13822.losses, this.props.status.team13822.ties]
            this.awards2 = this.props.status.team13822.awards
        }

        let awardList = this.awardListGenerator(this.awards)
        let awardList2 = teamed ? this.awardListGenerator(this.awards2) : null

        let title = this.props.title.replace("FTC", "").replace("FRC", ""), suspended = title.indexOf("***SUSPENDED***") > -1, canceled = title.indexOf("(Cancelled)") > -1;
        if (suspended) title = title.replace("***SUSPENDED***", "").trim();
        if (canceled) title = title.replace("(Cancelled)", "").replace("*", "");

        let dateDescriptor = "", sDate = this.props.startDate.split("-"), eDate = this.props.endDate.split("-");
        if (sDate && sDate.length === 3) {
            dateDescriptor += monthNames[sDate[1] - 1] + " " + Number(sDate[2]);
            if (eDate && eDate.length === 3 && this.props.endDate !== this.props.startDate) {
                dateDescriptor += " - " + (monthNames[eDate[1] - 1] !== monthNames[sDate[1] - 1] ? monthNames[eDate[1] - 1] + " " : "") + Number(eDate[2]) + ", " + sDate[0];
            } else dateDescriptor += ", " + sDate[0];
        }

        return (
            <div className={"bg-gray-4 rounded-lg " + this.props.className + " " + BobbleCSS.card}>
                <div className="m-2">
                    <p className="text-xl font-bold flex">{title}</p>
                    <p className="font-medium text-md">{this.props.type}</p>
                    <p className="font-thin text-md">{(dateDescriptor !== "" ? dateDescriptor + " in " : "") + (this.props.location ? this.props.location : "")}</p>
                    {this.props.eventType ? <p className="font-thin text-md">{title.toLowerCase().indexOf(this.props.eventType.toLowerCase()) > -1 ? "" : this.props.eventType}</p> : <></>}
                    {suspended ? <p className="text-lg font-semibold italic flex">This event has been suspended.</p>
                        : canceled ? <p className="text-lg font-semibold italic flex">This event has been canceled.</p>
                            : <Popup
                                trigger={
                                    <button className="button mt-2">
                                        <Button bstyle="primaryGreen">
                                            Results
                                        </Button>
                                    </button>}
                                modal>
                                {close => (
                                    <div className={`modal ${mobile() ? `` : `animate-modal`}`}>
                                        <button className="close bg-gray-200 hover:bg-gray-500" onClick={close}>
                                            <i class="far fa-times-circle"></i>
                                        </button>
                                        <div className="content p-5 md:p-6">
                                            <p className="text-lg">
                                                <post>
                                                    <p className="font-medium text-md">{this.props.type}</p>
                                                    <p className="text-3xl md:text-4xl font-bold">{title}</p>
                                                    <p className="text-md">{(dateDescriptor !== "" ? dateDescriptor + " in " : "") + (this.props.location ? this.props.location : "")}</p>
                                                    {this.props.eventType ? <p className="font-thin text-md">{title.toLowerCase().indexOf(this.props.eventType.toLowerCase()) > -1 ? "" : this.props.eventType}</p> : <></>}
                                                    <hr className="mt-2 mb-1 border-gray-7" />
                                                    <p className="text-lg font-semibold">{teamed ? "Team FTC 12456:" : "Team FRC 7494:"}</p>
                                                    <p className="text-lg">{this.rank ? "Rank: " + this.rank : ""}</p>
                                                    <p className="text-lg">{this.scoring ? this.parseDescriptor(0) : ""}</p>
                                                    {awardList.length > 0 ?
                                                        <div>
                                                            <p className="font-semibold text-lg">Awards: </p>
                                                            <ul>
                                                                {awardList}
                                                            </ul>
                                                        </div>
                                                        : <></>}
                                                    {
                                                        teamed ?
                                                            <div>
                                                                <p className="text-lg font-semibold mt-2">Team FTC 13822:</p>
                                                                <p className="text-lg">{this.rank2 ? "Rank: " + this.rank2 : ""}</p>
                                                                <p className="text-lg">{this.scoring2 ? this.parseDescriptor(1) : ""}</p>
                                                                {awardList2.length > 0 ?
                                                                    <div>
                                                                        <p className="font-semibold text-lg">Awards: </p>
                                                                        <ul>
                                                                            {awardList2}
                                                                        </ul>
                                                                    </div>
                                                                    : <></>}
                                                            </div>
                                                            : <></>
                                                    }
                                                </post>
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </Popup>
                    }
                </div>
            </div>
        );
    }
}

Bobble.propTypes = {
    title: PropTypes.string.isRequired,
    location: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    rank: PropTypes.number,
    scoring: PropTypes.array,
    awards: PropTypes.array,
    eventType: PropTypes.string
}

TBAFeed.defaultProps = {
    year: new Date().getFullYear(),
    courtesy: false
}

TBAFeed.propTypes = {
    year: PropTypes.number,
    courtesy: PropTypes.bool
}
