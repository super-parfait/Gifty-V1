export function removeItem(token, refreshtoken) {
        window.localStorage.removeItem(token);
        window.localStorage.removeItem(refreshtoken);

    }
    
export function getItem(item) {
    return window.localStorage.getItem(item);
}

export function addItem(localeStorageName, newItem) {
    window.localStorage.setItem(localeStorageName, newItem);
}
     