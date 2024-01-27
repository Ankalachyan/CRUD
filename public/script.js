var text = document.getElementById("text")
console.log(text.innerHTML);
var login = document.getElementById("login");
var pass = document.getElementById("pass");
var mail = document.getElementById("mail");
function getValue() {
    fetch("http://localhost:3000/addInfo", {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body:JSON.stringify({login:login.value,password:pass.value, mail:login.mail})
    } )
}