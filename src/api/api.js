

import axios from "axios";

const API = "http://localhost:2026/api";

// AUTH
export const registerUser = (data) => axios.post(`${API}/auth/register`, data);
export const loginUser = (data) => axios.post(`${API}/auth/login`, data);

// PRODUCTS
export const getProducts = () => axios.get(`${API}/products`);
export const addProduct = (data) => axios.post(`${API}/products`, data);

// SCHEMES
export const getSchemes = () => axios.get(`${API}/schemes`);
export const addScheme = (data) => axios.post(`${API}/schemes`, data);

// FEEDBACK
export const getFeedback = () => axios.get(`${API}/feedback`);
export const addFeedback = (data) => axios.post(`${API}/feedback`, data);

// GUIDANCE
export const addGuidance = (data) => axios.post(`${API}/guidance`, data);
export const getGuidance = () => axios.get(`${API}/guidance`);

// CONTENT
export const addContent = (data) =>
  axios.post(`${API}/content/upload`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const getContent = () => axios.get(`${API}/content`);                