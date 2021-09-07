/* global gapi */

import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Modal from 'react-bootstrap/Modal';
// import Form from 'react-bootstrap/Form';
import "react-datepicker/dist/react-datepicker.css";
import { connect } from 'react-redux';
import { setCalendars, toggleHideCalendar, setConfig, setMyQCalendar } from '../store/actions';
import moment from 'moment';

import Modal from "@material-ui/core/Modal";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import './addEvent.scss';


function AddEvent(props) {
  //console.log('addEvent', { props });

  const today = new Date().toISOString().split('T')[0];
  const now = new Date().toISOString().split('T')[1].substring(0, 5);
  const oneHour = new Date(new Date().setHours(new Date().getHours() + 1)).toISOString().split('T')[1].substring(0, 5);

  const [attendeeEmail, setAttendeeEmail] = useState([])
  const [show, setShow] = useState(false);
  const [eventName, setEventName] = useState('');
  const [location, setEventLocation] = useState('');
  const [description, setDescription] = useState('');
  const [eventDate, setEventDate] = useState(today);
  const [eventStartTime, setEventStartTime] = useState(now);
  const [eventEndTime, setEventEndTime] = useState(oneHour);
  const [displayRecurringEvent, setDisplayRecurringEvent] = useState(false);

  // const [recurringValue, setRecurringValue] = useState(false);

  console.log({ attendeeEmail })

  const startDateTime = moment(`${eventDate} ${eventStartTime}`, 'YYYY-MM-DD HH:mm').format();
  const endDateTime = moment(`${eventDate} ${eventEndTime}`, 'YYYY-MM-DD HH:mm').format();
  const handleClose = () => setShow(false);

  const saveEvent = () => {

    const event = {
      'summary': eventName,
      'location': location,
      'description': description,
      'start': {
        'dateTime': startDateTime,//'2015-05-28T09:00:00-07:00', 2021-07-10T21:20:24.453Z
        'timeZone': props.myQCalendar.timeZone// default Quimbly time zone
      },
      'end': {
        'dateTime': endDateTime,//'2015-05-28T17:00:00-07:00', TODO - add an hour
        'timeZone': props.myQCalendar.timeZone
      },
      // 'recurrence': [
      //   'RRULE:FREQ=DAILY;COUNT=2'
      // ],
      'attendees': attendeeEmail,
      // 'reminders': {
      //   'useDefault': false,
      //   'overrides': [
      //     { 'method': 'email', 'minutes': 24 * 60 },
      //     { 'method': 'popup', 'minutes': 10 }
      //   ]
      // }
    };

    console.log({ event })

    const request = gapi.client.calendar.events.insert({
      'calendarId': props.myQCalendar.id,
      'resource': event
    });

    request.execute(function (event) {
      console.log('Event created: ' + event.htmlLink);
    });

    handleClose();
  }

  return (
    <div id="addEvent">
      <Button variant="outlined" onClick={() => setShow(true)}>Add Event To Quimbly</Button>

      <Modal
        open={show}
        onClose={handleClose}
      >
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" component="h2">Add Event</Typography>
            <form>
              <TextField onChange={(e) => setEventName(e.target.value)} id="event-name" label="Event Name" />
              <TextField onChange={(e) => setEventLocation(e.target.value)} id="event-location" label="Event Location" />
              <TextField onChange={(e) => setDescription(e.target.value)} id="event-description" label="Event Description" />
              <TextField
                onChange={(e) => setEventDate(e.target.value)}
                type="date"
                defaultValue={today}
                id="event-date"
                label="Event Date" />
              <TextField
                onChange={(e) => setEventStartTime(e.target.value)}
                label="Event Start Time"
                type="time"
                defaultValue={now}
                id="event-start-time" />
              <TextField
                onChange={(e) => setEventEndTime(e.target.value)}
                label="Event End Time"
                type="time"
                defaultValue={oneHour}
                id="event-end-time" />
              <TextField
                onChange={(e) => setAttendeeEmail([...attendeeEmail, { email: e.target.value }])}
                label="Email of Attendee"
                id="attendee-email" />
              <FormControl component="fieldset">
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox onChange={() => setDisplayRecurringEvent(!displayRecurringEvent)} />}
                    label="Recurring Event"
                  />
                </FormGroup>
              </FormControl>
              <Button onClick={() => setShow(false)} variant="outlined" color="secondary">Close</Button>
              <Button onClick={saveEvent} variant="outlined" color="primary">Save changes</Button>
            </form>
          </CardContent>
        </Card>
      </Modal>
    </div>



    // <Form.Group controlId="formRecurringEvent">
    //   <Form.Check onClick={() => setDisplayRecurringEvent(!displayRecurringEvent)} type="checkbox" label="Recurring Event" />
    // </Form.Group>

    // {displayRecurringEvent &&
    //   <Form.Group controlId="formRecurringEventDetails">
    //     <Form.Control as="select">
    //       <option>Daily</option>
    //       <option>Weekly</option>
    //       <option>Monthly</option>
    //       <option>Yearly</option>
    //     </Form.Control>

    //     <Form.Label>Ends On</Form.Label> */}
    /* <DateTimePicker
                  onChange={setRecurringValue}
                  value={recurringValue}
                  disableClock={true}
  //               /> */
    // </Form.Group>
    //           }
    //         </Form>
    //       </Modal.Body>

    //       <Modal.Footer>
    //         <Button onClick={() => setShow(false)} variant="outlined" color="secondary">Close</Button>
    //         <Button onClick={saveEvent} variant="outlined" color="primary">Save changes</Button>
    //       </Modal.Footer>
    //     </Modal.Dialog>
    //   </Modal> 
    //</div>
  )
}

const mapDispatchToProps = { setCalendars, toggleHideCalendar, setConfig, setMyQCalendar };

const mapStateToProps = state => {
  return ({
    calendars: state.reduxData.calendars,
    config: state.reduxData.config,
    myQCalendar: state.reduxData.myQCalendar
  })
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddEvent);
