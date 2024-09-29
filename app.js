const express=require('express');
const app=express();
const path=require('path')
const user=require('./models/model.js')

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}))


app.get('/', (req,res)=>{
    res.render('index');
})

app.get('/read', async(req,res)=>{
    let all= await user.find();
    res.render('read', {all});
})


app.post('/create', async(req, res)=>{
    let {name, email, image}=req.body;

    await user.create({
        name,
        email,
        image
    })
    res.redirect('/')
   
})

app.get('/delete/:id', async(req, res)=>{

    let found=await user.findOneAndDelete({_id:req.params.id});
    res.redirect('/read')

})



app.post('/update/:id', async(req, res)=>{

        try{
            let preview=await user.findOne({_id:req.params.id})

            if(!preview){
               return res.status(404).json({message: "User Not found"});
            }
                const name = req.body.name ? req.body.name : preview.name;
                const email = req.body.mail ? req.body.mail : preview.email;
                const url = req.body.url ? req.body.url : preview.image;


                 let updated = await user.findOneAndUpdate(
                    { _id: req.params.id },
                    { $set: { name: name, email: email, image: url } },
                    { new: true } // returns the updated document
                );

                return res.status(200).json({message: "user updated"})
        }catch(err){
            console.log(err)
            return  res.status(500).json({message: "Error occured during upadtion"})  
        }
})


app.listen(3000);