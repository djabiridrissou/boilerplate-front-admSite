function escapeRegExp(text: string) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

function yellowSearch(value: any, searchTerm: string) {
  if (value) {
    value = value.toString();
    const escapedTerm = escapeRegExp(searchTerm);
    return (
      <span
        dangerouslySetInnerHTML={{
          __html: value.replace(
            new RegExp(escapedTerm, "gi"),
            (match: any) => `<span class="highlight">${match}</span>`
          ),
        }}
      />
    );
  }
  return;
}

export { yellowSearch } 