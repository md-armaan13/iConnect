
const comment_btn =document.getElementById('comment-btn');

comment_btn.addEventListener('click',myFunction);
var x = document.getElementById("comments-section");
  function myFunction() {
   
    if (x.style.display == "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }