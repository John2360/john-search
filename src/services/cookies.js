const setCookie = (name, value) => {
  document.cookie =
    name +
    "=" +
    JSON.stringify(value) +
    ";expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/";
};

const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      return JSON.parse(c.substring(nameEQ.length, c.length));
    }
  }
  return null;
};

export { setCookie, getCookie };
