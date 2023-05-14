const accessToken = sessionStorage.getItem("token");
const isDoctor = sessionStorage.getItem("isDoctor");

const fetchOptions = {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer ' + accessToken
  }
};
fetch(`http://0.0.0.0:8001/doctor/`, fetchOptions)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    for (let i = 0; i < data.length; i++) {
      let item = data[i]
      addRow(item);
    }
  })
  .catch(error => {
    // Handle the error
    console.error(error);
    responseElement.innerText = "Произошла ошибка при загрузке страницы. Попробуйте позднее";
  });


function makeAppoinment(id) {
  sessionStorage.setItem('doctorId', id);
  window.location.replace("http://0.0.0.0:3001/make_appoinment");
}

function addRow(doctor) {
  var table = document.getElementById("table");
  var row = table.insertRow();
  var cell = row.insertCell();
  cell.innerHTML = `<a href="` + "#" + `" class="font-weight-bold blue-text">` + doctor.name + `</a>`;
  cell = row.insertCell();
  cell.innerHTML = `<p class="font-weight-bold"> Стаж:</p><p>` + doctor.work_years + `</p >
  <p class="font-weight-bold"> Описание:</p><p>` + doctor.description + `</p>`;
  cell = row.insertCell();
  if (isDoctor == "false") cell.innerHTML = `<div class="d-grid gap-2 col-4 mx-auto" >
    <input class="btn btn-outline-dark btn-rounded" type="submit" value="Записаться на приём"
      onclick="makeAppoinment(`+ doctor.id + `); return false;" />
  </div> `;
}