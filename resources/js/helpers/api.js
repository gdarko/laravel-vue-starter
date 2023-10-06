export function getFirstErrorFromResponse(error) {
    let errorFormatted = getResponseError(error)
    let errorMessage = '';
    if (typeof errorFormatted === 'object') {
        for (let i in errorFormatted) {
            errorMessage = Array.isArray(errorFormatted[i]) ? errorFormatted[i][0] : 'Error';
            break;
        }
    } else if(typeof errorFormatted === 'string') {
        errorMessage = errorFormatted;
    }
    return errorMessage;
}

export function getResponseError(error, response) {
    const errorMessage = "API Error, please try again.";
    if (typeof error !== 'object') {
        return errorMessage;
    }

    if (error.name === "Fetch User") {
        return error.message;
    }

    if (error.hasOwnProperty('response') && error.response.hasOwnProperty('data') && error.response.data.hasOwnProperty('errors')) {
        return error.response.data.errors;
    }

    if (error.hasOwnProperty('response') && error.response.hasOwnProperty('data') && error.response.data.hasOwnProperty('message')) {
        return error.response.data.message;
    }

    if (error.hasOwnProperty('message')) {
        return error.message;
    }

    if (!error.response) {
        console.error(`API ${error.config.url} not found`);
        return errorMessage;
    }
    if (process.env.NODE_ENV === "development") {
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
    }

    return errorMessage;
}

export function prepareQuery(args) {
    let page = args.hasOwnProperty('page') ? args.page : null
    let search = args.hasOwnProperty('search') ? args.search : null;
    let sort = args.hasOwnProperty('sort') ? args.sort : null;
    let filters = args.hasOwnProperty('filters') ? args.filters : null;
    let params = {page: page}
    if (search) {
        params.search = search;
    }
    if (sort && sort.hasOwnProperty('column') && sort.hasOwnProperty('direction')) {
        if (sort.column && sort.direction) {
            params.sort_by = sort.column;
            params.sort = sort.direction;
        }
    }
    if (filters) {
        for (let key in filters) {
            if (!filters[key] || (filters[key].hasOwnProperty('value') && !filters[key].value)) {
                continue;
            }
            let comparison = filters[key].hasOwnProperty('comparison') ? filters[key].comparison : '=';
            let values = Array.isArray(filters[key].value) ? filters[key].value : [filters[key].value];
            let cleanValues = [];
            for(let i in values) {
                if('object' === (typeof values[i])) {
                    if(values[i].hasOwnProperty('id')) {
                        cleanValues.push(values[i].id);
                    }
                } else {
                    cleanValues.push(values[i]);
                }
            }
            if(cleanValues.length > 0) {
                params['filters[' + key + ']'] = key + ';' + comparison + ';' + cleanValues.join('|');
            }
        }
    }

    return params;
}
