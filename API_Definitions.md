Purpose of this file:
- To unify the api endpoints
- To unify the url route with the api call so that
/kursuebersicht doesn't call get('/kurse') but
/kurse calls get('/kurse')

Info:
- Domi TODO: Backend point
- Tim TODO: Frontend url, Where, Components

- 'Frontend url' should be the same as 'Current Frontend url'
- At 'Current Frontend url': insert '-' if it's the same as 'Frontend url'
- 'Where' describes the navigation point as defined in the Pflichtenheft and GUI Mockups
- baseUrl: localhost:3000

------------

Method: GET
Description: get all courses
Backend point: 
Frontend url: /courses
Current Frontend url: /kursuebersicht
Where: Kursübersicht
Components: Kursuebersicht.js

Method: GET
Description: get a single course by id
Backend point:
Frontend url: /courses/id
Current Frontend url: /kursansicht
Where: Kursansicht
Components: Kursansicht.js

Method: PUT
Description: write a new course to DB
Backend point:
Frontend url: /courses
Current Frontend url: /kursuebersicht
Where: Kursübersicht
Components:  Kursuebersicht.js

Method: GET
Description: action: subscribe to a course -> get certificate if course requires it
Backend point:
Frontend url: /courses/id
Current Frontend url: /kursansicht
Where: Kursansicht
Components: Kursansicht.js


--- The following is not relevant for next E2E ---

Method: GET
Description: get all users
Backend point:
Frontend url: /users
Current Frontend url:
Where:
Components:

Method: GET
Description: get a single user by id
Backend point:
Frontend url: /users/id
Current Frontend url:
Where:
Components:

Method: GET
Description: get a single forum by id
Backend point:
Frontend url: /courses/id/forum			// TODO: not sure if correct
Current Frontend url:
Where:
Components:

Method: GET
Description: get all exams
Backend point:
Frontend url: /exams
Current Frontend url:
Where:
Components:

Method: GET
Description: get a single exam by id
Backend point:
Frontend url: /exams/id
Current Frontend url:
Where:
Components:

Method: GET
Description: get all submissions
Backend point:
Frontend url:
Current Frontend url:
Where:
Components:

Method: GET
Description: 
Backend point:
Frontend url:
Current Frontend url:
Where:
Components:

Method: GET
Description: 
Backend point:
Frontend url:
Current Frontend url:
Where:
Components:

