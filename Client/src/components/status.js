import React from 'react';

class Status extends React.Component {
    render() {

        let icon, color;
        switch (this.props.type) {
            case 2: icon = <i className="fas fa-exclamation-circle text-2xl text-center"></i>; color="red"; break;
            case 1: icon = <i className="fas fa-exclamation-triangle text-2xl text-center"></i>; color="yellow"; break;
            case 0: icon = <i className="fas fa-check text-2xl text-center"></i>; color="green"; break;
            default: icon = <i className="fas fa-exclamation-circle text-2xl text-center"></i>; color="red"; break;
        }

        return (
            <div className={"grid grid-cols-8 gap-4 bg-" + color + "-100 border-2 border-" + color + "-500 text-sm shadow-md font-bold rounded px-8 pt-3 pb-3 mb-4"}>
                <div className="col-span-1 py-2">{icon}</div>
                <div className="col-span-7"><span>{this.props.message}</span></div>
            </div>
        );
    }
}

export default Status;
