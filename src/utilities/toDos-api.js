import sendRequest from "./send-request";
const BASE_URL = '/api/todos';

export function add(toDoData) {
  return sendRequest(BASE_URL, 'POST', toDoData);
}

export function getAll(date) {
  return sendRequest(`${BASE_URL}/${date}`); 
}

export function update(updatedToDo) {
  return sendRequest(BASE_URL, 'PUT', updatedToDo);
}

export function deleteToDo(id) {
  return sendRequest(`${BASE_URL}/${id}`, 'DELETE');
}

export function getAllForYearMonth(year, month) {
  return sendRequest(`${BASE_URL}/year/${year}/month/${month}`); 
  
}