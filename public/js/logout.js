/**
 * Logout button which is tied to a post request for user logout
 */
const logoutBtn = document.querySelector("#logoutBtn");
logoutBtn.addEventListener("click",e=>{
    e.preventDefault();
    console.log('LOGIN SUBMIT PREVENTED DEFAULT!')
    fetch("/api/users/logout",{
        method:"POST"
    }).then(res, err=>{
        if(res.ok){
            location.reload()
        }else{
            console.log("logout button error: " + err);
        }
    })
})