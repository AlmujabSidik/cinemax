import config from "../../config.js";

export const fetchApi = async (method: string, path: string) => {
  try {
    const response = await fetch(`${config.BASE_URL}${path}`, {
      method: method,
      headers: {
        "X-RapidAPI-Key": `${config.API_KEY}`,
        "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
      },
    });
    if (!response.ok) {
      throw new Error(`Error while fetching api : ,${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Problem in fetching api", err);
  }
};
