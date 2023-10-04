import { BASE_URL } from "../utils/constants";

const checkResponse = (res) => res.ok ? res.json() : new Error(`Ошибка: ${res.status}`);

const updateToken = async () => {
    return await request(`${BASE_URL}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ token: localStorage.getItem("refreshToken") })
    });
}

const requestWithRefresh = async (url, options) => {
    try {
        console.log(url, options)
        return await request(url, options);
    } catch (error) {
        console.log(error)
        if (error.message === "jwt expired") {
            const refreshData = await updateToken();

            console.log(refreshData);

            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }

            localStorage.setItem("accessToken", refreshData.accessToken);
            localStorage.setItem("refreshToken", refreshData.refreshToken);

            options.headers.authorization = refreshData.accessToken; // перезаписал токен;

            return await request(url, options);
        } else {
            return Promise.reject(error)
        }
    }
}

const request = (url, options = {}) => fetch(url, options).then(checkResponse);

export { request, checkResponse, requestWithRefresh };
