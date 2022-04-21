import axios from 'axios';
import { useDispatch } from 'react-redux';

/*
export function getCourse(courseID) {
  return fetch(`https://fakestoreapi.com/products/${courseID}`, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  })
    .then((response) => response.json())
    .then((data) => useDispatch(apiEnd))
    .catch((error) => console.error(error));
}*/


export function getCourse(courseID) {
    let data;
    const req = axios.get(`https://fakestoreapi.com/products/${courseID}`)
                .then(res => {
                    data = res.data;
                    console.log(res.data);
                });

    return data;
}

