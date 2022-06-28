/*
 * Info:
 * (caller): the component that calls the api function has to give a reference
 * to itself so that the function can save the return
 * data in the components state
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

async function handleErrors(response) {
  if (!response.ok) throw await response.json();
  return response.json();
}

/**
 * get subscribed courses
 * @param {any} caller The component that calls the api function
 * @return {void} returns nothing.
 */
export function getMyCourses(caller) {
  // console.log("(getMyCourses): " + Actualadress + "users/courses");

  fetch(Actualadress + "users/courses", {method: "GET",
    credentials: "include"})
      .then((response) => response.json())
      .then((data) => {
        caller.setState({MyCourses: data});
      })
      .catch((error) => console.error(error));
}

export async function getMyCoursesAsync() {
  const result = await fetch(Actualadress + "users/courses",
      {method: "GET", credentials: "include"});

  return await result.json();
}

export async function checkIfUserEnrolledCourse(
    courseIdParam, isEnrolledCallback, isNotEnrolledCallback) {
  const myCoursesResponseObj = await fetch(Actualadress + "users/courses",
      {method: "GET", credentials: "include"});
  let myCourses = [{}];
  myCourses = await myCoursesResponseObj.json();

  if (myCourses != null) {
    for (const item of myCourses) {
      // compare strings
      if (courseIdParam == item.id) {
        // user is enrolled, do not call callback
        isEnrolledCallback(courseIdParam);
        return;
      }
    }
  }
  // user is not enrolled, call callback
  isNotEnrolledCallback();
  return;
}

/**
 * get a single course by id
 * @param {any} caller The component that calls the api function
 * @param {any} id id of the course
 * @return {void} returns nothing.
 */
export function getCourse(caller, id) {
  fetch(Actualadress + `courses/${id}`, {method: "GET",
    credentials: "include"})
      .then((response) => response.json())
      .then((data) => {
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
  // console.log("(getUsersInCourse): "+ Actualadress + `courses/${id}/users`);

  fetch(Actualadress + `courses/${id}/users`, {method: "GET",
    credentials: "include"})
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
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
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(object),
    credentials: "include",
  };
  // console.log(requestOptions.body);

  fetch(Actualadress + "courses", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
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
  // console.log("(updateCourse): " + Actualadress + `courses/${id}`);

  const requestOptions = {
    method: "PATCH",
    body: JSON.stringify(object),
    credentials: "include",
  };
  // console.log(requestOptions.body);

  fetch(Actualadress + `courses/${id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
      //  console.log(data);
      // TODO
      })
      .catch((error) => console.error(error));
}


export async function enrollUserIntoCourse(courseID, enrollKey, callback) {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify({enroll_key: enrollKey}),
    credentials: "include",
  };

  const result = await fetch(
      Actualadress + "courses/" + courseID.toString(), requestOptions);
  const data = await result.json();
  return data;
}


/**
 * deletes a course with id=id
 * @param {any} caller The component that calls the api function
 * @param {any} id id of the course
 * @return {void} returns nothing.
 */
export function deleteCourse(caller, id) {
  // console.log("(deleteCourse): " + Actualadress + `courses/${id}`);

  fetch(Actualadress + `courses/${id}`, {method: "DELETE",
    credentials: "include"})
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
      })
      .catch((error) => console.error(error));
}

export async function login(data, callback) {
  // console.log("(login): " + Actualadress + "login");

  const requestOptions = {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(data),
  };

  const returnVal = await fetch(Actualadress + "login", requestOptions);

  if (returnVal.ok) {
    callback();
  } else {
    console.log("Login fehlgeschlagen");
  }
}

export function logout(caller) {
  // console.log("(logout): " + Actualadress + "logout");

  const requestOptions = {
    method: "POST",
    credentials: "include",
  };

  fetch(Actualadress + "logout", requestOptions)
      .then((response) => {
        if (response.ok) {
          alert("Logout erfolgreich");
        } else {
          alert("Logout fehlgeschlagen");
        }
      })
      .catch((error) => {
        console.error(error);
      });
}


export function register(caller, data) {
  // console.log("(register): " + Actualadress + "register");
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(data),
    credentials: "include",
  };
  // console.log(requestOptions.body);

  fetch(Actualadress + "register", requestOptions)
      .then((response) => {
        response.json();
        // console.log(response);
      })
      .then((data) => {
        // console.log(data);
        caller.setState({ /* TODO: Return wert in state speichern */});
      })
      .catch((error) => console.error(error));
}

/**
 * gets courses by search-query
 * @param {any} query the search string
 * @param {any} callback gets called when the result is fetched
 * @return {void} returns nothing.
 */
export async function getCoursesByQuery(query, callback) {
  // console.log("(getCoursesByQuery) query: " + query);

  const requestOptions = {
    method: "GET",
    credentials: "include",
  };

  const result = await fetch(Actualadress + "courses/search?" +
      "searchterm=" + query, requestOptions);
  callback(await result.json());
}

export function getCoursesFromUser(caller) {
  const requestOptions = {
    method: "GET",
    credentials: "include",
  };

  fetch(Actualadress + "users/courses", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        caller.setState({CoursesFromUser: data});
      })
      .catch((error) => console.error(error));
}

export function uploadFile(caller, file, id) {
  // console.log("(uploadFile): " + Actualadress + `courses/${id}/files`);
  // console.log(file);

  const formData = new FormData();
  formData.append("file", file);

  const requestOptions = {
    method: "POST",
    body: formData,
  };

  fetch(Actualadress + `courses/${id}/files`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        caller.setState({ /* TODO: Return wert in state speichern */});
      })
      .catch((error) => console.error(error));
}

export function uploadLink(caller, link, name, id) {
  // console.log("(uploadLink): " + Actualadress + `courses/${id}/files`);
  const object = {uri: link, name: name};

  const requestOptions = {
    method: "POST",
    body: JSON.stringify(object),
  };

  fetch(Actualadress + `courses/${id}/files`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        caller.setState({ /* TODO: Return wert in state speichern */});
      })
      .catch((error) => console.error(error));
}


export function getFiles(caller, id) {
  // console.log("(getFiles): " + Actualadress + `courses/${id}/files`);

  fetch(Actualadress + `courses/${id}/files`, {method: "GET"})
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        caller.setState({Material: data});
      })
      .catch((error) => console.error(error));
}

export function getFileByID(caller, courseID, fileId, filename) {
  // console.log("(getFileByID): " + Actualadress +
  // `courses/${courseID}/files/${fileId}`);

  fetch(Actualadress + `courses/${courseID}/files/${fileId}`, {method: "GET"})
      .then((result) => {
        if (result.status != 200) {
          throw new Error("Bad server response");
        }
        return result.blob();
      })
      .then((data) => {
        // console.log(data);
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
  // console.log("(getUser): " + Actualadress + "users");

  fetch(Actualadress + "users/cookie", {method: "GET",
    credentials: "include"})
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        caller.setState(data);
      })
      .catch((error) => console.error(error));
}

/*
function startOfWeek(date) {
  const diff = date.getDate() - date.getDay() +
    (date.getDay() === 0 ? -6 : 1)-1;
  return new Date(date.setDate(diff));
}

function endOfWeek(date) {
  const diff = date.getDate() - date.getDay() +
    (date.getDay() === 0 ? -6 : 1)+7;
  return new Date(date.setDate(diff));
}
*/

export function createAppointment(caller, object) {
  // console.log("(createAppointment): " + Actualadress + "appointments/add");
  // console.log(object);
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(object),
    credentials: "include",
  };

  fetch(Actualadress + "appointments/add", requestOptions)
      .then(handleErrors)
      .then(null, (reason) => alert(reason))
      .catch((error) => console.error(error));
}

export function getAppointments(caller, callback) {
  // console.log("(getAppointments): " + Actualadress + "courses/appointments");

  const requestOptions = {
    method: "GET",
    credentials: "include",
  };

  fetch(Actualadress + "courses/appointments", requestOptions)
      .then(handleErrors)
      .then((data) => {
        // console.log("data");
        // console.log(data);
        caller.setState({Appointments: data}, () => {
          if (callback != null) {
            // console.log("callback");
            callback(caller);
          }
        });
      }, (reason) => alert(reason))
      .catch((error) => console.error(error));
}

export function deleteAppointment(caller, appointmentId) {
  // console.log("(deleteAppointment): " + Actualadress +
  // `appointments/${appointmentId}`);

  fetch(Actualadress + "appointments", {method: "DELETE",
    body: JSON.stringify({appointment_id: appointmentId}),
    credentials: "include"})
      .then(handleErrors)
      .then(null, (reason) => alert(reason))
      .catch((error) => console.error(error));
}


export function getAttendedExams(caller) {
  // console.log("(getExams): " + Actualadress + "users/exams/attended");

  fetch(Actualadress + "users/exams/attended", {method: "GET",
    credentials: "include"})
      .then((response) => response.json())
      .then((data) => {
        // console.log("attended");
        // console.log(data);
        caller.setState({AttendedExams: data});
      });
}

export function getPassedExams(caller) {
  // console.log("(getExams): " + Actualadress + "users/exams/passed");

  fetch(Actualadress + "users/exams/passed", {method: "GET",
    credentials: "include"})
      .then((response) => response.json())
      .then((data) => {
        // console.log("passed");
        // console.log(data);
        caller.setState({PassedExams: data});
      })
      .catch((error) => console.error(error));
}

export function getCreatedExams(caller) {
  // console.log("(getExams): " + Actualadress + "users/exams/created");

  fetch(Actualadress + "users/exams/created", {method: "GET",
    credentials: "include"})
      .then((response) => response.json())
      .then((data) => {
        // console.log("created");
        // console.log(data);
        caller.setState({CreatedExams: data});
      })
      .catch((error) => console.error(error));
}


export function getRegisteredExams(caller) {
  // console.log("(getExams): " + Actualadress + "users/exams/registered");

  fetch(Actualadress + "users/exams/registered", {method: "GET",
    credentials: "include"})
      .then((response) => response.json())
      .then((data) => {
        // console.log("registered");
        // console.log(data);
        caller.setState({RegisteredExams: data});
      })
      .catch((error) => console.error(error));
}

export function getUnregisteredExams(caller) {
  // console.log("(getExams): " + Actualadress + "users/exams/unregistered");

  fetch(Actualadress + "users/exams/unregistered", {method: "GET",
    credentials: "include"})
      .then((response) => response.json())
      .then((data) => {
        // console.log("unregistered");
        // console.log(data);
        caller.setState({UnregisteredExams: data});
      })
      .catch((error) => console.error(error));
}

export async function getExamsFromCourse(caller, courseId) {
  // console.log("(getExamsFromCourse): " + Actualadress +
  // `courses/${courseId}/exams`);

  await fetch(Actualadress + `courses/${courseId}/exams`, {method: "GET",
    credentials: "include"})
      .then((response) => response.json())
      .then((data) => {
        // console.log("fromcourse");
        // console.log(data);
        caller.setState({Exams: data});
      })
      .catch((error) => console.error(error));
}


export function createExam(caller, object) {
  // console.log("(CreateExam): " + Actualadress + "exams");

  const requestOptions = {
    method: "POST",
    body: JSON.stringify(object),
    credentials: "include",
  };
  // console.log(requestOptions.body);

  fetch(Actualadress + "exams", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
      })
      .catch((error) => console.error(error));
}

export function editExam(caller, object) {
  // console.log("(editExam): " + Actualadress + `exams/${object.id}/edit`);


  const requestOptions = {
    method: "POST",
    body: JSON.stringify(object),
    credentials: "include",
  };
  // console.log(requestOptions.body);

  fetch(Actualadress + `exams/${object.id}/edit`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
      })
      .catch((error) => console.error(error));
}

export function uploadFileExam(caller, id, file) {
  // console.log("(uploadFileExam): " + Actualadress + `exams/${id}/files`);

  const formData = new FormData();
  formData.append("file", file);

  const requestOptions = {
    method: "POST",
    body: formData,
    credentials: "include",
  };

  fetch(Actualadress + `exams/${id}/files`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
      })
      .catch((error) => console.error(error));
}


export async function deleteExam(caller, examId) {
  // console.log("(deleteExam): " + Actualadress +
  // `exams/${examId}`);

  await fetch(Actualadress + `exams/${examId}`, {method: "DELETE",
    credentials: "include"})
      .then((response) => {
        if (response.status != 204) {
          alert("error");
        }
      })
      .catch((error) => console.error(error));
}

export function getFileFromExam(caller, examId, filename) {
  // console.log("(getFileFromExam): " + Actualadress +
  // `exams/${examId}/files`);

  fetch(Actualadress + `exams/${examId}/files`, {method: "GET",
    credentials: "include"})
      .then((result) => {
        if (result.status != 200) {
          throw new Error("Bad server response");
        }
        return result.blob();
      })
      .then((data) => {
        // console.log(data);
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

export function uploadSolutionExam(caller, id, file) {
  // console.log("(uploadFile): " + Actualadress + `users/exams/${id}/submit`);
  // console.log(file);

  const formData = new FormData();
  formData.append("file", file);

  const requestOptions = {
    method: "POST",
    body: formData,
    credentials: "include",
  };

  fetch(Actualadress + `users/exams/${id}/submit`, requestOptions)
      .then((response) => {
        if (response.status != 201) {
          alert("error");
        }
      })
      .catch((error) => console.error(error));
}


export function registerToExam(caller, examId) {
  // console.log("(registerToExam): " + Actualadress +
  // `users/exams/${examId}`);

  fetch(Actualadress + `users/exams/${examId}`, {method: "POST",
    credentials: "include"})
      .then((response) => {
        if (response.status != 200) {
          alert("error");
        }
      })
      .catch((error) => console.error(error));
}

export function deregisterFromExam(caller, examId) {
  // console.log("(deregisterFromExam): " + Actualadress +
  // `users/exams/${examId}`);

  fetch(Actualadress + `users/exams/${examId}`, {method: "DELETE",
    credentials: "include"})
      .then((response) => {
        if (response.status != 204) {
          alert("error");
        }
      })
      .catch((error) => console.error(error));
}

export function getExamAttendees(caller, examId) {
  // console.log("(getExamAttendees): " + Actualadress +
  // `exams/${examId}/users/attended`);

  fetch(Actualadress + `exams/${examId}/users`, {method: "GET",
    credentials: "include"})
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        caller.setState({ExamAttendees: data});
      })
      .catch((error) => console.error(error));
}

export function getExamRegistered(caller, examId) {
  // console.log("(getExamregistered): " + Actualadress +
  // `exams/${examId}/users`);

  fetch(Actualadress + `exams/${examId}/users`, {method: "GET",
    credentials: "include"})
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        caller.setState({ExamRegistered: data});
      })
      .catch((error) => console.error(error));
}

export function gradeExam(caller, userId, examId, object) {
  // console.log("(gradeExam): " + Actualadress +
  // `users/${userId}/exams/${examId}/grade`);

  const requestOptions = {
    method: "PATCH",
    body: JSON.stringify(object),
    credentials: "include",
  };

  fetch(Actualadress + `users/${userId}/exams/${examId}/grade`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
      })
      .catch((error) => console.error(error));
}

export function setAttendency(caller, userId, examId) {
  // console.log("(setAttendency): " + Actualadress +
  // `users/${userId}/exams/${examId}/attend`);

  fetch(Actualadress + `users/${userId}/exams/${examId}/attend`,
      {method: "PATCH", credentials: "include"})
      .then((response) => {
        if (response.status != 200) {
          alert("error");
        }
      })
      .catch((error) => console.error(error));
}

export function getExamSubmission(caller, userId, examId, filename) {
  // console.log("(getExamSubmission): " + Actualadress +
  // `usersx/exams/${userId}/${examId}/files`);

  fetch(Actualadress +
    `usersx/${userId}/exams/${examId}/files`, {method: "GET",
    credentials: "include"})
      .then(handleErrors)
      .then((result) => {
        if (result.status != 200) {
          throw new Error("Bad server response");
        }
        return result.blob();
      }, (reason) => alert(reason))
      .then((data) => {
        // console.log(data);
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

export function getSubmissionFromUser(caller) {
  fetch(Actualadress + "users/submissions", {method: "GET",
    credentials: "include"})
      .then((response) => response.json())
      .then((data) => {
        console.log("(getSubmissionFromUser)");
        console.log(data);
        caller.setState({Submissions: data});
        // might check if file is uploaded/evaluated or not
      })
      .catch((error) => console.error(error));
}

export function getSubmissionById(caller, id) {
  fetch(Actualadress + `submission/${id}`, {method: "GET",
    credentials: "include"})
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        if (data.ok) {
          // console.log("ok");
        }
      })
      .catch((error) => console.error(error));
}

export function getSubmissionsFromCourse(caller, courseId) {
  fetch(Actualadress + `courses/${courseId}/submissions`, {method: "GET",
    credentials: "include"})
      .then((response) => response.json())
      .then((data) => {
        caller.setState({Submissions: data});
      })
      .catch((error) => console.error(error));
}

export async function createSubmission(caller, newSub) {
  const courseId = newSub.course_id;

  const requestOptions1 = {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(newSub),
  };

  // first upload to 'submissions'
  const result = await fetch(Actualadress + `courses/${courseId}/submissions`,
      requestOptions1);
  if (result.error) {
    console.log("error");
  }
}

export function createSubmissionHasFiles(subId, file) {
  const formData = new FormData();
  formData.append("file", file);

  const requestOptions = {
    method: "POST",
    body: formData,
    credentials: "include",
  };

  fetch(Actualadress + `courses/submissions/${subId}/files`,
      requestOptions).then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error(error));
}

export async function createUserSubmissionHasFiles(subId, file) {
  const formData = new FormData();
  formData.append("file", file);

  const requestOptions = {
    method: "POST",
    credentials: "include",
    body: formData,
  };

  const result = await fetch(Actualadress +
      `courses/submissions/usersubmissions/${subId}/files`,
  requestOptions);

  const data = await result.json();
  console.log(data);
}

export function editSubmissionById(submissionId, patchObj) {
  const requestOptions = {
    method: "PATCH",
    credentials: "include",
    body: JSON.stringify(patchObj),
  };

  fetch(Actualadress + `courses/submissions/${submissionId}`
      , requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          console.log("Abgabe erfolgreich bearbeitet.");
        }
      })
      .catch((error) => console.error(error));
}

export function deleteSubmission(submissionId) {
  fetch(Actualadress + `courses/submissions/${submissionId}`
      , {method: "DELETE", credentials: "include"})
      .then((response) => response.json())
      .then((data) => {
        console.log(submissionId);
        console.log(data);
      })
      .catch((error) => console.error(error));
}

export async function getAllSubmissions(caller) {
  const requestOptions = {
    method: "GET",
    credentials: "include",
  };

  const submissionsLists = [];

  const result = await fetch(Actualadress + "users/courses", requestOptions);
  const courses = await result.json();

  for (const c of courses) {
    const cid = c.id;
    const subs = await getSubmissionsFromCourseAsync(cid);
    submissionsLists.push(...subs);
  }

  caller.setState(
      {Submissions: submissionsLists});
  // getAllUserSubmissions(caller, submissionsLists);
}

export async function getSubmissionsFromCourseAsync(courseId) {
  const requestOptions = {
    method: "GET",
    credentials: "include",
  };

  const result = await fetch(Actualadress +
      `courses/${courseId}/submissions`, requestOptions);
  const submissions = await result.json();
  return submissions;
}

export async function getUserSubmissionsFromSubmission(subId, callback) {
  const result = await fetch(Actualadress +
    `courses/submissions/${subId}/usersubmissions`
  , {method: "GET", credentials: "include"});

  const data = await result.json();
  callback(data);
}

export async function createUserSubmission(subData, callback) {
  const requestOptions = {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(subData),
  };
  const requestOptions2 = {
    method: "GET",
    credentials: "include",
  };

  const check = await fetch(Actualadress +
    `users/submissions/${subData.id}`
  , requestOptions2);

  const data2 = await check.json();
  console.log(data);
  if (data2 != null) {
    alert("Bereits eine Nutzerabgabe hochgeladen");
    return;
  }

  const result =
    await fetch(Actualadress +
      `courses/submissions/${subData.submission_id}/usersubmissions`,
    requestOptions);
  const data = await result.json();
  callback(data);
}


export function gradeUserSubmission(caller, subId, grade) {
  const requestOptions = {
    method: "PATCH",
    credentials: "include",
    body: JSON.stringify(grade),
  };

  fetch(Actualadress +
    `courses/submissions/usersubmissions/${subId}/grade`
  , requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error(error));
}


export async function getUserSubmission(id, callback) {
  const requestOptions = {
    method: "GET",
    credentials: "include",
  };

  const result = await fetch(Actualadress +
    `users/submissions/${id}`
  , requestOptions);

  const data = await result.json();
  callback(data);
}

export async function getAllUserSubmissions(caller, enrolledSubs) {
  if (enrolledSubs == null || enrolledSubs.length == 0) {
    console.log("list is null");
    return;
  }

  for (const enrolledSub of enrolledSubs) {
    getSubmissionsFromCourse(caller, enrolledSub.id);
  }
}


export function getFileFromSubmission(subId, filename) {
  fetch(Actualadress + `submission/${subId}/files`, {method: "GET",
    credentials: "include"})
      .then((result) => {
        if (result.status != 200) {
          throw new Error("Bad server response");
        }
        return result.blob();
      })
      .then((data) => {
        // console.log(data);
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

export function checkFileFromSubmission(subId) {
  fetch(Actualadress + `courses/submissions/${subId}/files`,
      {method: "GET", credentials: "include"})
      .then((result) => {
        if (result.status != 200) {
          throw new Error("Bad server response");
        }
        return result.blob();
      })
      .then((data) => {
        console.log(data);
        return true;
      });
  return false;
}

export function getFileFromUserSubmission(subId, filename) {
  fetch(Actualadress + `submission/${subId}/files`, {method: "GET",
    credentials: "include"})
      .then((result) => {
        if (result.status != 200) {
          throw new Error("Bad server response");
        }
        return result.blob();
      })
      .then((data) => {
        // console.log(data);
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

export function deleteUserSubmission(submissionId) {
  fetch(Actualadress + `courses/submissions/usersubmissions/${submissionId}`
      , {method: "DELETE", credentials: "include"})
      .then((response) => response.json())
      .then((data) => {
        console.log(submissionId);
        console.log(data);
      })
      .catch((error) => console.error(error));
}
