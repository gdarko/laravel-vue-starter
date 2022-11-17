export function fillObject (object, data) {
    for (let i in object) {
        if (data.hasOwnProperty(i)) {
            object[i] = data[i];
        }
    }
    return object;
}
