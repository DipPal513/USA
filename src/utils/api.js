import axios from "axios";

export const BASE_URL = "https://laravel.amaderthikana.com/api/usasreepur";

export const TITLE = `ইউনিভার্সিটি স্টুডেন্টস্ অ্যাসোসিয়েশন, ঊষা`

export const fetchDataFromApi = async (url, params) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      params,
    });
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
