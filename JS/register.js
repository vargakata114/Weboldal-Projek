document.addEventListener("DOMContentLoaded", function(){

    const form = document.getElementById("registerForm");

    form.addEventListener("submit", function(e){

        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        const message = document.getElementById("message");

        /* ellenőrzés */

        if(username === "" || email === "" || password === ""){
            message.style.color = "red";
            message.textContent = "Minden mezőt ki kell tölteni!";
            return;
        }

        /* meglévő userek betöltése */
        let users = JSON.parse(localStorage.getItem("users")) || [];

        /* email ellenőrzés */
        const exists = users.some(user => user.email === email);

        if(exists){
            message.style.color = "red";
            message.textContent = "Ez az email már regisztrálva van!";
            return;
        }

        /* új user */
        const user = {
            username: username,
            email: email,
            password: password
        };

        users.push(user);

        /* mentés */
        localStorage.setItem("users", JSON.stringify(users));

        /* automatikus login */
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("currentUser", email);

        message.style.color = "lightgreen";
        message.textContent = "Sikeres regisztráció!";

        setTimeout(function(){
            window.location.href = "../HTML/fooldal.html";
        }, 1000);

    });

});