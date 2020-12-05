export const sortInAscending = (unsortedArray, key = null) => {
  const sortedArray = [...unsortedArray];
  sortedArray.sort((first, second) => {
    if (key) {
      let firstValue = typeof first[key] === "string" ? first[key].toUpperCase() : first[key];
      let secondValue = typeof second[key] === "string" ? second[key].toUpperCase() : second[key];
      if (firstValue > secondValue) {
        return 1;
      }
      if (firstValue < secondValue) {
        return -1;
      }
      return 0;
    }
    if (first > second) {
      return 1;
    }
    if (first < second) {
      return -1;
    }
    return 0;
  });
  return sortedArray;
};

export const sortInDescending = (unsortedArray, key = null) => {
  const sortedArray = [...unsortedArray];
  sortedArray.sort((first, second) => {
    if (key) {
      if (first[key] > second[key]) {
        return -1;
      }
      if (first[key] < second[key]) {
        return 1;
      }
      return 0;
    }
    if (first > second) {
      return -1;
    }
    if (first < second) {
      return 1;
    }
    return 0;
  });
  return sortedArray;
};

export const sortTicketsByRoomsAndAreas = (unsortedArray, key) => {
  const sortedArray = [...unsortedArray];
  sortedArray.sort((first, second) => {
    if (!first.area_id && second.area_id) return -1;
    if (first.area_id && !second.area_id) return 1;

    if (first[key] > second[key]) {
      return 1;
    }
    if (first[key] < second[key]) {
      return -1;
    }
    return 0;
  });
  return sortedArray;
};
