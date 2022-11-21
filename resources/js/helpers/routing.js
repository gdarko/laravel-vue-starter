import {flattenObjectAsArray} from "@/helpers/data";
import routes from "@/router/routes";

export const getAbilitiesForRoute = function (names) {

    if (!Array.isArray(names)) {
        names = [names];
    }

    let objects = flattenObjectAsArray(routes, 'children');
    let abilities = [];
    for (let j in names) {


        for (let i in objects) {
            if (objects[i].hasOwnProperty('name') && objects[i].name === names[j] && objects[i].hasOwnProperty('meta') && objects[i].meta.hasOwnProperty('requiresAbility')) {
                abilities.push(objects[i].meta.requiresAbility);
            }
        }
    }

    return abilities;
}


export const toUrl = function (page) {
    if (page.charAt(0) === '/') {
        page = page.substring(1);
    }
    return `/panel/${page}`;
}
