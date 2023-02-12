import React from 'react';
import {getAllPeople} from "./toolbox";

export default class Pricing extends React.Component {
    regularPrice = 65;
    siblingPrice = 55;
    helferPrice = 35;


    render() {
        let {values, isHelfer} = this.props;

        let pricing = this.calculatePricing(values, isHelfer);

        return (
            <div className="field-object">
                <h3>Teilnahmegebühr</h3>
                <table width="100%">
                    <tbody>
                    {!isHelfer && <tr>
                        <td>{pricing.regular.amount}x</td>
                        <td>Regulärer Preis ({pricing.regular.price.toLocaleString('de-DE', {
                            style: 'currency',
                            currency: 'EUR',
                            maximumFractionDigits: 0
                        })})
                        </td>
                        <td className="text-end">{pricing.regular.sum.toLocaleString('de-DE', {
                            style: 'currency',
                            currency: 'EUR',
                            maximumFractionDigits: 0
                        })}</td>
                    </tr>}
                    {!isHelfer && <tr>
                        <td>{pricing.sibling.amount}x</td>
                        <td>Geschwister-Preis ({pricing.sibling.price.toLocaleString('de-DE', {
                            style: 'currency',
                            currency: 'EUR',
                            maximumFractionDigits: 0
                        })})
                        </td>
                        <td className="text-end pb-2">{pricing.sibling.sum.toLocaleString('de-DE', {
                            style: 'currency',
                            currency: 'EUR',
                            maximumFractionDigits: 0
                        })}</td>
                    </tr>}
                    {isHelfer && <tr>
                        <td>{pricing.helfer.amount}x</td>
                        <td>Helfer-Preis ({pricing.helfer.price.toLocaleString('de-DE', {
                            style: 'currency',
                            currency: 'EUR',
                            maximumFractionDigits: 0
                        })})
                        </td>
                        <td className="text-end pb-2">{pricing.helfer.sum.toLocaleString('de-DE', {
                            style: 'currency',
                            currency: 'EUR',
                            maximumFractionDigits: 0
                        })}</td>
                    </tr>}

                    <tr className="fs-5 border-top">
                        <td colSpan="2">Summe</td>
                        <td className="text-end">{pricing.sum.toLocaleString('de-DE', {
                            style: 'currency',
                            currency: 'EUR',
                            maximumFractionDigits: 0
                        })}</td>
                    </tr>
                    </tbody>
                </table>

                <p className="small">Du kannst bis zum Anmeldeschluss am
                    16.04.2023 {isHelfer ? 'deine Daten bearbeiten.' : 'die Daten der Teilnehmenden online bearbeiten, weitere Personen hinzufügen oder bestehende Personen entfernen.'} Erst
                    nach dem Anmeldeschluss erhältst du die endgültige Rechnung per E-Mail, die du dann innerhalb von 2
                    Wochen überweisen musst.</p>
            </div>

        );
    }

    calculatePricing(values, isHelfer) {
        let pricing = {
            regular: {
                amount: 0,
                price: this.regularPrice,
                sum: 0,
            },
            sibling: {
                amount: 0,
                price: this.siblingPrice,
                sum: 0,
            },
            helfer: {
                amount: 0,
                price: this.helferPrice,
                sum: 0,
            },
            sum: 0,
        };

        if (!isHelfer) {
            let people = getAllPeople(values);

            people.forEach(person => {
                if (person.geschwisterkind) {
                    pricing.sibling.amount++;
                    pricing.sibling.sum += pricing.sibling.price;
                    pricing.sum += pricing.sibling.price;
                } else {
                    pricing.regular.amount++;
                    pricing.regular.sum += pricing.regular.price;
                    pricing.sum += pricing.regular.price;
                }
            });
        } else {
            pricing.helfer.amount = 1;
            pricing.helfer.sum += pricing.helfer.price;
            pricing.sum += pricing.helfer.price;
        }

        return pricing;
    }
}