import React, {Component} from 'react';
import Sharepics from '../components/sharepics';
import Faq from '../components/faq';

class Home extends Component {
    render() {
        return (
            <div>
                <Faq faqs={this.state.faqs} />
                <Sharepics sharepics={this.state.sharepics} />
            </div>
        )
    }

    state = {
      sharepics: [],
      faqs: [],
    };

    componentDidMount() {
        fetch('https://backend.startklar.bayern/api/sharepics')
            .then(res => res.json())
            .then((data) => {
                this.setState({ sharepics: data })
            })
            .catch(console.log)
        fetch('https://backend.startklar.bayern/api/faqs')
            .then(res => res.json())
            .then((data) => {
                this.setState({ faqs: data })
            })
            .catch(console.log)
    }
}

export default Home