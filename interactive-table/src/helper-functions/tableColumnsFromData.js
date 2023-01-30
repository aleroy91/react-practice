import { setCharAt } from "./setCharAt";

export function tableColumnsFromData(data) {
  let tableColumnsFromData = [];

  Object.keys(data[0]).forEach((element) => {
    if (element !== "photo" && element !== "gif") {
      let sanitisedColumnName = element;

      for (var i = 0; i < element.length; i++) {
        if (i === 0 || element[i - 1] === "_") {
          sanitisedColumnName = setCharAt(
            sanitisedColumnName,
            i,
            element.charAt(i).toUpperCase()
          );
        }

        if (element[i] === "_") {
          sanitisedColumnName = setCharAt(sanitisedColumnName, i, " ");
        }
      }

      tableColumnsFromData.push({
        name: sanitisedColumnName,
        type: typeof data[0][element],
        value: false,
        property: element,
      });
    }
  });

  return tableColumnsFromData;
}
