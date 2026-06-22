const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Helper: get the token from localStorage
const getToken = () => localStorage.getItem('token');

// Helper: standard headers for authenticated requests
const authHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
});

// AUTH
export const registerUser = (data) =>
  fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then((res) => res.json());

export const loginUser = (data) =>
  fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then((res) => res.json());

// TRIPS
export const createTrip = (data) =>
  fetch(`${API_URL}/api/trips`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data),
  }).then((res) => res.json());

export const getUserTrips = () =>
  fetch(`${API_URL}/api/trips`, {
    headers: authHeaders(),
  }).then((res) => res.json());

export const deleteTrip = (id) =>
  fetch(`${API_URL}/api/trips/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  }).then((res) => res.json());

export const addActivity = (tripId, data) =>
  fetch(`${API_URL}/api/trips/${tripId}/activities`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data),
  }).then((res) => res.json());

export const removeActivity = (tripId, activityId) =>
  fetch(`${API_URL}/api/trips/${tripId}/activities/${activityId}`, {
    method: 'DELETE',
    headers: authHeaders(),
  }).then((res) => res.json());

export const regenerateDay = (tripId, data) =>
  fetch(`${API_URL}/api/trips/${tripId}/regenerate-day`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data),
  }).then((res) => res.json());

export const updateTrip = (tripId, data) =>
  fetch(`${API_URL}/api/trips/${tripId}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(data),
  }).then((res) => res.json());