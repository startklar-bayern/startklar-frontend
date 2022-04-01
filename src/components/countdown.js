import React, {Component} from "react";
import moment from "moment";

export default class Countdown extends Component {
    state = {
        parts: []
    }

    eventdate = "2023-06-08 09:00:00";

    interval = null;

    constructor(props, context, state) {
        super(props, context);
        this.state = state;

        const parts = this.calculateCountdownParts();

        this.state = {
            parts: parts,
        };

        this.interval = setInterval(() => {
            const parts = this.calculateCountdownParts();

            this.setState({
                parts: parts,
            });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const separator = <span key="separator"> und </span>;
        let parts = this.state.parts.map(part => { return (<span key={part.key}><span className="h1">{part.value}</span> {part.label}</span>)});

        if (parts.length === 0) {
            return (
                <h2><span className="h1">START</span>KLAR!</h2>
            )
        }

        if (parts.length > 1) {
            parts.splice(1,0, separator);
        }

        return (
            <h2 className="mb-0">Noch {parts}</h2>
        );
    }

    calculateCountdownParts() {
        let diff = moment(this.eventdate).diff(moment());

        let duration = moment.duration(diff, 'milliseconds');

        const parts = [];

        if (Math.floor(duration.asDays()) > 0) {
            parts.push({
                key: 'day',
                value: Math.floor(duration.asDays()),
                label: duration.days() === 1 ? 'Tag' : 'Tage',
            });
        }

        if (duration.asDays() > 30) {
            return parts;
        }

        if (parts.length === 2) {
            return parts;
        }

        if (duration.hours() > 0) {
            parts.push({
                key: 'hour',
                value: duration.hours(),
                label: duration.hours() === 1 ? 'Stunde' : 'Stunden',
            });
        }

        if (parts.length === 2) {
            return parts;
        }

        if (duration.minutes() > 0) {
            parts.push({
                key: 'minute',
                value: duration.minutes(),
                label: duration.minutes() === 1 ? 'Minute' : 'Minuten',
            });
        }

        if (parts.length === 2) {
            return parts;
        }

        if (duration.seconds() > 0) {
            parts.push({
                key: 'second',
                value: duration.seconds(),
                label: duration.seconds() === 1 ? 'Sekunde' : 'Sekunden',
            });
        }

        if (parts.length === 2) {
            return parts;
        }

        return parts;
    }
}