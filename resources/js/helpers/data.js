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
