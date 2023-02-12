import React, {Component} from "react";
import {withSupportChat} from "../../hoc/withSupportChat";
import CreateGroup from "./createGroup";

class CreateHelfer extends Component {

    render() {
        return (<CreateGroup isHelfer={true}/> )
    }
}

export default withSupportChat(CreateHelfer);