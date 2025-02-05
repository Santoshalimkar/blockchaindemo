import { BaseUrl } from "./Baseurl";
import Cookies from "js-cookie";

export const GetAlluser = async () => {
  const token = Cookies.get("token");

  try {
    let result = await fetch(`${BaseUrl}/users/alluser`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        token:token
      },
    });
    result = await result.json();
    console.log(result)
    return result;
  } catch (error) {
    return error.message;
  }
};
export const GetAlldownlinetree = async (id) => {
  const token = Cookies.get("token");
  try {
    let result = await fetch(`${BaseUrl}/admin/downline/tree/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        token:token
      },
    });
    result = await result.json();
    return result;
  } catch (error) {
    return error.message;
  }
};
