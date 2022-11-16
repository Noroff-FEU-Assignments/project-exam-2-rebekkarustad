const getToken = window.localStorage.getItem("token");

export const OPTIONS = {
  headers: {
    Authorization: `Bearer ${getToken}`,
  },
};
