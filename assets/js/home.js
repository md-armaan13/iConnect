
{
  // method to submit form data for post using ajax
    let createPost= ()=>{
      let newPost=$('#user-postcreate');
      // NOW WE DONT WANT FORM TO BE NATURALLY SUBMIT SO WE REMOVE ITS FUNCTIONALITY
        newPost.submit((e)=>{
          e.preventDefault();

          $.ajax({

            type: 'post',
            url :'/user-post',
            data :newPost.serialize(),//THIS CONVERT FORM DATA INT JSON
            success :(data)=>{
              if(data.data.redirect==true){
                window.location.href = data.data.redirect_url;
              }
              console.log(data);
            let postdata1=  createPosttoDom(data.data.post)
           $('#post-contained').prepend(postdata1)
           $("#message").val("");
            },
            error : (err)=>{
              console.log(err.responseText);
            }

          });

          
        });
    }
      //method to create post in the dom 

      let createPosttoDom=(i)=>{

        return $(`<div class="card gedf-card my-3" id="${i._id}">
        <div class="card-header">
            <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="mr-2">
                        <img class="rounded-circle" width="45" src="https://picsum.photos/50/50" alt="">
                    </div>
                    <div class="ml-2">
                        <div class="h5 m-0">@Username</div>
                        <div class="h7 text-muted">${i.user.name}</div>
                    </div>
                </div>
                <div>
                    <div class="dropdown">
                        <button class="btn btn-link dropdown-toggle" type="button" id="gedf-drop1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="text-decoration:none ;">
                            <i class="fa fa-ellipsis-h"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="gedf-drop1">
                            <div class="h6 dropdown-header">Configuration</div>
                            <a class="dropdown-item" href="#">Save</a>

                           
                            <a class="dropdown-item" href="/user-post/delete/${i._id}">Delete</a>
                      

                            <a class="dropdown-item" href="#">Report</a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="card-body">
            <div class="text-muted h7 mb-2"> <i class="fa fa-clock-o"></i> 10 min ago</div>

            <p class="card-text">
                ${i.content}
            </p>
           
        </div>
        <div class="card-footer">
            <a href="#" class="card-link"><i class="fa fa-gittip"></i> Like</a>
            <button class="card-link comment-btn" value="${i.id}" ><i class="fa fa-comment " ></i> Comment</button>
            <a href="#" class="card-link"><i class="fa fa-mail-forward"></i> Share</a>
        </div>
        <div id="comments-section" >
            <form action="/comments" method="post" >
            <div class="md-form mb-1 pink-textarea active-pink-textarea-2 ">
                <textarea id="form17" name="content" class="md-textarea form-control my-2" rows="2" placeholder="Type Here.." required></textarea>
               
                <!-- PASSING THE ID OF THE POST TO THE CONTROLLER IN THE HIDDEN INPUT -->
                <input type="hidden" name="post" id="" value="<${i._id}">
                <button type="submit" class="button3 mx-2 my-3">Add Comment</button>
                

              </div>
            </form>
            </div>
            <hr>
                
    </div>`)

      }


        createPost();

        document.querySelectorAll('.button-likes').forEach(button => {

          button.addEventListener('click', e => {
              button.classList.toggle('liked');

              





              if(button.classList.contains('liked')) {
                  gsap.fromTo(button, {
                      '--hand-rotate': 8
                  }, {
                      ease: 'none',
                      keyframes: [{
                          '--hand-rotate': -45,
                          duration: .16,
                          ease: 'none'
                      }, {
                          '--hand-rotate': 15,
                          duration: .12,
                          ease: 'none'
                      }, {
                          '--hand-rotate': 0,
                          duration: .2,
                          ease: 'none',
                          clearProps: true
                      }]
                  });
              }
          })
      
      });
  }