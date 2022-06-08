# [Frontend API](frontend/src/api/index.js)

# Info

- '^' means: same as above
- '-' means: nothing

# Course

## `/user/:user_id/courses`

- HTTP-Method: `GET`
- description: get subscribed courses
- returns: ^
- frontend function: `getMyCourses()`
- state name: `MyCourses`
- needed parameters: `user_id`

## `/user/:user_id/courses`

- HTTP-Method: `GET`
- description: get course recommendations
- returns: ^
- frontend function: `getCourseRecommendations()`
- state name: `RecommendedCourses`
- needed parameters: `user_id`

## `/courses/:id`

- HTTP-Method: `GET`
- description: get a single course by id
- returns: ^
- frontend function: `getCourse()`
- state name: `CurrentCourse`
- needed parameters: `course_id`

## `/courses/search`

- HTTP-Method: `GET`
- description: get courses that match query
- returns: ^
- frontend function: `getCoursesByQuery(caller, query)`
- state name:
- needed parameters: `query-string inside json`

# User

## `/courses/:id/users`

- HTTP-Method: `GET`
- description: get all users in a course
- returns: ^
- frontend function: `getUsersInCourse(caller, id)`
- state name: ``
- needed parameters: `course_id`

## `/courses/:id/users`

- HTTP-Method: `GET`
- description: get user by id
- returns: ^
- frontend function: `getUser(caller, user_id)`
- state name: ``
- needed parameters: ``

## `?`

- HTTP-Method: `GET`
- description: get users that match query
- returns: ^
- frontend function: `getUsersByQuery(caller, query)`
- needed parameters: `?`

## `/courses`

- HTTP-Method: `POST`
- description: save a created course
- returns: id of new Course (?)
- frontend function: `postNewCourse()`
- state name: `NewCourse`
- needed parameters: `name`, `description`, `enrollkey`, `user_id` (logged in user)`

## `/courses/:id/users/:user_id`

- HTTP-Method: `POST`
- description: enroll a user into a course
- returns: 
- frontend function: ``
- state name: ``
- needed parameters: `course_id`, `user_id`, `enrollkey`

## `/courses/:id`

- HTTP-Method: `PATCH`
- description: update a course with new data
- returns: 
- frontend function: `updateCourse(caller, object, id)`
- state name: ``
- needed parameters: `course_id`, `name`, `description`, `enrollkey`

## `/courses/:id/delete`

- HTTP-Method: `DELETE`
- description: delete a course by its id
- returns: 
- frontend function: `deleteCourse(caller, id)`
- state name: ``
- needed parameters:id 


## `/courses/:id/delete/user/:user/id`

- HTTP-Method: `DELETE`
- description: Delete a user from a course by its id
- returns:
- frontend function: ``
- state name: ``
- needed parameters: `course_id`, `user_id`

## `/login`

- HTTP-Method: `POST`
- description: Log In with given email and password
- returns: logged in user with JWT in header
- frontend function: ``
- state name: ``
- needed parameters: `email`, `password`

## `/register`

- HTTP-Method: `POST`
- description: Registers given user
- returns:
- frontend function: ``
- state name: ``
- needed parameters: At least all required user fields (required are: `firstname`, `surname`, `email`, `password`, `role_id`, `preferred_language_id`)
