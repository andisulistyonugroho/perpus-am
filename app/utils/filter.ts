export function toDateString(val: string) {
  if (val) {
    const { $dayjs } = useNuxtApp();
    return $dayjs(val).format("YYYY-MM-DD");
  } else {
    return "-";
  }
}

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
      text = "green";
      break;
    case 2:
      text = "red-accent-4";
      break;
    default:
      text = "";
  }
  return text;
}

export function genderLabel(val: string) {
  let text = "";
  switch (val) {
    case "m":
      text = "Laki-laki";
      break;
    case "f":
      text = "Perempuan";
      break;
    default:
      text = "";
  }
  return text;
}

export function borrowState(val: number | undefined) {
  let text = "";
  switch (val) {
    case 1:
      text = "Keluar";
      break;
    case 2:
      text = "Kembali";
      break;
    default:
      text = "Unknown";
  }
  return text;
}

export function borrowStateColor(val: number | undefined) {
  let text = "";
  switch (val) {
    case 1:
      text = "red-accent-4";
      break;
    case 2:
      text = "green-accent-4";
      break;
    default:
      text = "";
  }
  return text;
}
