/* global gapi */

import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Modal from 'react-bootstrap/Modal';
// import Form from 'react-bootstrap/Form';
import "react-datepicker/dist/react-datepicker.css";
import { connect } from 'react-redux';
import { setCalendars, toggleHideCalendar, setConfig, setMyQCalendar } from '../store/actions';

import Modal from "@material-ui/core/Modal";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';


function AddEvent(props) {
  console.log('addEvent', { props });
  const [attendeeEmail, setAttendeeEmail] = useState([])
  const [show, setShow] = useState(false);
  const [eventName, setEventName] = useState('');
  const [date] = useState(new Date());
  const [location, setEventLocation] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState(new Date());
  const [displayRecurringEvent, setDisplayRecurringEvent] = useState(false);
  // const [recurringValue, setRecurringValue] = useState(false);

  console.log({ eventName })
  const handleClose = () => setShow(false);

  const saveEvent = () => {

    console.log({ value }, 'ISO:', value.toISOString(), 'date:', date);
    const event = {
      'summary': eventName,
      'location': location,
      'description': description,
      'start': {
        'dateTime': value.toISOString(),//'2015-05-28T09:00:00-07:00', 2021-07-10T21:20:24.453Z
        'timeZone': date.toString().match(/[A-Z]{3}/)[0]
      },
      'end': {
        'dateTime': value.toISOString(),//'2015-05-28T17:00:00-07:00', TODO - add an hour
        'timeZone': date.toString().match(/[A-Z]{3}/)[0]
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
  }

  const today = new Date().toISOString().split('T')[0];
  const now = new Date().toISOString().split('T')[1].substring(0, 5);
  const oneHour = new Date(new Date().setHours(new Date().getHours() + 1)).toISOString().split('T')[1].substring(0, 5);

  // const year = new Date().getUTCFullYear();
  // const month = new Date().getUTCMonth().length < 2 ? `'0'+${new Date().getUTCMonth()}` : new Date().getUTCMonth();
  // const day = new Date().getUTCDay().length < 2 ? `'0'+${new Date().getUTCDay()}` : new Date().getUTCDay();
  // const today = `${year}-${month}-${day}`;

  return (
    <>
      <Button variant="outlined" onClick={() => setShow(true)}>Add Event To MyQ</Button>

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
                type="date"
                defaultValue={today}
                id="event-date"
                label="Event Date" />
              <TextField
                label="Event Start Time"
                type="time"
                defaultValue={now}
                id="event-start-time" />
              <TextField
                label="Event End Time"
                type="time"
                defaultValue={oneHour}
                id="event-end-time" />
              <Button onClick={() => setShow(false)} variant="outlined" color="secondary">Close</Button>
              <Button onClick={saveEvent} variant="outlined" color="primary">Save changes</Button>
            </form>
          </CardContent>
        </Card>
      </Modal>
      {/* <Modal show={show} onHide={handleClose} animation={true}>
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Add Event</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group controlId="formEventName">
                <Form.Label>Event Name</Form.Label>
                <Form.Control onChange={(e) => setEventName(e.target.value)} type="text" placeholder="Enter event" />
              </Form.Group>

              <Form.Group controlId="formEventName">
                <Form.Label>Location</Form.Label>
                <Form.Control onChange={(e) => setEventLocation(e.target.value)} type="text" placeholder="Location" />
              </Form.Group>

              <Form.Group controlId="formEventName">
                <Form.Label>Description</Form.Label>
                <Form.Control onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Description" />
              </Form.Group>

              <Form.Group controlId="formDate">
                <label>Date</label>
                <DateTimePicker
                  onChange={setValue}
                  value={value}
                  disableClock={true}
                />
              </Form.Group>
              <Form.Group controlId="formEmailInvite">
                <label>Email of Attendee</label>
                <Form.Control onChange={(e) => setAttendeeEmail([{ email: e.target.value }])} type="text" placeholder="Enter Attendee Email" />
              </Form.Group>
              <Form.Group controlId="formRecurringEvent">
                <Form.Check onClick={() => setDisplayRecurringEvent(!displayRecurringEvent)} type="checkbox" label="Recurring Event" />
              </Form.Group>

              {displayRecurringEvent &&
                <Form.Group controlId="formRecurringEventDetails">
                  <Form.Control as="select">
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                    <option>Yearly</option>
                  </Form.Control>

                  <Form.Label>Ends On</Form.Label> */}
      {/* <DateTimePicker
                    onChange={setRecurringValue}
                    value={recurringValue}
                    disableClock={true}
                  /> */}
      {/* </Form.Group>
              }
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={() => setShow(false)} variant="outlined" color="secondary">Close</Button>
            <Button onClick={saveEvent} variant="outlined" color="primary">Save changes</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal> */}
    </>
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
