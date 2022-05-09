Info:
- '^' means: same as above
- '-' means: nothing

Frontend API: LB24-react/frontend/src/api/index.js




// --- course ---

Method: GET
Description: get subscribed courses
Return: ^
Frontend endpoint: getMyCourses()
State name: MyCourses
Url: "user/:user_id/courses"
Needed Params: user_id

Method: GET
Description: get course recommendations
Return: ^
Frontend endpoint: getCourseRecommendations()
State name: RecommendedCourses
Url: "user/:user_id/courses"
Needed Params: user_id

Method: GET
Description: get a single course by id
Return: ^
Frontend endpoint: getCourse()
State name: CurrentCourse
Url: "/courses/:id"
Needed Params: id (the course id)

Method: GET
Description: get courses that match query
Return: ^
Frontend endpoint: getCoursesByQuery(caller, query)
State name:
Url: 
Needed Params: query




// --- user ---

Method: GET
Description: get all users in a course
Return: ^
Frontend endpoint: getUsersInCourse(caller, id)
State name: 
Url: "courses/:id/users"
Needed Params: id (the course id) 

Method: GET
Description: get user by id
Return: ^
Frontend endpoint: getUser(caller, user_id)
State name: 
Url: "courses/:id/users"
Needed Params: 

Method: GET
Description: get users that match query
Return: ^
Frontend endpoint: getUsersByQuery(caller, query)
Url: 
Needed Params: query



Method: POST
Description: save a created course
Return: id of new Course (?)
Frontend endpoint: postNewCourse()
State name: NewCourse
Url: "/courses"
Needed Params: name, description, enrollkey, user_id(the user that is logged in)

Method: POST
Description: enroll a user into a course
Return: 
Frontend endpoint: 
State name: 
Url: "/courses/:id/users/:user_id"
Needed Params: id (course id) , user id , enrollkey

Method: PATCH
Description: update a course with new data
Return: 
Frontend endpoint: updateCourse(caller, object, id)
State name: 
Url: "/courses/:id"
Needed Params: id , name,description,enrollkey

Method: DELETE
Description: delete a course by its id
Return: 
Frontend endpoint: deleteCourse(caller, id)
State name: 
Url:"/courses/:id/delete"
Needed Params:id 

Method: DELETE
Description: Delete a user from a course by its id
Return:
Frontend endpoint: 
State name: 
Url:"/courses/:id/delete/user/:user_id"
Needed Params:id (from course) , user_id 


