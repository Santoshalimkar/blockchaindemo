import { BaseUrl } from "./Baseurl";


export const Adminlogin = async (data) => {
  try {
    let result = await fetch(`${BaseUrl}/admin/signin`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    });
    result = await result.json();
    return result;
  } catch (error) {
    return error.message;
  }
};


export const GetAdminbyid = async (id) => {

  try {
    let result = await fetch(`${BaseUrl}/admin/getsingle/admin/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    result = await result.json();
    return result;
  } catch (error) {
    return error.message;
  }
};