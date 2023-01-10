export const setCharAt = (stringToModify, index, characterToModify) => {
  if (index > stringToModify.length - 1) {
    return stringToModify;
  } else {
    return (
      stringToModify.substring(0, index) +
      characterToModify +
      stringToModify.substring(index + 1)
    );
  }
};
