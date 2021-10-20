/* global gapi */

import React, { useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { connect } from 'react-redux';
import { setCalendars, toggleHideCalendar, setConfig, setQuimblyCalendar, setSchedule } from '../store/actions';
import moment from 'moment';
import findFirstAvailable from './helperFunctions/findFirstAvailable';
import generateSchedule from './helperFunctions/generateSchedule';

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

  const today = new Date().toISOString().split('T')[0];
  let nowHours = new Date().getHours();
  let nowMinutes = new Date().getMinutes();

  let oneHourHour = `${nowHours + 1}`.padStart(2, '0');
  let nowHoursString = `${nowHours}`.padStart(2, '0');

  const nowMinutesString = `${nowMinutes}`.padStart(2, '0');

  const nowString = `${nowHoursString}:${nowMinutesString}`;
  const oneHourString = `${oneHourHour}:${nowMinutesString}`;

  let event = {};

  // console.log('addEvent', { props, today, nowString, oneHourString });

  const [attendeeEmail, setAttendeeEmail] = useState([])
  const [show, setShow] = useState(false);
  const [eventName, setEventName] = useState('');
  const [location, setEventLocation] = useState('');
  const [description, setDescription] = useState('');
  const [eventDate, setEventDate] = useState(today);
  const [eventStartTime, setEventStartTime] = useState(nowString);
  const [eventEndTime, setEventEndTime] = useState(oneHourString);
  const [displayRecurringEvent, setDisplayRecurringEvent] = useState(false);
  const [recurringFrequency, setRecurringFrequency] = useState(false);
  const [recurringEndDate, setRecurringEndDate] = useState(today);
  const [firstAvailable, setFirstAvailable] = useState(true);
  const [hourDuration, setHourDuration] = useState(0);
  const [minuteDuration, setMinuteDuration] = useState(10);


  // console.log({ attendeeEmail })

  const startDateTime = moment(`${eventDate} ${eventStartTime}`, 'YYYY-MM-DD HH:mm').format();
  const endDateTime = moment(`${eventDate} ${eventEndTime}`, 'YYYY-MM-DD HH:mm').format();
  const handleClose = () => {
    setShow(false);
    setDisplayRecurringEvent(false);
    setRecurringFrequency(false);
    setAttendeeEmail([]);
    setHourDuration(0);
    setMinuteDuration(10);
    setFirstAvailable(true);
  }
  const handleEndDate = (e) => {
    const formattedDate = new Date(e.target.value).toISOString().replace(/[-:\.]/g, '');
    const formattedDateStart = formattedDate.substring(0, formattedDate.length - 4);
    const newformattedDate = `${formattedDateStart}Z`;
    console.log({ newformattedDate, formattedDateStart });
    setRecurringEndDate(newformattedDate);
  }

  const saveEvent = () => {

    event = {
      ...event,
      'summary': eventName,
      'location': location,
      'description': description,
      'start': {
        'dateTime': startDateTime,//'2015-05-28T09:00:00-07:00', 2021-07-10T21:20:24.453Z
        'timeZone': props.QuimblyCalendar.timeZone// default Quimbly time zone
      },
      'end': {
        'dateTime': endDateTime,//'2015-05-28T17:00:00-07:00', TODO - add an hour
        'timeZone': props.QuimblyCalendar.timeZone
      },
      'attendees': attendeeEmail,
      // 'reminders': {
      //   'useDefault': false,
      //   'overrides': [
      //     { 'method': 'email', 'minutes': 24 * 60 },
      //     { 'method': 'popup', 'minutes': 10 }
      //   ]
      // }
    };

    if (firstAvailable) {
      const duration = hourDuration + minuteDuration;
      const firstAvailableBlock = findFirstAvailable(duration, props.schedule);
      event.start.dateTime = firstAvailableBlock.startTime;
      const endMinutes = new Date(firstAvailableBlock.startTime).getMinutes() + duration;
      const newEndTimeString = `${firstAvailableBlock.startTime.split(':')[0]}:${endMinutes}:${firstAvailableBlock.startTime.split(':')[2]}:00`;
      event.end.dateTime = newEndTimeString;
    }

    if (recurringFrequency) {
      event.recurrence = [
        `RRULE:FREQ=${recurringFrequency};UNTIL=${recurringEndDate}`
      ]
    }

    console.log({ event })

    const request = gapi.client.calendar.events.insert({
      'calendarId': props.QuimblyCalendar.id,
      'resource': event
    });

    request.execute(function (event) {
      console.log('Event created: ' + event.htmlLink);
    });

    // update Redux with the new schedule
    const updatedSchedule = generateSchedule(props.events);
    props.setSchedule(updatedSchedule);

    // update state
    props.updateEvents(event);

    handleClose();
  }

  return (
    <div id="add-event">
      <Button variant="outlined" onClick={() => setShow(true)}>Add Event To Quimbly</Button>

      <Modal
        open={show}
        onClose={handleClose}
      >
        {today && oneHourString ?
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5" component="h2">Add Event</Typography>
              <form>
                <TextField onChange={(e) => setEventName(e.target.value)} id="event-name" label="Event Name" />
                <TextField onChange={(e) => setEventLocation(e.target.value)} id="event-location" label="Event Location" />
                <TextField onChange={(e) => setDescription(e.target.value)} id="event-description" label="Event Description" />

                {firstAvailable &&
                  <>
                    <FormControl fullWidth>
                      <InputLabel id="event-duration">How Many Hours Is Your Event</InputLabel>
                      <Select
                        value={hourDuration}
                        label="Hour"
                        onChange={(e) => setHourDuration(e.target.value)}
                      >
                        <MenuItem value={0}>0 Hours</MenuItem>
                        <MenuItem value={60}>1 Hour</MenuItem>
                        <MenuItem value={120}>2 Hours</MenuItem>
                        <MenuItem value={180}>3 Hours</MenuItem>
                        <MenuItem value={240}>4 Hours</MenuItem>
                        <MenuItem value={300}>5 Hours</MenuItem>
                        <MenuItem value={360}>6 Hours</MenuItem>
                        <MenuItem value={420}>7 Hours</MenuItem>
                        <MenuItem value={480}>8 Hours</MenuItem>
                        <MenuItem value={540}>9 Hours</MenuItem>
                        <MenuItem value={600}>10 Hours</MenuItem>
                        <MenuItem value={660}>11 Hours</MenuItem>
                        <MenuItem value={720}>12 Hours</MenuItem>
                        <MenuItem value={780}>13 Hours</MenuItem>
                        <MenuItem value={840}>14 Hours</MenuItem>
                        <MenuItem value={900}>15 Hours</MenuItem>
                        <MenuItem value={960}>16 Hours</MenuItem>
                        <MenuItem value={1020}>17 Hours</MenuItem>
                        <MenuItem value={1080}>18 Hours</MenuItem>
                        <MenuItem value={1140}>19 Hours</MenuItem>
                        <MenuItem value={1200}>20 Hours</MenuItem>
                        <MenuItem value={1260}>21 Hours</MenuItem>
                        <MenuItem value={1320}>22 Hours</MenuItem>
                        <MenuItem value={1380}>23 Hours</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl fullWidth>
                      <InputLabel id="event-duration">How Many Minutes Is Your Event</InputLabel>
                      <Select
                        value={minuteDuration}
                        label="Minutes"
                        onChange={(e) => setMinuteDuration(e.target.value)}
                      >
                        <MenuItem value={0}>0</MenuItem>
                        <MenuItem value={5}>5 Minutes</MenuItem>
                        <MenuItem value={10}>10 Minutes</MenuItem>
                        <MenuItem value={15}>15 Minutes</MenuItem>
                        <MenuItem value={20}>20 Minutes</MenuItem>
                        <MenuItem value={25}>25 Minutes</MenuItem>
                        <MenuItem value={30}>30 Minutes</MenuItem>
                        <MenuItem value={35}>35 Minutes</MenuItem>
                        <MenuItem value={40}>40 Minutes</MenuItem>
                        <MenuItem value={45}>45 Minutes</MenuItem>
                        <MenuItem value={50}>50 Minutes</MenuItem>
                        <MenuItem value={55}>55 Minutes</MenuItem>
                      </Select>
                    </FormControl>
                  </>
                }
                <FormControlLabel
                  control={<Checkbox checked={firstAvailable} onChange={(e) => setFirstAvailable(!firstAvailable)} />}
                  label="Find First Available Time"
                />

                {!firstAvailable &&
                  <>
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
                      defaultValue={nowString}
                      id="event-start-time" />
                    <TextField
                      onChange={(e) => setEventEndTime(e.target.value)}
                      label="Event End Time"
                      type="time"
                      defaultValue={oneHourString}
                      id="event-end-time" />
                  </>
                }
                {/* <TextField
                onChange={(e) => setAttendeeEmail([...attendeeEmail, { email: e.target.value }])}
                label="Email of Attendee"
                id="attendee-email" /> */}
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
          : ''}
      </Modal>
    </div>
  )
}

const mapDispatchToProps = { setCalendars, toggleHideCalendar, setConfig, setQuimblyCalendar, setSchedule };

const mapStateToProps = state => {
  // console.log('ADD EVENT: REDUX', state)
  return ({
    calendars: state.reduxData.calendars,
    config: state.reduxData.config,
    QuimblyCalendar: state.reduxData.QuimblyCalendar,
    events: state.reduxData.events,
    schedule: state.reduxData.schedule
  })
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddEvent);
