# addToCalendar

In a past contract I was asked to make a functional and adaptable add to calendar button which would give the user the choice to where they would add the event. One of the needs was to be able to incorporate it in any CMS. This is what I did and the client was satisfied with it. 
I also took advantage that the client was using JQuery in order to have an Event Listener that would work in any circumstance (since the button sare dynamically generated from the JavaScript) but it can easily be transform to vanilla JavaScript if you put the Event listener to a unmutable parent. 

The process of generation and design is based on https://www.addevent.com/ add to calendar button. The idea was to only write simple html to generate all the links to the most used calendars. 
