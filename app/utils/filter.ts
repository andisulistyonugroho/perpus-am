export function toMoney(val: number) {
  if (val) {
    const x = val;
    return x.toLocaleString("id-ID");
  } else {
    return "-";
  }
}

export function bookState(val: number | undefined) {
  let text = "";
  switch (val) {
    case 1:
      text = "Available";
      break;
    case 2:
      text = "Dipinjam";
      break;
    default:
      text = "Unknown";
  }
  return text;
}

export function bookStateColor(val: number | undefined) {
  let text = "";
  switch (val) {
    case 1:
      text = "green-accent-4";
      break;
    case 2:
      text = "red-accent-4";
      break;
    default:
      text = "";
  }
  return text;
}
