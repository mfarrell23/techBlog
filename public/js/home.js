const blogForm = document.querySelector("#addBlog");
blogForm.addEventListener("submit",e=>{
    e.preventDefault();
    const blogObj = {
        name:document.querySelector("#blogName").value,
        letter:document.querySelector("#blogLetter").value,
    }

    fetch("/api/blogs",{
        method:"POST",
        body:JSON.stringify(blogObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.reload()
        }
    })
})

const delButtons = document.querySelectorAll(".delBtn");

delButtons.forEach(delBtn=>{
    delBtn.addEventListener("click",e=>{
        const blogId = e.target.getAttribute("data-blogid")
        console.log(blogId);
        fetch(`/api/blogs/${blogId}`,{
            method:"DELETE"
        }).then(res=>{
            if(res.ok){
                location.reload();
            }
        })
    })
})