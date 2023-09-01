function getQueryState() {
  return new URLSearchParams(window.location.search);
}

export { getQueryState };
