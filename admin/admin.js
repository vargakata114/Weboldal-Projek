function showPage(pageId){
document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
document.getElementById(pageId).classList.add('active');
}

let users = ["Admin", "User1"];

function renderUsers(){
const table = document.getElementById("userTable");
table.innerHTML = "";

users.forEach((user, index)=>{
table.innerHTML += `       <tr>         <td>${user}</td>         <td>           <button onclick="deleteUser(${index})">Törlés</button>         </td>       </tr>
    `;
});
}

function addUser(){
const input = document.getElementById("username");
if(input.value.trim() !== ""){
users.push(input.value);
input.value = "";
renderUsers();
}
}

function deleteUser(index){
users.splice(index,1);
renderUsers();
}

renderUsers();
