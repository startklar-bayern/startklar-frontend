import moment from "moment/moment";
import * as Yup from "yup";

const underageRequired = fieldName => {
    return {
        name: 'required-when-underage',
        message: fieldName + ' ist erforderlich weil die Person am Festival unter 18 Jahre alt ist',
        test: (value, ctx) => moment(ctx.parent.geburtsdatum).isSameOrBefore('2005-06-11') || (value !== null && value !== undefined),
    }
}

const referencedUuidExists = fieldName => {
    return {
        name: 'referenced-uuid-should-exist',
        message: 'Die ausgewählte Person im Feld '+ fieldName +' existiert nicht mehr',
        test: (value, ctx) => {
            if (value === undefined || value === null)
            {
                return true;
            }

            let person = getReferencedPersonByUuid(ctx.from[1].value, value);

            // Don't allow self reference
            if (person && person.uuid === ctx.parent.id) {
                return false;
            }

            return !!person;
        }
    }
}

const referencedUuidIsNotUnderage = fieldName => {
    return {
        name: 'referenced-uuid-should-not-be-underage',
        message: 'Die ausgewählte Person im Feld ' + fieldName + ' muss mindestens 18 Jahre alt sein',
        test: (value, ctx) => {
            if (value === undefined || value === null) {
                return true;
            }

            let person = getReferencedPersonByUuid(getDataFromContext(ctx), value);

            return moment(person.geburtsdatum).isSameOrBefore('2005-06-11')
        }
    }
}

const selectedSiblingShouldNotHaveASiblingSelected = {
    name: 'selected-sibling-should-not-have-a-sibling-selected',
    message: 'Die ausgewählte Person hat auch ein Geschwisterkind angegeben. Wähle hier nur die Person in der Familie aus, die den vollen Preis zahlt. Und bei der voll-zahlenden Person dann kein Geschwisterkind.',
    test: (value, ctx) => {
        if (value === undefined || value === null) {
            return true;
        }

        let person = getReferencedPersonByUuid(getDataFromContext(ctx), value);

        // Do not validate if empty
        if (!person) {
            return true;
        }

        return person.geschwisterkind === undefined || person.geschwisterkind === null;
    }
}

const aufsichtspersonLimit = max => {
    return {
        name: 'aufsichtsperson-limit',
        message: `Diese Person ist für mehr als ${max} Teilnehmer*innen deiner Gruppe als Aufsichtsperson gewählt. Ein Aufsichtsperson darf für maximal ${max} Personen zuständig sein.`,
        test: (value, ctx) => {
            let people = getReferencingPeople(getDataFromContext(ctx), ctx.parent?.id);

            if (people.length === 0) {
                return true;
            }

            return people.length < (max + 1);
        }
    }
}

const abfahrtNotBeforeAnkunft = {
    name: 'abfahrt-not-before-ankunft',
    message: 'Die Abfahrt darf nicht vor der Ankunft sein',
    test: (value, ctx) => {
        return moment(value).isAfter(ctx.parent?.ankunft);
    }
}

const requiredIfNotMitGruppe = message => {
    return {
        name: 'required-if-not-mit-gruppe',
        message: message,
        test: (value, ctx) => {
            if (!ctx.parent?.mit_gruppe) {
                return value !== null && value !== undefined;
            } else {
                return true;
            }
        }
    }
}

const requiredIfLeitung = message => {
    return {
        name: 'required-if-leitung',
        message: message,
        test: (value, ctx) => {
            if (isLeitung(value, ctx)) {
                return value !== null && value !== undefined;
            } else {
                return true;
            }
        }
    }
}

const maxIfLeitung = max => {
    return {
        name: 'max-if-leitung',
        message: 'Diese Gruppenleitung muss mindestens 18 Jahre alt sein',
        test: (value, ctx) => {
            if (isLeitung(value, ctx)) {
                return moment(value).isSameOrBefore(max);
            }
            return true;
        }
    }
}

const maxIfAufsichtsperson = max => {
    return {
        name: 'max-if-aufsichtsperson',
        message: 'Diese Person ist als Aufsichtsperson ausgewählt und muss deshalb mindestens 18 Jahre alt sein.',
        test: (value, ctx) => {
            let people = getReferencingPeople(getDataFromContext(ctx), ctx.parent.id);

            if (people.length > 0) {
                return moment(value).isSameOrBefore(max);
            }
            return true;
        }
    }
}

const isLeitung = (value, ctx) => {
    const uuid = ctx.parent?.id;
    const data = getDataFromContext(ctx);
    return data.leitung?.id === uuid;
}

const getReferencedPersonByUuid = (data, uuid) => {
    // Get all current people
    let people = [data.leitung];
    people.push(...data.teilnehmer);

    people = people.filter(value => value !== null);

    // Find referenced person
    const result = people.filter(person => person?.id === uuid);

    return result.length === 1 ? result[0] : false;
}

const getReferencingPeople = (data, uuid) => {
    // Get all current people
    let people = [data.leitung];
    people.push(...data.teilnehmer);

    people = people.filter(value => value !== null);

    return people.filter(person => person.aufsichtsperson === uuid);
}

const getDataFromContext = (ctx) => {
    return ctx.from[ctx.from.length - 1].value;
}

const anreiseSchema = Yup.object({
    typ: Yup.string().oneOf(['selbststaendig', 'mit_dv'], 'Anreise ist erforderlich').required('Anreise ist erforderlich'),
    alternative: Yup.string().oneOf(['direkt', 'zug_allersberg', 'zug_hilpoltstein'], 'Anreiseziel ist erforderlich').required('Anreiseziel ist erforderlich'),
    ankunft: Yup.date().min('2023-06-08T00:00', 'Das Ankunfts-Datum darf nicht vor dem 8.6.2023 liegen').max('2023-06-11T23:59', 'Das Ankunfts-Datum darf nicht nach dem 11.6.2023 liegen').required('Das Ankunfts-Datum ist erforderlich'),
    abfahrt: Yup.date()
        .min('2023-06-08T00:00', 'Das Abfahrts-Datum darf nicht vor dem 8.6.2023 liegen')
        .max('2023-06-11T23:59', 'Das Abfahrts-Datum darf nicht nach dem 11.6.2023 liegen')
        .required('Das Abfahrts-Datum ist erforderlich')
        .test(abfahrtNotBeforeAnkunft),
});

const personAnreiseSchema = Yup.object({
    mit_gruppe: Yup.boolean().required(),
    typ: Yup.string().oneOf(['selbststaendig', 'mit_dv'], 'Anreise ist erforderlich').test(requiredIfNotMitGruppe('Anreise ist erforderlich')),
    alternative: Yup.string().oneOf(['direkt', 'zug_allersberg', 'zug_hilpoltstein'], 'Anreiseziel ist erforderlich').test(requiredIfNotMitGruppe('Anreiseziel ist erforderlich')),
    ankunft: Yup.date().min('2023-06-08T00:00', 'Das Ankunfts-Datum darf nicht vor dem 8.6.2023 liegen').max('2023-06-11T23:59', 'Das Ankunfts-Datum darf nicht nach dem 11.6.2023 liegen').test(requiredIfNotMitGruppe('Das Ankunfts-Datum ist erforderlich')),
    abfahrt: Yup.date()
        .min('2023-06-08T00:00', 'Das Abfahrts-Datum darf nicht vor dem 8.6.2023 liegen')
        .max('2023-06-11T23:59', 'Das Abfahrts-Datum darf nicht nach dem 11.6.2023 liegen')
        .test(requiredIfNotMitGruppe('Das Abfahrts-Datum ist erforderlich'))
        .test(abfahrtNotBeforeAnkunft),
});

const personSchema = Yup.object({
    id: Yup.string().required('ID ist erforderlich').uuid('ID muss eine valide UUID sein'),
    vorname: Yup.string().required('Vorname ist erforderlich'),
    nachname: Yup.string().required('Nachname ist erforderlich'),
    geburtsdatum: Yup.date()
        .required('Geburtsdatum ist erforderlich')
        .max('2009-06-08', 'Das Mindestalter für Teilnehmende ist 14 Jahre')
        .min('1923-06-08', 'Bitte gib ein gültiges Geburtsdatum ein')
        .test(maxIfLeitung('2005-06-11'))
        .test(maxIfAufsichtsperson('2005-06-11')),
    geschlecht: Yup.string().required('Geschlecht ist erforderlich').oneOf(['m', 'w', 'd']),
    strasse: Yup.string().required('Straße ist erforderlich'),
    plz: Yup.string().required('Postleitzahl ist erforderlich'),
    ort: Yup.string().required('Ort ist erforderlich'),
    telefon: Yup.string().required('Telefon ist erforderlich'),
    mail: Yup.string().required('E-Mail ist erforderlich').email('Das ist keine korrekte E-Mail Adresse'),
    telefon_eltern: Yup.string().test(underageRequired('Telefonnummer einer erziehungsberechtigten Person')),
    mail_eltern: Yup.string().email('Das ist keine korrekte E-Mail Adresse').test(underageRequired('E-Mail Adresse einer erziehungsberechtigten Person')),
    aufsichtsperson: Yup.string()
        .uuid('ID der Aufsichtsperson muss eine valide UUID sein')
        .test(aufsichtspersonLimit(10))
        .test(underageRequired('Aufsichtsperson'))
        .test(referencedUuidExists('Aufsichtsperson'))
        .test(referencedUuidIsNotUnderage('Aufsichtsperson')),
    tshirt_groesse: Yup.number().required('T-Shirt Größe ist erforderlich').typeError('T-Shirt Größe ist erforderlich'),
    essen: Yup.string().required('Essensvorlieben ist erforderlich').oneOf(['normal', 'vegetarisch', 'vegan']),
    essen_anmerkungen: Yup.string(),
    anmerkungen: Yup.string(),
    geschwisterkind: Yup.string()
        .test(referencedUuidExists('Geschwisterkind'))
        .test(selectedSiblingShouldNotHaveASiblingSelected),
    anreise: personAnreiseSchema,
    termin_schutzkonzept: Yup.number()
        .integer('Termin Schutzkonzept ist kein erlaubter Wert')
        .typeError('Termin Schutzkonzept ist kein erlaubter Wert')
        .test(requiredIfLeitung('Termin Schutzkonzept ist für die Gruppenleitung erforderlich'))
});

const anmeldungSchema = Yup.object().shape({
    name: Yup.string().required('Name ist erforderlich'),
    dv: Yup.number().required('Diözesanverband ist erforderlich').integer('Diözesanverband ist erforderlich').typeError('Diözesanverband ist erforderlich'),
    anreise: anreiseSchema,
    leitung: personSchema,
    teilnehmer: Yup.array().of(personSchema),
    jugendschutzgesetz_akzeptiert: Yup.boolean().equals([true], 'Dies ist erforderlich').required('Dies ist erforderlich'),
    fuehrungszeugnis: Yup.boolean().equals([true], 'Dies ist erforderlich').required('Dies ist erforderlich'),
})

export default anmeldungSchema;