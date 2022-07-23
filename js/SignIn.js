
function signIn()
 {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    if (username == "" || password == "")
    {
        document.getElementById("message").innerHTML = '<span id="msg">username and password required.</span>';
    }
    else
    {
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", 'http://localhost:4462/api/retailso/login');
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.send(JSON.stringify({
            "Username" : username, "Password" : password
        }));
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4  && this.status == 200)
            {
                const objects = JSON.parse(this.responseText);
                console.log("LLLKK");

                for (let object of objects)
                {
                    if (objects == "NOK")
                    {
                        document.getElementById("message").innerHTML = '<span id="msg">username or password is incorrect!</span>';
                    }
                    else
                    {
                         localStorage.setItem("usr_val", object.Name);
                         localStorage.setItem("type_val", object.Type);
                         location.href = 'LayoutPage.html'
                    }
                }
                
            }
        }
    }
 }