export const urlEncodeJson = (json) => {
    if(!json) return ''
    const queryParams = Object.entries(json)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
    return queryParams;
}