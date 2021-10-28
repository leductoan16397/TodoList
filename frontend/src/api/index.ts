import axios from 'axios';
import { TODO_URL } from './path';

const authHeaders = (token: string): any => {
  return {
    headers: {
      Authorization: token,
    },
  };
};
export const getAllTodo = (token: string): any => {
  return axios.get(TODO_URL, authHeaders(token));
};
export const addNewTodo = (body: any, token: string): any => {
  return axios.post(TODO_URL, body, authHeaders(token));
};

export const findOne = (id: string, token: string): any => {
  return axios.get(`${TODO_URL}/${id}`, authHeaders(token));
};

export const updateTodo = (id: string, body: any, token: string): any => {
  return axios.put(`${TODO_URL}/${id}`, body, authHeaders(token));
};

export const deleteTodo = (id: string, token: string): any => {
  return axios.delete(`${TODO_URL}/${id}`, authHeaders(token));
};
