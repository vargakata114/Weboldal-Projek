/* AUTOMATIKUS REDIRECT, HA MÁR BE VAN LÉPVE */
document.addEventListener("DOMContentLoaded", function(){

    if(localStorage.getItem("loggedIn") === "true"){
        window.location.href = "../HTML/fooldal.html";
    }

});

/* LOGIN FUNKCIÓ */
function login(){

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const message = document.getElementById("message");

    /* ÜRES MEZŐK */
    if(username === "" || password === ""){
        message.style.color = "red";
        message.textContent = "Minden mezőt ki kell tölteni!";
        return;
    }

    /* USEREK BETÖLTÉSE */
    const users = JSON.parse(localStorage.getItem("users")) || [];

    /* USER KERESÉS */
    const foundUser = users.find(user => 
        user.username === username && user.password === password
    );

    /* SIKERES LOGIN */
    if(foundUser){

        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("currentUser", foundUser.username);

        message.style.color = "lightgreen";
        message.textContent = "Sikeres bejelentkezés!";

        setTimeout(() => {
            window.location.href = "../HTML/fooldal.html";
        }, 1000);

    } 
    /* HIBA */
    else {

        message.style.color = "red";
        message.textContent = "Hibás felhasználónév vagy jelszó";

    }
}

/* ENTER GOMB */
document.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        login();
    }
});