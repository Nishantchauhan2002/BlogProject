const express=require('express')
const app=express()


const path=require('path')

const {v4:uuid}=require('uuid')
const methodOverride = require('method-override')

app.set('view engine','ejs')
app.set('views',__dirname+'/views')


app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true}));


app.use(methodOverride('_method'))
app.get('/',(req,res)=>{
    res.render('home')
})
//Some Default Comments
let comments = [
    {
        id:uuid(),
        username:"Shikha Pandey",
        comment:"You are doing great "
    },
    {
        id:uuid(),
        username:"Nishant ",
        comment:"Hello from Chauhan"
    },
    {

        id:uuid(),
        username:"Vipul",
        comment:"Hello Sir"
    },
    {
        id:uuid(),
        username:"Vishal",
        comment:"Good Job"

    },
    {
        id:uuid(),
        username:'Ashish',
        comment:"Nice Work"
}
]

app.get('/comment',(req,res)=>{
    res.render('comment',{comments})
})

app.get('/newcomments',(req,res)=>{
    res.render('new')
})
app.post('/comment',(req,res)=> {
    const newComment = {
        id:uuid(),
        ...req.body
    }
    comments.push(newComment)
    // console.log(req.body)
   res.redirect('/comment')
})

app.get('/show/:id',(req,res)=>{
    const {id}=req.params;
    const foundComment=comments.find(
        (c)=>c.id===(id))
        res.render('show',{foundComment})
})
//we can pass that if any url coming from edit then we can handle in a separate space
app.get('/edit/:id',(req,res)=>{
    const {id}=req.params;
    const foundComment=comments.find(
        (c)=>c.id===(id))
        res.render('edit',{foundComment})
})

app.patch('/edit/:id',(req,res)=>{
    const {id}=req.params;
    const updatedComment=req.body.comment;
    const foundComment = comments.find((c)=> c.id === (id))
    foundComment.comment = updatedComment
    res.redirect('/comment')
})
//To delete a particular comment
app.delete('/comment/:id',(req,res)=> {
    const{id} = req.params
     const newCommentArray =  comments.filter((c)=> c.id !==id)
     comments = newCommentArray
    res.redirect('/comment')
})
app.listen(2325,(req,res)=>{
    console.log("You are listening to the port ")
})
