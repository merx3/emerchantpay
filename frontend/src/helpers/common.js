export function getQueryParams() {
    const params = window.location.search
        .replace('?', '')
        .split('&');
    const associatedParams = {};
    params.forEach(params => {
        const [paramName, paramValue] = params.split('=');
        associatedParams[paramName] = paramValue;
    });

    return associatedParams;
}