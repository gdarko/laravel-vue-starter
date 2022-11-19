import {flattenObjectAsArray} from "@/helpers/data";
import routes from "@/router/routes";

export default function getAbilitiesForRoute(names) {

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
