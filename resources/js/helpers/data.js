export function fillObject(object, data) {
    for (let i in object) {
        if (data.hasOwnProperty(i)) {
            object[i] = data[i];
        }
    }
    return object;
}

/**
 * Flatten a multidimensional object
 *
 * For example:
 *   flattenObject{ a: 1, b: { c: 2 } }
 * Returns:
 *   { a: 1, c: 2}
 */
export const flattenObjectAsArray = (arr, prop) => {
    var a = [];
    for (let i = 0; i < arr.length; i++) {
        let o = arr[i];
        if (o[prop]) {
            let c = flattenObjectAsArray(o[prop], prop);
            if (c) {
                a = a.concat(c);
            }
        }
        a.push(o)
    }
    return a;
}

/**
 * Clears object values
 * @param object
 */
export const clearObject = (object) => {
    for (let i in object) {
        object[i] = null;
    }
};

/**
 * Reduce properties
 * @param data
 * @param properties
 * @param singleProperty
 * @returns {*}
 */
export const reduceProperties = (data, properties, singleProperty) => {
    let obj = {};
    for (let i in data) {
        obj[i] = data[i];
    }
    if (!Array.isArray(properties)) {
        properties = [properties];
    }
    for (let i in properties) {
        if (obj.hasOwnProperty(properties[i])) {
            let value = obj[properties[i]];
            let newVal;
            if (Array.isArray(value)) {
                newVal = [];
                for (let j in value) {
                    newVal[j] = value[j] && value[j].hasOwnProperty(singleProperty) ? value[j][singleProperty] : newVal;
                }
            } else if (typeof value === 'object') {
                newVal = value && value.hasOwnProperty(singleProperty) ? value[singleProperty] : newVal;
            } else {
                newVal = value;
            }
            obj[properties[i]] = newVal;
        }
    }

    return obj;
};
