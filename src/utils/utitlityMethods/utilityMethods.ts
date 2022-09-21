export const verifyExpiredToken = (res) => {
    // console.log("Token Details", res)
    if (res?.err?.name === "TokenExpiredError") {
        console.log("TOKEN REMOVED from local storage")
        localStorage.removeItem('Token')
        return true
    }
}

export const isTokenPresent = (key) => {
    let token = localStorage.getItem(key)
    console.log("istokenpresent", token);
    if (token) {
        return true
    }
    else return false;
}