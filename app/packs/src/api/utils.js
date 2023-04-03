export const getAuthToken = () => document.querySelector('meta[name="csrf-token"]')?.content;

export const defaultHeaders = () => {
  return {
    Accept: "application/json",
    "Content-Type": "application/json"
  };
};

export const appendCSRFToken = headers => {
  const parsedHeaders = { ...headers };
  if (getAuthToken) {
    parsedHeaders["X-CSRF-Token"] = getAuthToken();
  }
  return parsedHeaders;
};
