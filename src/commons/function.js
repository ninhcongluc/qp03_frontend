import moment from "moment-timezone";

export const formatDate = (dateString) => {
  return moment(dateString).format("YYYY-MM-DD HH:mm:ss");
};
