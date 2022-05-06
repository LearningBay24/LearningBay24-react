/*
 * Info:
 * (caller): the component that calls the api function has to give a reference
 * to itself so that the function can save the return data in the components state
 */

export function getMyCourses(caller)
{
    console.log("(getMyCourses): " + `https://learningbay24.de/api/v1/courses/:4`)

    fetch(`https://learningbay24.de/api/v1/users/4/courses`, { method: 'GET' })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            caller.setState({ MyCourses: data })
        })
        .catch((error) => console.error(error));
}

export function getCourse(caller, id)
{
    console.log("(getCourse): " + `https://learningbay24.de/api/v1/courses/${id}`)

    fetch(`https://learningbay24.de/api/v1/courses/${id}`, { method: 'GET' })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            caller.setState({ CurrentCourse : data });
        })
        .catch((error) => console.error(error));
}

export function getUsersInCourse(caller, id)
{
    console.log("(getUsersInCourse): " + `https://learningbay24.de/api/v1/courses/${id}/users`)

    fetch(`https://learningbay24.de/api/v1/courses/${id}/users`, { method: 'GET' })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            caller.setState({ Users : data });
        })
        .catch((error) => console.error(error));
}

export function postNewCourse(caller, object)
{
    console.log("(postNewCourse): " + `https://learningbay24.de/api/v1/courses`)

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(object)
    };
         
    fetch('https://learningbay24.de/api/v1/courses', requestOptions)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            this.setState({ /* TODO: Return wert in state speichern */ });
        })
        .catch((error) => console.error(error));
}

export function updateCourse(caller, object, id)
{
    console.log("(updateCourse): " + `https://learningbay24.de/api/v1/courses/${id}`)

    const requestOptions = {
        method: 'PATCH',
        body: JSON.stringify(object)
    };

    fetch(`https://learningbay24.de/api/v1/courses/${id}`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            // TODO
        })
        .catch((error) => console.error(error));
}

/*
export function enrollUser(caller, user_id,id)
{
    // NOTE: backend is not implemented correctly, do not use this function yet

    console.log("(enrollUser): " + `https://learningbay24.de/api/v1/courses/${id}/enroll/user/${user_id}`)

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(user_id)
    };

    fetch(`https://learningbay24.de/api/v1/courses/${id}`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            // TODO
        })
        .catch((error) => console.error(error));
}
*/

export function deleteCourse(caller, id)
{
    console.log("(deleteCourse): " + `https://learningbay24.de/api/v1/courses/${id}`)

    fetch(`https://learningbay24.de/api/v1/courses/${id}`, { method: 'DELETE' })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        })
        .catch((error) => console.error(error));
}
