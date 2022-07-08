## Decision Maker

A web app that helps groups of friends to vote on a preferred choice (using ranked voting), for example: "What movie should we see next Friday?".

### User Story

* a user can create a poll with multiple choices
  with user's email address
  each choice have 
    a title
    optional description

* when a poll is created, 
  the user is given two links via email (using SendGrid): 
    an Results Link (which lets them access the results) and 
    a Voting Link (which the user can access the voting web page)

* when a user visits the poll he created thruough the Voting Link,
  User can see a list of the choices for that poll 

* the user
  select rate the choices among radio buttons and 
  then submits the poll

* each time a submission is received, 
  the creator is notified with an email 
  which includes 
    the administrative link and
    a link to the results

* the results are ranked using 
    the Borda Count method: https://en.wikipedia.org/wiki/Borda_count

note: 
1. The only way to access the polls or see the results is via administrative links
2. This app does not follow the typical user authentication process: voters don't need to register or log in.

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
