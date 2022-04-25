/*
 * Info:
 * (caller): the component that calls the api function has to give a reference
 * to itself so that the function can save the return data in the components state
 */

export function getMyCourses(caller)
{
    fetch(`https://learningbay24.de/api/v1/courses`, { method: 'GET' })
        .then((response) => response.json())
        .then((data) => caller.setState({ MyCourses: data }))
        .catch((error) => console.error(error));
}

export function getCourse(caller, id)
{
    fetch(`https://learningbay24.de/api/v1/courses/${id}`, { method: 'GET' })
        .then((response) => response.json())
        .then((data) => caller.setState({ CurrentCourse: data }))
        .catch((error) => console.error(error));
}

export function postNewCourse(caller, object)
{
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(object)
    };
         
    fetch('https://learningbay24.de/api/v1/courses', requestOptions)
        .then((response) => response.json())
        .then((data) => console.log(data)) //this.setState({ /* TODO: Return wert in state speichern */ }))
        .catch((error) => console.error(error));
}
