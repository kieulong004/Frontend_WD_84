// authUtils.ts
export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const getUser = () => {
  const storedUser = localStorage.getItem("user");
  if (storedUser && storedUser !== "undefined") {
    try {
      return JSON.parse(storedUser);
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  }
  return null;
};