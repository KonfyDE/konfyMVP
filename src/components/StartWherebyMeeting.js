import React, {Component} from "react";
import Sidebar from "../containers/Sidebar";
import {API} from "aws-amplify";


class WhereBy extends Component {
    state = {
        success: false,
        error : false,
        room_url: null
    }
    async componentDidMount() {
        const data = await API.get('whereby', '/create-meeting');
        this.setState(data);
    }
    render() {
        let content;
        if (this.state.success)
            content = <iframe src={this.state.room_url}></iframe>
        else if (this.state.error)
            content = <div>Whereby API ERROR!</div>
        else
            content = <div>Loading Meeting</div>
        return (
            <React.Fragment>
                <Sidebar
                    activeListItem='global-timeline'
                />
                {content}
            </React.Fragment>
        )
    }
}

export default WhereBy;
