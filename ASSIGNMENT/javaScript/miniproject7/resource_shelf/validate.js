export function validateUrl(value) {
  let url;

  try {
    url = new URL(value);
  } catch {
    return "Enter a valid URL";
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return "Only http or https links are allowed";
  }

  return "";
}
