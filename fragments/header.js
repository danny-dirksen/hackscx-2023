
fetch('/fragments/header.html')
  .then(response => response.text())
  .then(data => {
    const header = document.createElement('header');
    header.innerHTML = data;
    document.body.prepend(header);
  })
  .catch(error => console.log(error));