
export const API_URL_DOC = `http://192.168.1.14:8000/`


export const API_URL: string = `${API_URL_DOC}api/`
export const CLASSROOM_API_URL: string = `https://classroom.gennis.uz/`
export const CLASSROOM_API_URL_DOC: string = `https://classroom.gennis.uz/`


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
    headers: {
        "Content-Type": string
    },
    typeUrl?: "auto" | "hand"
}

export const useHttp: () => { request: (props: UseHttpProps) => Promise<any> } = () => {
    const request = async (props: UseHttpProps): Promise<any> => {
        let {
            url = "",
            method = 'GET',
            body = undefined,
            headers = {'Content-Type': 'application/json'},
            typeUrl = "auto"
        } = props;

        let finalHeaders = headers;

        if (body instanceof FormData) {
            finalHeaders = { ...headers };
            // @ts-ignore
            delete finalHeaders['Content-Type'];
        }


        try {
            let newUrl = typeUrl === "auto" ? API_URL + url : url;

            const response = await fetch(newUrl, { method, mode: 'cors', body, headers: finalHeaders });

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            return await response.json();

        } catch (e) {
            throw e;
        }
    }

    return {request}

}
