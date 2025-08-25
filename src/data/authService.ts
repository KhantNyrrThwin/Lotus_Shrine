export const authService = {
  isAuthenticated: () => {
    return localStorage.getItem("isAuthenticated") === "true";
  },
  
  logout: () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userName");
  },
  
  getCurrentUser: () => {
    return localStorage.getItem("userName") || "User Name";
  }
};
