/* global gapi */

import React, { useState } from 'react';
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
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';


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
  const [recurringFrequency, setRecurringFrequency] = useState('ONCE');
  const [recurringEndDate, setRecurringEndDate] = useState(today)

  // console.log({ attendeeEmail })

  const startDateTime = moment(`${eventDate} ${eventStartTime}`, 'YYYY-MM-DD HH:mm').format();
  const endDateTime = moment(`${eventDate} ${eventEndTime}`, 'YYYY-MM-DD HH:mm').format();
  const handleClose = () => setShow(false);
  const handleEndDate = (e) => {
    const formattedDate = new Date(e.target.value).toISOString().replace(/[-:\.]/g, '');
    const formattedDateStart = formattedDate.substring(0, formattedDate.length - 4);
    const newformattedDate = `${formattedDateStart}Z`;
    console.log({ newformattedDate, formattedDateStart });
    setRecurringEndDate(newformattedDate);
  }

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
      'recurrence': [
        `RRULE:FREQ=${recurringFrequency};UNTIL=${recurringEndDate}`
        // "RRULE:FREQ=WEEKLY;UNTIL=20210917T0000000Z"
        // "RRULE:FREQ=WEEKLY;UNTIL=20110701T170000Z",

      ],
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
              {displayRecurringEvent &&
                <FormControl>
                  <InputLabel>Repeats</InputLabel>
                  <Select
                    // value={age}
                    onChange={(e) => setRecurringFrequency(e.target.value)}
                  >
                    <MenuItem value="DAILY">Daily</MenuItem>
                    <MenuItem value="WEEKLY">Weekly</MenuItem>
                    <MenuItem value="MONTHLY">Monthly</MenuItem>
                    <MenuItem value="YEARLY">Yearly</MenuItem>
                  </Select>

                  <TextField
                    onChange={handleEndDate}
                    type="date"
                    defaultValue={today}
                    id="recurring-event-date"
                    label="End Date" />
                </FormControl>
              }
              <Button onClick={() => setShow(false)} variant="outlined" color="secondary">Close</Button>
              <Button onClick={saveEvent} variant="outlined" color="primary">Save changes</Button>
            </form>
          </CardContent>
        </Card>
      </Modal>
    </div>
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
