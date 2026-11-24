function validateForm(data) {
  const title = String(data?.title ?? "").trim();
  const subject = String(data?.subject ?? "").trim();

  if (!title) {
    return "Enter a title";
  }

  if (title.length < 3 || title.length > 60) {
    return "Title must be 3 to 60 characters";
  }

  if (!subject) {
    return "Choose a subject";
  }

  return "";
}

function validateUrl(value) {
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
