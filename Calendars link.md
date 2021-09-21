# Google calendar base url : https://calendar.google.com/calendar/r/eventedit
params : 
* text (event name) : string
* dates (ISO format, must have start and end) : start/end
* ctz (timezone such as Europe/Paris)
* details -useless-
* location (event's one)
* add (coma separated list of guests emails) -useless-

example : https://calendar.google.com/calendar/render?action=TEMPLATE&text=Birthday&dates=20201231T193000Z/20201231T223000Z&details=With%20clowns%20and%20stuff&location=North%20Pole

# Outlook calendar base url : https://outlook.live.com/owa/?path=%2Fcalendar%2Faction%2Fcompose&rru=addevent
params : 
* startdt : ISO format
* enddt : ISO format
* subject (event name) : string
* body (description) : string
* location : string

example : https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&startdt=2021-01-22T14:30:00.000Z&enddt=2021-01-23T17:00:00.000Z&subject=This%20is%20a%20title&body=This%20the%20event's%20desc&location=internet

# Yahoo calendar base url : https://calendar.yahoo.com/?v=60
params : 
* title : string
* st (start date) : ISO format
* et (end date) : ISO format
* desc : string
* in_loc :string

example : https://calendar.yahoo.com/?v=60&title=This%20is%20a%20title&st=20210122T143000Z&dur=2630&desc=This%20the%20event's%20desc&in_loc=internet

# ICS file

example : 
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:19970714T170000Z
DTEND:19970715T035959Z
SUMMARY:Bastille Day Party
GEO:48.85299;2.36885
END:VEVENT
END:VCALENDAR


Apple, Outlook sofware & any calendars software : ics file

Useful links : 
* https://dencode.com/date/iso8601