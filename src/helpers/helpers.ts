import { BASE_URL } from "../utils/constants";

const checkResponse = (res: Response): Promise<Response> => {
    return res.ok
        ? res.json()
        : res.json().then((error) => {
            throw new Error(error.message);
        });
};


const updateToken = async (): Promise<any> => {
    return await request(`${BASE_URL}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
    });
};

const requestWithRefresh = async (
    url: string,
    options: any
): Promise<any> => {
    try {
        return await request(url, options);
    } catch (error: any) {
        console.log("error", error, error.message);
        if (error.message === "jwt expired") {
            const refreshData = await updateToken();
            console.log(refreshData);

            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }

            console.log(localStorage);

            localStorage.setItem("accessToken", refreshData.accessToken as string);
            localStorage.setItem("refreshToken", refreshData.refreshToken as string);

            options.headers.authorization = refreshData.accessToken; // перезаписал токен;

            return await request(url, options);
        } else {
            return Promise.reject(error);
        }
    }
};

const request = (url: string, options = {}): Promise<any> =>
    fetch(url, options).then(checkResponse);

const getStringIdByName = (value: string): string => {
    return `[data-testid=${value}]`
};

export { request, checkResponse, requestWithRefresh, getStringIdByName };
