document.addEventListener("DOMContentLoaded", function(){

const profileImage = document.getElementById("profileImage")
const navProfileImage = document.getElementById("navProfileImage")

const profileName = document.getElementById("profileName")
const navProfileName = document.getElementById("navProfileName")

const nameInput = document.getElementById("nameInput")

const dropArea = document.getElementById("dropArea")
const imageUpload = document.getElementById("imageUpload")

const loginBtn = document.getElementById("loginBtn")

/* AKTUÁLIS USER */
const currentUser = localStorage.getItem("currentUser")

/* USER ADATOK BETÖLTÉSE */
let users = JSON.parse(localStorage.getItem("users")) || []
let userData = users.find(u => u.username === currentUser)

/* HA VAN LOGIN */
if(currentUser && userData){

    profileName.textContent = userData.username
    navProfileName.textContent = userData.username

    if(loginBtn) loginBtn.style.display="none"

    if(userData.profileImage){
        profileImage.src = userData.profileImage
        navProfileImage.src = userData.profileImage
    }

}else{

    profileName.textContent="Vendég"
    navProfileName.textContent="Vendég"

}

/* LOGIN */
window.goLogin = function(){
    window.location.href="../HTML/login.html"
}

/* NÉV MÓDOSÍTÁS */
window.changeName = function(){

if(!nameInput || !currentUser) return

let newName = nameInput.value.trim()
if(newName==="") return

userData.username = newName

localStorage.setItem("users", JSON.stringify(users))
localStorage.setItem("currentUser", newName)

profileName.textContent=newName
navProfileName.textContent=newName

nameInput.value=""
}

/* KÉP FELTÖLTÉS */
if(dropArea && imageUpload){
    dropArea.addEventListener("click",()=> imageUpload.click())
}

if(imageUpload){
imageUpload.addEventListener("change",function(){

const file=this.files[0]
if(!file || !userData) return

const reader=new FileReader()

reader.onload=function(e){

userData.profileImage = e.target.result

localStorage.setItem("users", JSON.stringify(users))

profileImage.src=e.target.result
navProfileImage.src=e.target.result

}

reader.readAsDataURL(file)

})
}

/* FAVORITES USERENKÉNT */
let favorites = userData?.favorites || []

const favoritesList = document.getElementById("favoritesList")

function renderFavorites(){

if(!favoritesList) return

favoritesList.innerHTML=""

favorites.forEach((band,index)=>{

let li=document.createElement("li")

li.className="list-group-item d-flex justify-content-between align-items-center"

li.innerHTML=`
${band}
<button class="btn btn-sm btn-danger" onclick="removeFavorite(${index})">X</button>
`

favoritesList.appendChild(li)

})

}

renderFavorites()

window.addFavorite=function(){

const input=document.getElementById("favoriteInput")
if(!input || !userData) return

let band=input.value.trim()
if(band==="") return

favorites.push(band)
userData.favorites = favorites

localStorage.setItem("users", JSON.stringify(users))

input.value=""
renderFavorites()

}

window.removeFavorite=function(index){

favorites.splice(index,1)
userData.favorites = favorites

localStorage.setItem("users", JSON.stringify(users))

renderFavorites()

}

/* SECTION */
window.showSection=function(sectionId){

document.querySelectorAll(".section").forEach(section=>{
section.classList.remove("active")
})

const target=document.getElementById(sectionId)
if(target) target.classList.add("active")

}

/* LOGOUT */
window.logout=function(){

localStorage.removeItem("loggedIn")
localStorage.removeItem("currentUser")

location.reload()

}

})