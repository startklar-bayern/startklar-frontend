export const getReferencedPersonByUuid = (values, uuid) => {
    let people = getAllPeople(values);

    // Find referenced person
    const result = people.filter(person => person?.id === uuid);

    return result.length === 1 ? result[0] : false;
}

export const getReferencingPeople = (values, uuid) => {
    let people = getAllPeople(values);

    return people.filter(person => person.aufsichtsperson === uuid);
}

export const getAllPeople = (values) => {
    // Get all current people
    let people = [values.leitung];
    people.push(...values.teilnehmer);

    people = people.filter(value => value !== null);

    return people;
}