
// This function just checks if the token exists in the local storage.
// Cant be used for secure auth
// TODO: Ask the server if the JWT is actually valid (api path? / server componenet?) -> (auth-service.ts as we have it rn)
// (having a separate local checker is also fine)
// export function isAuthenticated(): boolean {
//     const token = localStorage.getItem('token');
//     return !!token; // This will return true if token exists, false otherwise
// }
