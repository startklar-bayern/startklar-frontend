import React from 'react'
import {Table, Col, Row} from 'react-bootstrap'
import './../assets/styles/schedule.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCross, faUserGroup, faFire, faUserCheck, faTrain, faTents, faTentArrowDownToLine, faMusic,  faPeopleRoof, faMugSaucer, faFlag, faUtensils, faFlagCheckered, faHandshake} from '@fortawesome/free-solid-svg-icons'


const Schedule = () => {
    return (
      <div>
        <Row>
          <Col>
            <center><h2 className="mb-4">Zeitplan</h2></center>
          </Col>
        </Row>
        <Row>
            <Col lg={3} md={6}>
                <Table bordered>
                  <thead>
                    <tr>
                      <th className="text-center" colSpan={2}><h1>Do</h1><h4>08.06.2023</h4></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>13:00 - 16:00 Uhr</td>
                      <td>
                        <FontAwesomeIcon icon={faTrain}/>Anreise<br/>
                        <FontAwesomeIcon icon={faUserCheck}/>Check-In<br/>
                        <FontAwesomeIcon icon={faTents}/>Zelte aufbauen<br/>
                        <FontAwesomeIcon icon={faFlag}/>Fahne gestalten
                      </td>
                    </tr>
                    <tr>
                      <td>17:00 Uhr</td>
                      <td><FontAwesomeIcon icon={faHandshake}/>Begrüßung</td>
                    </tr>
                    <tr>
                      <td>18:00 Uhr</td>
                      <td><FontAwesomeIcon icon={faUtensils}/>Abendessen</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>
                        <FontAwesomeIcon icon={faUserGroup}/>gemütliches Beisammensein<br/>
                        <FontAwesomeIcon icon={faFire}/>Lagerfeuer</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
              <Col lg={3} md={6}>
                <Table striped bordered>
                  <thead>
                    <tr>
                      <th className="text-center" colSpan={2}><h1>Fr</h1><h4>09.06.2023</h4></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>07:30 Uhr</td>
                      <td><FontAwesomeIcon icon={faMugSaucer}/>Frühstück</td>
                    </tr>
                    <tr>
                      <td>08:45 Uhr</td>
                      <td><FontAwesomeIcon icon={faCross}/>Morgenimpuls</td>
                    </tr>
                    <tr>
                      <td>09:00 Uhr </td>
                      <td><FontAwesomeIcon icon={faFlagCheckered}/>Programmstart</td>
                    </tr>
                    <tr>
                      <td>09:15 Uhr </td>
                      <td><FontAwesomeIcon icon={ faPeopleRoof}/>Workshops I.</td>
                    </tr>
                    <tr>
                      <td>12:00 Uhr </td>
                      <td><FontAwesomeIcon icon={faUtensils}/>Mittagessen</td>
                    </tr>
                    <tr>
                      <td>14:00 Uhr</td>
                      <td><FontAwesomeIcon icon={ faPeopleRoof}/>Workshops II.</td>
                    </tr>
                    <tr>
                      <td>17:00 Uhr</td>
                      <td><FontAwesomeIcon icon={faUtensils}/>Abendessen</td>
                    </tr>
                    <tr>
                      <td>20:15 Uhr </td>
                      <td><FontAwesomeIcon icon={faFlag}/>Capture the Flag</td>
                    </tr>
                    <tr>
                      <td>23:00 Uhr </td>
                      <td><FontAwesomeIcon icon={faCross}/>Abendimpuls</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
              <Col lg={3} md={6}>
                <Table striped bordered>
                  <thead>
                    <tr>
                     <th className="text-center" colSpan={2}><h1>Sa</h1><h4>10.06.2023</h4></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>07:30 Uhr</td>
                      <td><FontAwesomeIcon icon={faMugSaucer}/>Frühstück</td>
                    </tr>
                    <tr>
                      <td>08:45 Uhr</td>
                      <td><FontAwesomeIcon icon={faCross}/>Morgenimpuls</td>
                    </tr>
                    <tr>
                      <td>09:00 Uhr </td>
                      <td><FontAwesomeIcon icon={faFlagCheckered}/>Programmstart</td>
                    </tr>
                    <tr>
                      <td>09:15 Uhr </td>
                      <td><FontAwesomeIcon icon={ faPeopleRoof}/>Workshops III.</td>
                    </tr>
                    <tr>
                      <td>12:00 Uhr </td>
                      <td><FontAwesomeIcon icon={faUtensils}/>Mittagessen</td>
                    </tr>
                    <tr>
                      <td>14:00 Uhr</td>
                      <td><FontAwesomeIcon icon={ faPeopleRoof}/>Workshops IV.</td>
                    </tr>
                    <tr>
                      <td>17:00 Uhr</td>
                      <td><FontAwesomeIcon icon={faUtensils}/>Abendessen</td>
                    </tr>
                    <tr>
                      <td>20:15 Uhr </td>
                      <td><FontAwesomeIcon icon={faMusic}/>Partyabend & Band</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
              <Col lg={3} md={6}>
                <Table striped bordered>
                  <thead>
                    <tr>
                      <th className="text-center" colSpan={2}><h1>So</h1><h4>11.06.2023</h4></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>07:30 Uhr</td>
                      <td><FontAwesomeIcon icon={faMugSaucer}/>Frühstück</td>
                    </tr>
                    <tr>
                      <td>09:00 Uhr</td>
                      <td><FontAwesomeIcon icon={faFlagCheckered}/>Programmstart</td>
                    </tr>
                    <tr>
                      <td>10:00 Uhr</td>
                      <td><FontAwesomeIcon icon={faCross}/>Gottesdienst</td>
                    </tr>
                    <tr>
                      <td>12:00 Uhr</td>
                      <td><FontAwesomeIcon icon={faTentArrowDownToLine}/>Abbau  & Abbreise</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
          </Row>
        </div>
    )
};

export default Schedule