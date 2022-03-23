import React, {Component} from "react";

export default class Page extends Component {

    render() {
        return (
            <div className="about">
                <div className="container">
                    <div className="row align-items-center my-5">
                        <div className="col">
                            <h1 className="font-weight-light">{this.props.page.title}</h1>
                            <div dangerouslySetInnerHTML={{__html: this.props.page.body}}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
