const validationHelpers = {
    required: (val) => val !== null && val !== undefined,
    string: (val) => typeof (val) === 'string',
    number: (val) => typeof (val) === 'number',
    array: (val) => typeof (val) === 'object' && typeof (val.length) === 'number',
    object: (val) => typeof (val) === 'object' && typeof (val.length) === 'undefined',
    objectId: (val) => ObjectId(val),
    maxLength: (val, length) => val.length <= length,
    minLength: (val, length) => val.length >= length,
    above: (val, threshold) => typeof (val) === 'number' && val > threshold,
    below: (val, threshold) => typeof (val) === 'number' && val < threshold,
    email: (val) => /^[\-_.0-9a-zA-Z]+@[0-9a-zA-Z]+\.[0-9a-zA-Z]+$/.test(val),
}

/**
 * The function validate an object against rules object and return the invalid elements
 * 
 * @param {Object} obj 
 * @param {{[key: string]: Array<string>}} rules 
 * 
 * @returns Array<string>
 */
export const validate = (obj, rules) => {
    const inValidElements = [];
    // Get all value keys [email, password] etc
    Object.keys(rules).map(valKey => {
        // use the value keys to get the actual rules [required, string] etc
        const elementValid = rules[valKey].every(rule => {
            // split for the key value rule [minLength, 10]
            const [ruleKey, ...rest] = rule.split(':');
            return validationHelpers[ruleKey](obj[valKey], ...rest)
        })

        if (!elementValid) inValidElements.push(valKey)
    });

    return inValidElements;
}