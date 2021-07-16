const getAuthToken = () => document.querySelector('meta[name="csrf-token"]').content

const post = (url, content) =>
  fetch(url, {
    credentials: "include",
    method: "POST",
    headers: {
      "X-CSRF-Token": getAuthToken(),
      "Content-Type": "application/json"
    },
    body: JSON.stringify(content)
  }).then((response) => response.json())

const get = (url) =>
  fetch(url, {
    credentials: "include",
    method: "GET",
    headers: {
      "X-CSRF-Token": getAuthToken(),
      "Content-Type": "application/json"
    }
  }).then((response) => {
    return response.json()
  })

export { post, get }