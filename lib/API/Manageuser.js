import { BaseUrl } from "./Baseurl";

export const GetAlluser = async () => {
  try {
    let result = await fetch(`${BaseUrl}/users/alluser`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    result = await result.json();
    console.log(result)
    return result;
  } catch (error) {
    return error.message;
  }
};
