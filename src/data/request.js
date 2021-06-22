import moment from "moment";
import config from "../config";

export const get = async (url, token) => {
  console.log("request-get:", url);
  try {
    let authToken = token ? `?auth=${token}` : "";

    const response = await fetch(config.apiBaseURL + `${url}.json${authToken}`);

    const resData = await response.json();

    if (!response.ok) throw resData;

    return resData;
  } catch (err) {
    throw err;
  }
};

export const remove = async (url, token) => {
  console.log("request-remove:", url);
  try {
    const response = await fetch(
      config.apiBaseURL + `${url}.json?auth=${token}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const resData = await response.json();

    if (!response.ok) throw resData;

    return resData;
  } catch (err) {
    throw err;
  }
};

export const post = async (url, items, token) => {
  console.log("request-post:", url);
  try {
    const authToken = token ? `?auth=${token}` : "";

    const response = await fetch(
      config.apiBaseURL + `${url}.json${authToken}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(items),
      }
    );

    const resData = await response.json();

    if (!response.ok) throw resData;

    return resData;
  } catch (err) {
    throw err;
  }
};

export const patch = async (url, items, token) => {
  console.log("request-patch:", url);
  try {
    const response = await fetch(config.api + `${url}.json?auth=${token}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(items),
    });

    const resData = await response.json();

    if (!response.ok) throw resData;

    return resData;
  } catch (err) {
    throw err;
  }
};

export const authenticate = async (url, items) => {
  console.log("request-authenticate:", url);
  try {
    const baseUrl =
      url == "token" ? config.apiBaseSecureToken : config.apiBaseAuthentication;

    const response = await fetch(
      `${baseUrl}${url}?key=${config.googleApiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(items),
      }
    );

    const resData = await response.json();

    if (!response.ok) throw resData;

    return resData;
  } catch (err) {
    throw err;
  }
};

export const log = async (url, msg, token) => {
  console.log("request-log:", url);
  try {
    const authToken = token ? `?auth=${token}` : "";
    const data = {
      record: msg.stack ? msg.stack.toString() : msg.toString(),
      date: moment(),
      user: await localStorage.getItem("userData"),
    };

    fetch(config.apiBaseURL + `${url}.json${authToken}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.log("logger-failed:", err);
  }
};
