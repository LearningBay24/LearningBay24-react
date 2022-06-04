/*
 * Info:
 * (caller): the component that calls the api function has to give a reference
 * to itself so that the function can save the return
 * data in the components state
 */

/**
 * get subscribed courses
 * @param {any} caller The component that calls the api function
 * @return {void} returns nothing.
 */

const Testlocal = 1;

const Serveradress = "https://learningbay24.de/api/v1/";
const Localadress = "http://learningbay24.local:8080/";
let Actualadress;
if (Testlocal) {
  Actualadress = Localadress;
} else {
  Actualadress = Serveradress;
}


export function getMyCourses(caller) {
  console.log("(getMyCourses): " + Actualadress + "users/courses");

  fetch(Actualadress + "users/courses", {method: "GET",
    credentials: "include"})
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        caller.setState({MyCourses: data});
      })
      .catch((error) => console.error(error));
}

/**
 * get a single course by id
 * @param {any} caller The component that calls the api function
 * @param {any} id id of the course
 * @return {void} returns nothing.
 */
export function getCourse(caller, id) {
  console.log("(getCourse): " + Actualadress + `courses/${id}`);

  fetch(Actualadress + `courses/${id}`, {method: "GET",
    credentials: "include"})
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        caller.setState({CurrentCourse: data});
      })
      .catch((error) => console.error(error));
}

/**
 * get all users in a course
 * @param {any} caller The component that calls the api function
 * @param {any} id id of the course
 * @return {void} returns nothing.
 */
export function getUsersInCourse(caller, id) {
  console.log("(getUsersInCourse): " + Actualadress + `courses/${id}/users`);

  fetch(Actualadress + `courses/${id}/users`, {method: "GET",
    credentials: "include"})
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        caller.setState({Users: data});
      })
      .catch((error) => console.error(error));
}

/**
 * posts a new course to the database
 * @param {any} caller The component that calls the api function
 * @param {any} object infos about the course
 * @return {void} returns nothing.
 */
export function postNewCourse(caller, object) {
  console.log("(postNewCourse): " + Actualadress + "courses");

  const requestOptions = {
    method: "POST",
    body: JSON.stringify(object),
    credentials: "include",
  };
  console.log(requestOptions.body);

  fetch(Actualadress + "courses", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        caller.setState({ /* TODO: Return wert in state speichern */});
      })
      .catch((error) => console.error(error));
}

/**
 * updates a course in the database
 * @param {any} caller The component that calls the api function
 * @param {any} object new infos about the course
 * @param {any} id id of the course
 * @return {void} returns nothing.
 */
export function updateCourse(caller, object, id) {
  console.log("(updateCourse): " + Actualadress + `courses/${id}`);

  const requestOptions = {
    method: "PATCH",
    body: JSON.stringify(object),
    credentials: "include",
  };
  console.log(requestOptions.body);

  fetch(Actualadress + `courses/${id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
      //  console.log(data);
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

/**
 * deletes a course with id=id
 * @param {any} caller The component that calls the api function
 * @param {any} id id of the course
 * @return {void} returns nothing.
 */
export function deleteCourse(caller, id) {
  console.log("(deleteCourse): " + Actualadress + `courses/${id}`);

  fetch(Actualadress + `courses/${id}`, {method: "DELETE",
    credentials: "include"})
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error(error));
}

export function login(caller, data) {
  console.log("(login): " + Actualadress + "login");

  const requestOptions = {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(data),
  };

  fetch(Actualadress + "login", requestOptions)
      .then((response) => {
        if (response.ok) {
          alert("Login erfolgreich");
        } else {
          alert("Login fehlgeschlagen");
        }
      })
      .catch((error) => {
        console.error(error);
      });
}

export function register(caller, data) {
  console.log("(register): " + Actualadress + "register");
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(data),
    credentials: "include",
  };
  console.log(requestOptions.body);

  fetch(Actualadress + "register", requestOptions)
      .then((response) => {
        response.json();
        console.log(response);
      })
      .then((data) => {
        console.log(data);
        caller.setState({ /* TODO: Return wert in state speichern */});
      })
      .catch((error) => console.error(error));
}

export function uploadFile(caller, file, id) {
  console.log("(uploadFile): " + Actualadress + `courses/${id}/files`);
  console.log(file);

  const formData = new FormData();
  formData.append("file", file);

  const requestOptions = {
    method: "POST",
    body: formData,
  };

  fetch(Actualadress + `courses/${id}/files`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        caller.setState({ /* TODO: Return wert in state speichern */});
      })
      .catch((error) => console.error(error));
}

export function uploadLink(caller, link, name, id) {
  console.log("(uploadLink): " + Actualadress + `courses/${id}/files`);
  const object = {uri: link, name: name};

  const requestOptions = {
    method: "POST",
    body: JSON.stringify(object),
  };

  fetch(Actualadress + `courses/${id}/files`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        caller.setState({ /* TODO: Return wert in state speichern */});
      })
      .catch((error) => console.error(error));
}


export function getFiles(caller, id) {
  console.log("(getFiles): " + Actualadress + `courses/${id}/files`);

  fetch(Actualadress + `courses/${id}/files`, {method: "GET"})
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        caller.setState({Material: data});
      })
      .catch((error) => console.error(error));
}

export function getFileByID(caller, courseID, fileId, filename) {
  console.log("(getFileByID): " + Actualadress +
  `courses/${courseID}/files/${fileId}`);

  fetch(Actualadress + `courses/${courseID}/files/${fileId}`, {method: "GET"})
      .then((result) => {
        if (result.status != 200) {
          throw new Error("Bad server response");
        }
        return result.blob();
      })
      .then((data) => {
        console.log(data);
        const url = window.URL.createObjectURL(data);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = filename;
        anchor.click();

        window.URL.revokeObjectURL(url);
        document.removeChild(anchor);
      })
      .catch((error) => console.error(error));
}

export function getUser(caller) {
  console.log("(getUser): " + Actualadress + "users");

  fetch(Actualadress + "users", {method: "GET",
    credentials: "include"})
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        caller.setState(data);
      })
      .catch((error) => console.error(error));
}
