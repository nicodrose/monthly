import sendRequest from "./send-request";
const BASE_URL = '/api/toDos';

export function add(toDoData) {
  return sendRequest(BASE_URL, 'POST', toDoData);
}

export function getAll(date) {
  return sendRequest(`${BASE_URL}/${date}`); 
}