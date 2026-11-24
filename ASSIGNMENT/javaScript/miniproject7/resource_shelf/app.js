import { validateUrl } from "./validate.js";
import { initializeTheme } from "./theme.js";

const STORAGE_KEY = "resourceShelf";
const form = document.querySelector("#resourceForm");
const titleInput = document.querySelector("#resourceTitle");
const urlInput = document.querySelector("#resourceUrl");
const subjectInput = document.querySelector("#resourceSubject");
const errorMessage = document.querySelector("#formError");
const submitButton = document.querySelector("#submitButton");
const cancelEditButton = document.querySelector("#cancelEdit");
const formTitle = document.querySelector("#formTitle");
const shelf = document.querySelector("#shelf");
const emptyState = document.querySelector("#emptyState");
const resourceCount = document.querySelector("#resourceCount");

let resources = loadResources();
let editingId = null;

initializeTheme(document.querySelector("#themeToggle"));
renderResources();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  errorMessage.textContent = "";

  const urlError = validateUrl(urlInput.value.trim());
  if (urlError) {
    errorMessage.textContent = urlError;
    urlInput.focus();
    return;
  }

  const resource = {
    id: editingId || createId(),
    title: titleInput.value.trim(),
    url: urlInput.value.trim(),
    subject: subjectInput.value.trim(),
  };

  if (!resource.title || !resource.subject) {
    errorMessage.textContent = "Enter a title and subject";
    return;
  }

  if (editingId) {
    resources = resources.map((item) => item.id === editingId ? resource : item);
  } else {
    resources.unshift(resource);
  }

  saveResources();
  renderResources();
  resetForm();
});

cancelEditButton.addEventListener("click", resetForm);

shelf.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button || !shelf.contains(button)) return;

  const resource = resources.find((item) => item.id === button.dataset.id);
  if (!resource) return;

  if (button.dataset.action === "edit") {
    editingId = resource.id;
    titleInput.value = resource.title;
    urlInput.value = resource.url;
    subjectInput.value = resource.subject;
    errorMessage.textContent = "";
    submitButton.textContent = "Update";
    formTitle.textContent = "Edit resource";
    cancelEditButton.hidden = false;
    titleInput.focus();
  } else if (button.dataset.action === "delete") {
    resources = resources.filter((item) => item.id !== resource.id);
    saveResources();
    renderResources();
    if (editingId === resource.id) resetForm();
  }
});

function loadResources() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];

  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveResources() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(resources));
}

function renderResources() {
  shelf.replaceChildren();
  emptyState.hidden = resources.length > 0;
  resourceCount.textContent = String(resources.length);

  for (const resource of resources) {
    const card = document.createElement("article");
    card.className = "resource-card";

    const topLine = document.createElement("div");
    topLine.className = "card-topline";
    const subject = document.createElement("span");
    subject.className = "subject-tag";
    subject.textContent = resource.subject;
    const externalIcon = document.createElement("span");
    externalIcon.className = "external-icon";
    externalIcon.setAttribute("aria-hidden", "true");
    externalIcon.textContent = "↗";
    topLine.append(subject, externalIcon);

    const title = document.createElement("h3");
    title.textContent = resource.title;
    const link = document.createElement("a");
    link.className = "resource-link";
    link.href = resource.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = new URL(resource.url).hostname;

    const actions = document.createElement("div");
    actions.className = "card-actions";
    actions.append(
      createActionButton("edit", resource.id, "Edit"),
      createActionButton("delete", resource.id, "Delete"),
    );
    card.append(topLine, title, link, actions);
    shelf.append(card);
  }
}

function createActionButton(action, id, label) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = action === "delete" ? "card-action card-action-delete" : "card-action";
  button.dataset.action = action;
  button.dataset.id = id;
  button.textContent = label;
  return button;
}

function resetForm() {
  form.reset();
  editingId = null;
  errorMessage.textContent = "";
  submitButton.textContent = "Add resource";
  formTitle.textContent = "Add a resource";
  cancelEditButton.hidden = true;
}

function createId() {
  return globalThis.crypto?.randomUUID
    ? globalThis.crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
