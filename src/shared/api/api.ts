
export const API_URL_DOC = `http://192.168.1.61:8000/`
export const CLASSROOM_API = `http://192.168.1.61:5001/`
export const API_URL = `${API_URL_DOC}api/`
export const CLASSROOM_API_URL = `http://localhost:3000/`
export const CLASSROOM_API_URL_DOC = `http://192.168.68.116:8000/`


// export const API_URL_DOC = `http://turonedu.uz`
// export const API_URL = `${API_URL_DOC}/api/`
// export const CLASSROOM_API_URL = `https://classroom.gennis.uz/`
// export const CLASSROOM_API_URL_DOC = `https://classroom.gennis.uz/`


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


export const useHttp = () => {
    const request = async (url: string, method = 'GET', body?: BodyInit, headers = {'Content-Type': 'application/json'}) => {
        try {
            const response = await fetch(url, {method, mode: 'cors', body, headers});

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