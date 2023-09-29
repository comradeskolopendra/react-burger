const checkResponse = (res) => res.ok ? res.json() : new Error(`Ошибка: ${res.status}`);

const checkToken = (message) => message === "JWT expired" ? true : false;

const setCookie = (name, value, props) => {
    props = props || {};
    let exp = props.expires;

    if (typeof exp === "number" && exp) {
        const date = new Date();
        date.setTime(date.getTime() + exp * 1000);
        exp = props.expires = date;
    }

    if (exp && exp.toUTCString) {
        props.expires = exp.toUTCString();
    }

    value = encodeURIComponent(value);

    let updatedCookie = name + "=" + value;
    for (const propName in props) {
        updatedCookie += "; " + propName;
        const propValue = props[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }

    document.cookie = updatedCookie;
}

const request = (url, options = {}) => fetch(url, options).then(checkResponse);

export { request, checkResponse, setCookie };
