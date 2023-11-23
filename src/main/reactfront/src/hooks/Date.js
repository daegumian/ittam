// 현재 날짜 가져오는 유틸
export const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};
