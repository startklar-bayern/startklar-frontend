import React, {Component} from 'react';
import Sharepics from './sharepics';

class Home extends Component {
    render() {
        return (
            <Sharepics sharepics={this.state.sharepics} />
        )
    }

    state = {
      sharepics: []
    };

    componentDidMount() {
        fetch('https://backend.startklar.bayern/api/sharepics')
            .then(res => res.json())
            .then((data) => {
                this.setState({ sharepics: data })
            })
            .catch(console.log)
    }
}

export default Home;