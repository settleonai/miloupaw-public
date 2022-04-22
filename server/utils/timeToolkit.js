module.exports.is24HoursAfter = (timeA, timeB) => {
  const timeAObj = typeof timeA !== "object" ? new Date(timeA) : timeA;
  const timeBObj = typeof timeA !== "object" ? new Date(timeB) : timeB;
  const timeDiff = timeAObj - timeBObj;
  const hoursDiff = timeDiff / 1000 / 60 / 60;
  return hoursDiff >= 24;
};
