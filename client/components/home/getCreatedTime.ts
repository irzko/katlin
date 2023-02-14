const getCreatedTime = (createdTime: string | number | Date) => {
  let time = new Date().getTime() - new Date(createdTime).getTime();
  if (time < 60 * 1000) {
    return "Vừa xong";
  } else if (time >= 60 * 1000 && time < 60 * 60 * 1000) {
    return `${Math.round(time / 1000 / 60)} phút`;
  } else if (time >= 60 * 60 * 1000 && time < 24 * 60 * 60 * 1000) {
    return `${Math.round(time / 1000 / 60 / 60)} giờ`;
  } else if (time >= 24 * 60 * 60 * 1000 && time < 7 * 24 * 60 * 60 * 1000) {
    return `${Math.round(time / 1000 / 60 / 60 / 24)} ngày`;
  } else if (time >= 7 * 24 * 60 * 60 * 1000) {
    let date = new Date(createdTime);
    return `${date.getDate()} thg ${date.getMonth() + 1}`;
  }
};

export default getCreatedTime;
