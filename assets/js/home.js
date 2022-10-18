const { values } = require("lodash");


const all_post=document.querySelectorAll('.comment-btn');
for(let i=0;i<all_post.length;i++){

  all_post[i].addEventListener('click',myFunction);
} 
function myFunction() {
  const comment_id=0;
  console.log(comment_id);


  }