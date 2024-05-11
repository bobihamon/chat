document.querySelector(".register").addEventListener("submit", (event) => {
    event.preventDefault()
    let {login, password, repeatPassword} = event.target
    console.log(login, password, repeatPassword)
    if(password.value != repeatPassword.value){
        alertify.error("passwords don't match")
        return
    }
    let user = {
        login: login.value,
        password: password.value
    }
    let xhr = new XMLHttpRequest()
    xhr.open("POST" , "/api/register")
    xhr.onload = () => {
        alertify.success("user created")
        
    }
    xhr.send(JSON.stringify(user))
})