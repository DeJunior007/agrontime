export const getJWTFromCookie = () => {
    const cookies = document.cookie.split(";");
    let jwt = null;
  
    cookies.forEach((cookie) => {
      if (cookie.trim().startsWith("jwt=")) {
        jwt = cookie.trim().substring(4);
      }
    });
  
    return jwt;
  };
  