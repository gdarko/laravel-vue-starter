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
    return params;
}
