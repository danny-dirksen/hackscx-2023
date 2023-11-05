const header = document.querySelector('header');
if (header) {
  fetch('/fragments/header.xml')
    .then(response => response.text())
    .then(data => {
      // Add string to beginning of document.body
      const headerString = data;
      header.outerHTML = headerString;
    })
    .catch(error => console.error(error));
}

