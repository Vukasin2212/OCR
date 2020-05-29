import axios from "axios";

export const CallData = url =>
  axios.get("http://localhost:4000/" + url).then(res => res.data);
