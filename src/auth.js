import jwtDecode from "jwt-decode";

function isAuthenticated() {
  if (localStorage.getItem("token")) {
    let decoded = jwtDecode(localStorage.getItem("token"));
    if (decoded.exp > Date.now()) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return false;
    }
    return true;
  } else {
    return false;
  }
}

export default isAuthenticated;
