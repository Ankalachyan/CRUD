var text = document.getElementById("text")
var login = document.getElementById("login");
var accounttype = document.getElementById("accounttype");
var mail = document.getElementById("mail");
var pass = document.getElementById("pass");
var age = document.getElementById("age");
var nation = document.getElementById("nation");
var id = document.getElementById("id");

function getValue() {
    fetch("http://localhost:3000/addInfo", {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({ fullname: login.value, accounttype: accounttype.value, mail: mail.value, password: pass.value, age: age.value, nation: nation.value })
    })
}
