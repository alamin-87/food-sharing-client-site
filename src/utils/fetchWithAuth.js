// src/utils/fetchWithAuth.js
export const fetchWithAuth = (url, options = {}) => {
  const token = localStorage.getItem("auth-token");
  if (!token) {
    throw new Error("No auth token found");
  }

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
