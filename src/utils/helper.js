export const printData = (errors, field, type) => {
    // errors should be mapped from express validator
    if (errors !== undefined && errors[field] !== undefined && errors[field][type] !== undefined) {
        //console.log(errors[field][type]) 
        return errors[field][type];
    } else {
        return "";
    };
}

export const jsonGenerate = (statusCode, responseMessage, data = null) => {
    return { status: statusCode, message: responseMessage, data: data }
}

export const parseNumber = (str, defaultValue = 0) => {
    const num = parseInt(str);
    if (Number.isNaN(num)) {
        return defaultValue;
    }
    return num;
}