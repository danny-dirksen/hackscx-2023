
fetch('/fragments/header.html')
  .then(response => response.text())
  .then(data => {
    // Add string to beginning of document.body
    data = data.replaeAll("{title}", document.title)
    document.body.innerHTML = data + document.body.innerHTML;
  })
  .catch(error => console.log(error));