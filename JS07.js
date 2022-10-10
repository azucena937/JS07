const api = 'https://reqres.in/api/users?delay=3';

const button = document.getElementById("btn");

const btn = () => {
    const container = document.getElementById("btn")
    container.innerHTML = "Leer Usuarios"
}

const spinner = () => {
    const container = document.getElementById("btn");
    container.innerHTML =
         `<div class="spinner-border text-warning" role="status">
          <span class="sr-only"></span>
          </div>`
}

const getUser = () => {
  const localData = JSON.parse(localStorage.getItem("users"));
  localData && localData.time > Date.now()
    ? printUsers(localData.content)
    : fetchRequest();
};

const fetchRequest = () => {
     spinner();
     fetch(api)
     .then((response) => response.json())
     .then((users) => {
      printUsers(users.data);
      useLocalStorage(users.data);
    }) 
     .catch(error => {
            console.log(error);
    })
     .finally( ()=>{ 
            btn(); 
    });
};

const printUser = ({ id, first_name, last_name, email, avatar }) => {
      return `<tr>
                <th>${id}</th>
                <th>${first_name}</th>
                <th> ${last_name}</th>
                <th>${email}</th>
                <th><img src="${avatar}" class="rounded-circle mx-auto" style="width: 70px"></img> </th>
            <tr/>`;
};

const printUsers = (users) => {
  const container = document.getElementById("users-container");
  container.innerHTML = `<table class="table align-middle" id="users-container" class="container-sm my-4 ocultar">
  <thead>
    <tr>
      <th scope="col">id</th>
      <th scope="col">First Name</th>
      <th scope="col">Last Name</th>
      <th scope="col">e-mail</th>
      <th scope="col">Image</th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>`;
  users.forEach((user) => (container.innerHTML += printUser(user)));

};

const useLocalStorage = (data) => {
  const users = {
    content: [...data],
    time: Date.now() + 60000,
  };
  localStorage.setItem("users", JSON.stringify(users));
};

button.addEventListener("click", getUser);