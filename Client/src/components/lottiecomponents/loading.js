import React from 'react'
import UncontrolledLottie from '../uncontrolledlottie';


class Loading extends React.Component {
    render() {
        return (
            <div className="mt-2">
                <UncontrolledLottie name="loader" width={83} height={55} />
            </div>
        );
    }
}


export default Loading;