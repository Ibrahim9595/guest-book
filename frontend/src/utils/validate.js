const validationHelpers = {
    required: (val) => val !== null && val !== undefined && val.length > 0,
    string: (val) => typeof (val) === 'string',
    number: (val) => typeof (val) === 'number',
    array: (val) => typeof (val) === 'object' && typeof (val.length) === 'number',
    object: (val) => typeof (val) === 'object' && typeof (val.length) === 'undefined',
    maxLength: (val, length) => val.length <= length,
    minLength: (val, length) => val.length >= length,
    above: (val, threshold) => typeof (val) === 'number' && val > threshold,
    below: (val, threshold) => typeof (val) === 'number' && val < threshold,
    email: (val) => /^[-_.0-9a-zA-Z]+@[0-9a-zA-Z]+\.[0-9a-zA-Z]+$/.test(val),
    equal: (val, str) => val === str,
}

/**
 * The function validate an object against rules object and return the invalid elements
 * 
 * @param {Object} obj 
 * @param {{[key: string]: Array<string>}} rules 
 * 
 * @returns Array<string>
 */
export const validate = (obj, rules, messages = {}) => {
    const inValidElements = {};
    // Get all value keys [email, password] etc
    Object.keys(rules).forEach(valKey => {
        const errors = [];
        // use the value keys to get the actual rules [required, string] etc
        const elementValid = rules[valKey].every(rule => {
            // split for the key value rule [minLength, 10]
            const [ruleKey, ...rest] = rule.split(':');
            // Check if this rulekey belongs to a valid rule
            const func = validationHelpers[ruleKey];
            if (func) {
                let ret = false;
                // Add Equal rule to match passwordRepeat
                if (ruleKey === 'equal') {
                    let val = obj[rest[0]];
                    ret = func(obj[valKey], val);
                } else {
                    ret = func(obj[valKey], ...rest)
                }

                if (!ret) errors.push(messages[`${valKey}.${ruleKey}`] ?
                    messages[`${valKey}.${ruleKey}`] : `${valKey}.${ruleKey}`)
                return ret;
            } else {
                return true;
            }
        })

        if (!elementValid) inValidElements[valKey] = errors;
    });

    return inValidElements;
}