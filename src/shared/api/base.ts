// export const API_URL_DOC = `http://26.12.122.72:8000/`
// export const API_URL_DOC = `http://176.221.28.164/`
export const API_URL_DOC = `http://176.221.28.164/`
export const API_URL: string = `${API_URL_DOC}api/`


// export const API_URL_DOC = `/`
//
//
// export const API_URL: string = `${API_URL_DOC}api/`

export const headers = () => {
    // const token = sessionStorage.getItem("token")
    return {
        // "Authorization": "JWT " + token,
        'Content-Type': 'application/json'
    }
}


export const header = () => {
    return {
        'Content-Type': 'application/json'
    }
}

export const headerImg = () => {
    return {
        "Authorization": ""
    }
}


export const headersImg = () => {
    const token = sessionStorage.getItem("token")
    return {
        "Authorization": "JWT " + token
    }
}


export type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE' | "PATCH"


interface UseHttpProps {
    url: string,
    method?: Methods,
    body?: BodyInit,
    headers?: HeadersInit,
    typeUrl?: "auto" | "hand",
    isJson?: boolean
}

export const useHttp: () => { request: (props: UseHttpProps) => Promise<any> } = () => {
    const request = async (props: UseHttpProps): Promise<any> => {
        let {
            url = "",
            method = 'GET',
            body = undefined,
            headers = {'Content-Type': 'application/json'},
            typeUrl = "auto",
            isJson = true
        } = props;
        try {
            let newUrl = typeUrl === "auto" ? API_URL + url : url;
            const headersObject = new Headers(headers);

            // If body is FormData, remove 'Content-Type' to let browser set it
            if (body instanceof FormData) {
                headersObject.delete("Content-Type");
            }
            const response = await fetch(newUrl, {method, mode: 'cors', body, headers: headersObject});


            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            return isJson ? await response?.json() : response;

        } catch (e) {
            throw e;
        }
    }

    return {request}

}
export const ParamUrl = (params: Record<string, string | number | boolean | undefined>): string => {
    const paramsList = Object.keys(params);
    let res = '';

    for (let i = 0; i < paramsList.length; i++) {
        const key = paramsList[i];
        const value = params[key];

        if (value !== undefined && value !== null) { // ✅ Ensures we don't add `undefined` or `null` values
            res += `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}&`; // ✅ Properly encodes URL parameters
        }
    }

    return res.slice(0, -1); // ✅ Removes the trailing "&"
};