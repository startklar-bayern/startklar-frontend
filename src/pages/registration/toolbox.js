export const getReferencedPersonByUuid = (values, uuid) => {
    // Get all current people
    let people = [values.leitung];
    people.push(...values.teilnehmer);

    people = people.filter(value => value !== null);

    // Find referenced person
    const result = people.filter(person => person?.id === uuid);

    return result.length === 1 ? result[0] : false;
}

export const getReferencingPeople = (values, uuid) => {
    // Get all current people
    let people = [values.leitung];
    people.push(...values.teilnehmer);

    people = people.filter(value => value !== null);

    return people.filter(person => person.aufsichtsperson === uuid);
}