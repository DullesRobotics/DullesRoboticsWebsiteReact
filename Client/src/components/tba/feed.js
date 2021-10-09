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

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function TBAFeed(props) {
    const competitionsData = useSelector(selectCompetitions);
    const dispatch = useDispatch();
    if (competitionsData.comps.length === 0 && !competitionsData.loading && !competitionsData.error) {
        dispatch(loadCompetitions());
    }

    let bundle = [];
    for (let c in competitionsData.comps) {
        let city = competitionsData.comps[c].city, state_prov = competitionsData.comps[c].state_prov, country = competitionsData.comps[c].country;
        const loc = (city ? city + ", " : "") + (state_prov ? state_prov + ", " : "") + (country ? country : "");

        bundle.push(
            <Bobble className="mr-2"
                title={competitionsData.comps[c].name}
                location={loc}
                startDate={competitionsData.comps[c].start_date}
                endDate={competitionsData.comps[c].end_date}
                rank={competitionsData.comps[c].status.rank}
                scoring={[competitionsData.comps[c].status.wins, competitionsData.comps[c].status.losses, competitionsData.comps[c].status.ties]}
                awards={competitionsData.comps[c].status.awards}
                eventType={competitionsData.comps[c].event_type_string}
            // TODO add points points={competitionsData.comps[c].points}
            />
        );
    }

    const title = lang.news.competition_results.title.replace("%year%", competitionsData.season ? competitionsData.season : new Date().getFullYear())

    return (
        <div className="px-4">
            <p className="text-3xl font-bold leading-8">{title}</p>
            {!competitionsData.error ? competitionsData.loading ? <LoadingIcon /> :
                <div className={props.className}>
                    <p className="text-md">{parseDescriptor(competitionsData.season, competitionsData.district_info, competitionsData.comps)}</p>
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
        if (c["event_type_string"].toLowerCase().indexOf("offseason") === -1) {
            if (c["status"] && c["status"]["wins"])
                wins += Number(c["status"]["wins"]);
            if (c["status"] && c["status"]["losses"])
                losses += Number(c["status"]["losses"]);
            if (c["status"] && c["status"]["ties"])
                ties += Number(c["status"]["ties"]);
        }
    });

    if (wins === 0 && losses === 0 && ties === 0)
        return "Dulles Robotics has not competed yet."

    let descriptor = "";
    if (state_info && state_info.rank && state_info.points) {
        descriptor += `FRC: Overall in the state of Texas, Dulles Robotics ${new Date().getFullYear() === Number(currentSeason) ? "is" : "was"} rank ${state_info.rank} with ${state_info.points} point`;
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

    parseDescriptor = () => {
        let wins = this.props.scoring[0] ? this.props.scoring[0] : 0, losses = this.props.scoring[1] ? this.props.scoring[1] : 0, ties = this.props.scoring[2] ? this.props.scoring[2] : 0;

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
        let awardList = [];
        if (this.props.awards) {
            let awardProps = this.props.awards.slice();
            awardProps.sort((a, b) => a.award_type - b.award_type);
            for (let a in awardProps)
                awardList.push(<li key={awardProps[a].award_type.toString()} className="ml-1">{" - " + awardProps[a].name}</li>);
        }

        let title = this.props.title, suspended = title.indexOf("***SUSPENDED***") > -1, canceled = title.indexOf("(Cancelled)") > -1;
        if (suspended) title = title.replace("***SUSPENDED***", "").trim();
        if (canceled) title = title.replace("(Cancelled)", "").replace("*", "");

        let dateDescriptor = "", sDate = this.props.startDate.split("-"), eDate = this.props.endDate.split("-");
        if (sDate && sDate.length === 3) {
            dateDescriptor += monthNames[sDate[1] - 1] + " " + Number(sDate[2]);
            if (eDate && eDate.length === 3 && eDate !== sDate) {
                dateDescriptor += " - " + (monthNames[eDate[1] - 1] !== monthNames[sDate[1] - 1] ? monthNames[eDate[1] - 1] + " " : "") + Number(eDate[2]) + ", " + sDate[0];
            } else dateDescriptor += ", " + sDate[0];
        }

        return (
            <div className={"bg-gray-4 rounded-lg " + this.props.className + " " + BobbleCSS.card}>
                <div className="m-2">
                    <p className="text-xl font-bold flex">{title}</p>
                    <p className="font-thin text-md">{(dateDescriptor !== "" ? dateDescriptor + " in " : "") + (this.props.location ? this.props.location : "")}</p>
                    <p className="font-thin text-md">{title.toLowerCase().indexOf(this.props.eventType.toLowerCase()) > -1 ? "" : this.props.eventType}</p>
                    <p className="text-lg font-semibold italic flex">{suspended ? "This event has been suspended." : canceled ? "This event has been canceled." : ""}</p>
                    <p className="text-lg">{this.props.rank ? "Rank: " + this.props.rank : ""}</p>
                    <p className="text-lg">{this.props.scoring ? this.parseDescriptor() : ""}</p>
                    {awardList.length > 0 ?
                        <div>
                            <p className="font-semibold text-lg">Awards: </p>
                            <ul>
                                {awardList}
                            </ul>
                        </div>
                        : <></>}
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