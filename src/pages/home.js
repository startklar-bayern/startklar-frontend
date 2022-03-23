import React, {Component} from 'react';
import './../assets/styles/home.scss';
import Sharepics from '../components/sharepics';
import FaqAccordion from '../components/faq-accordion';
import FaqQuestion from '../components/faq-question';
import Newsletter from '../components/newsletter';
import Calendar from '../components/calendar';

class Home extends Component {
    render() {
        return (
            <div>
                <section class="home fullscreen container-fluid">
                    <Calendar />
                    <Newsletter />
                </section>
                <section class="faqs container">
                    <FaqAccordion faqs={this.state.faqs} />
                    <FaqQuestion />
                </section>
                <section class="sharepics container">
                    <Sharepics sharepics={this.state.sharepics} />
                </section>
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