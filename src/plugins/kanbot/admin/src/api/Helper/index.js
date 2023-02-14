export const getToken = () => {
    let str = sessionStorage.getItem('jwtToken');
    if (str[0] === '"' && str[str.length - 1] === '"') {
        return str.slice(1, -1);
    }
      
    return str;
}

export const messageCofig = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
}

export const urlEncodeJson = (json) => {
    if(!json) return ''
    const queryParams = Object.entries(json)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
    return queryParams;
}