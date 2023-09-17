const checkResponse = (res) =>
    res.ok ? res.json() : new Error(`Ошибка: ${res.status}`);

const request = (url, options = {}) => fetch(url, options).then(checkResponse);

export { request, checkResponse };