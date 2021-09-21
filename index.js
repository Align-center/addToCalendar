'use strict';

document.addEventListener('DOMContentLoaded', function loaded() {
    
    var addEvents = document.querySelectorAll('.addevent');

    //addEvent = each div.addevent
    for (let addEvent of addEvents) {

        function diff_minutes(dt1, dt2) {

            let diff = (new Date(dt2).getTime() - new Date(dt1).getTime()) / 1000;
            diff /= 60;

            return Math.abs(Math.round(diff));
        }

        function minsToHours(mins) {

            var num = mins;
            var hours = (num / 60);
            var rhours = Math.floor(hours);
            var minutes = (hours - rhours) * 60;
            var rminutes = Math.round(minutes);

            return rhours.toString() + rminutes.toString();
        }

        function formatTime (in_date, extend = false) {

            let date = new Date(in_date);

            if (extend == false) {

                return date.toISOString().replace(/-|:|\.\d+/g, '');
            }
            else {
                return date.toISOString();
            }
        };
    

        function generateEvent (addEvent) {

            let event = {
                start : formatTime(addEvent.children[0].innerText),
                end : formatTime(addEvent.children[1].innerText),
                title : addEvent.children[2].innerText,
                desc : addEvent.children[3].innerText,
                location : addEvent.children[4].innerText,
                ext_start : formatTime(addEvent.children[0].innerText, true),
                ext_end : formatTime(addEvent.children[1].innerText, true),
            }

            return event;
        }

        let event = generateEvent(addEvent);

        var calendarGenerator = {
            google : function (event) {

                let href = encodeURI([
                    'https://calendar.google.com/calendar/render?action=TEMPLATE',
                    '&text=' + event.title,
                    '&dates=' + event.start + '/' + event.end,
                    '&details=' + event.desc,
                    '&location=' + event.location
                ].join('')).replace('+', '%20');

                return href;
            },
            outlook : function (event) {

                let href = encodeURI([
                    'https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent',
                    "&startdt=" + event.ext_start,
                    "&enddt=" + event.ext_end,
                    "&subject=" + event.title,
                    "&body=" + event.desc,
                    "&location=" + event.location

                ].join('')).replace('+', '%20');

                return href;
            },
            yahoo : function (event) {


                let min_dur = diff_minutes(event.ext_end, event.ext_start);
                let duration = minsToHours(min_dur);

                let href = encodeURI([
                    'https://calendar.yahoo.com/?v=60',
                    '&title=' + event.title,
                    '&st=' + event.start,
                    '&dur=' + duration,
                    '&desc=' + event.desc,
                    '&in_loc=' + event.location
                ].join('')).replace('+', '%20');

                return href;
            },
            ics : function (event) {

                let href = encodeURI(
                    'data:text/calendar;charset=utf8,' + [
                      'BEGIN:VCALENDAR',
                      'VERSION:2.0',
                      'BEGIN:VEVENT',
                      'URL:' + document.URL,
                      'DTSTART:' + event.start,
                      'DTEND:' + event.end,
                      'SUMMARY:' + event.title,
                      'DESCRIPTION:' + event.desc,
                      'LOCATION:' + event.location,
                      'END:VEVENT',
                      'END:VCALENDAR'].join('\n'));

                return href;
            }
        }

        function generateButtons () {

            let button = document.createElement('button');
            button.classList.add('calendarBtn');
            button.innerText = addEvent.children[5].innerText;

            let links = document.createElement('ul');
            links.classList.add('calendarLinks');
            links.innerHTML = `
                <li><a href="${calendarGenerator.google(event)}" id="google">Google <small><em>(online)</em></small></a></li>
                <li><a href="${calendarGenerator.outlook(event)}" id="outlookCom">Outlook.com <small><em>(online)</em></small></a></li>
                <li><a href="${calendarGenerator.ics(event)}" download='${event.title}.ics' id="outlook">Outlook</a></li>
                <li><a href="${calendarGenerator.yahoo(event)}" id="yahoo">Yahoo <small><em>(online)</em></small></a></li>
                <li><a href="${calendarGenerator.ics(event)}" download='${event.title}.ics' id="apple">Apple</a></li>`;

            addEvent.parentNode.insertBefore(links, addEvent.nextSibling);
            addEvent.parentNode.insertBefore(button, addEvent.nextSibling);
        }
        
        generateButtons();
        addEvent.remove();
        $('.calendarBtn').on('click', function onClickShowLinks(e) {

            //Prevent the buttons to have n events listeners added
            e.stopImmediatePropagation();

            $(this).next().toggle();
        });
    }
});