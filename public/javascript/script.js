      
        let pop=document.querySelector('#popup')
        let show=document.querySelector('#show')
        let btn=document.querySelectorAll('.edit_user')

        

        
        btn.forEach((val,id)=>{
           
            val.addEventListener('click', ()=>{
                // console.log(console.log(data[id]._id))
                popup.innerHTML=`
                    <form id="form" action="/update/${data[id]._id}" method="post">
                       <h2 class="w-full mb-2 text-right" id="close"> <i class="fa-regular fa-circle-xmark cursor-pointer"></i> <h2>
                        <input placeholder="${data[id].name}" type="text" class="h-[2.5rem] px-2 w-full rounded-md border-2 border-zinc-800 outline-none bg-zinc-600" name="name2" id="name">

                        <input placeholder="${data[id].email}" type="email" class="h-[2.5rem] px-2 w-full rounded-md border-2 border-zinc-800 outline-none bg-zinc-600 mt-2 mb-2" name="email2" id="email">
                
                        <input placeholder="${data[id].image}" type="url" class="h-[2.5rem] px-2 w-full rounded-md border-2 border-zinc-800 outline-none bg-zinc-600 mb-2 overflow-hidden" name="image2" id="url">
                        <input type="submit" value="Update User" class="px-5 py-2 rounded-md  outline-none bg-green-800 mx-5 ml-auto" >
                    </form>
                    `

                
                popup.style.display='block';

                let hid=document.querySelector('#close')
        
                hid.addEventListener('click', ()=>{
                        popup.style.display="none";
                    })

                let form=document.querySelector('#form')
                
                form.addEventListener('submit', async(e)=>{
                    e.preventDefault();
                    let name=document.getElementById('name').value;
                    let mail=document.getElementById('email').value;
                    let  url=document.getElementById('url').value;
                    // let  id=document.getElementById('id').value;

                    const response= await fetch(`/update/${data[id]._id}`, {
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json'
                        },

                        body: JSON.stringify({name, mail, url})
                    });

                    const final=await response.json();
                    popup.innerHTML=`<h3 class="text-white-800 text-2xl text-center">${final.message}</h3>`;
                    setTimeout(()=>{
                        popup.style.display="none";
                        location.reload();
                    },1000)
                })
            })
        })