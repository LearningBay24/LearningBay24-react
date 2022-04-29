Info:
- '^' means: same as above
- '-' means: nothing

Frontend API: LB24-react/frontend/src/api/index.js

//COURSES
Method: GET
Description: get subscribed courses
Return: ^
Frontend endpoint: getMyCourses()
State name: MyCourses
Url:"user/:user_id/courses"
Needed Params:user_id (given by URL)

Method: GET
Description: get a single course by id
Return: ^
Frontend endpoint: getCourse()
State name: CurrentCourse
Url: "/courses/:id"
Needed Params:id (the course id) (given by URL)

Method: GET
Description: get all users in a course
Return: 
Frontend endpoint: 
State name: 
Url: "courses/:id/users"
Needed Params:id (the course id) (given by URL)

Method: POST
Description: save a created course
Return: id of new Course (?)
Frontend endpoint: postNewCourse()
State name: NewCourse
Url: "/courses/create"
Needed Params: name, description, enrollkey, user_id(the user that is logged in)

Method: POST
Description: enroll a user into a course
Return: 
Frontend endpoint: 
State name: 
Url: "/courses/:id/enroll/user/:user_id"
Needed Params: id (given by URL), user id (given by URL), enrollkey


Method: PATCH
Description: update a course with new data
Return: 
Frontend endpoint: 
State name: 
Url: "/courses/:id/update"
Needed Params: id (given by URL), name,description,enrollkey


Method: PATCH
Description: deactivate a course by its id
Return: 
Frontend endpoint: 
State name: 
Url: "/courses/:id/deactivate"
Needed Params: id (given by URL)


Method: DELETE
Description: delete a course by its id
Return: 
Frontend endpoint: 
State name: 
Url:"/courses/:id/delete"
Needed Params:id (given by URL)

Method: DELETE
Description: Delete a user from a course by its id
Return:
Frontend endpoint: 
State name: 
Url:"/courses/:id/delete/user/:user_id"
Needed Params:id (from course) (given by URL), user_id (given by URL)


// TODO: define all endpoints
