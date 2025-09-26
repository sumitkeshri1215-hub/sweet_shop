// src/auth/index.js

// doLogin-> save data in localstorage
export const doLogin = (data, next) => {
    localStorage.setItem("sweetData", JSON.stringify(data));
    next();
}

// isLoggedin-> check local storage contains token or not
export const isLoggedin = () => {
    let data = localStorage.getItem("sweetData");
    return data != null ? true : false;
}

// doLogout-> remove user data from localstorage
export const doLogout = () => {
    localStorage.removeItem("sweetData");
}

// getUser-> fetch user data from localstorage
export const getUser = () => {
    if (isLoggedin()) {
        return JSON.parse(localStorage.getItem("sweetData")).user;
    }
    return undefined;
};

// getToken-- fetch token from localstorage
export const getToken = () => {
    if (isLoggedin()) {
        return JSON.parse(localStorage.getItem("sweetData")).token;
    }
    return undefined;
}

// isAdmin-> check if user is admin
export const isAdmin = () => {
    const user = getUser();
    return user && user.role === 'ADMIN';
}