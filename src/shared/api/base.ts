
export const API_URL_DOC = `http://192.168.1.61:8000/`


export const API_URL: string = `${API_URL_DOC}api/`
export const CLASSROOM_API_URL: string = `https://classroom.gennis.uz/`
export const CLASSROOM_API_URL_DOC: string = `https://classroom.gennis.uz/`


export const headers = () => {
    const token = sessionStorage.getItem("token")
    return {
        "Authorization": "JWT " + token,
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


export const branchQuery = () => {
    const branch = localStorage.getItem("selectedBranch")
    return `branch=${branch}`

}

export const branchQueryId = () => {
    return localStorage.getItem("selectedBranch")

}


export type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE'


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

        const {
            url = "",
            method = 'GET',
            body = undefined,
            headers = {'Content-Type': 'application/json'},
            typeUrl = "auto"
        } = props

        try {


            let newUrl = typeUrl === "auto" ? API_URL + url : url


            const response = await fetch(newUrl, {method, mode: 'cors', body, headers});

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