const Post = require('../models/Post')

exports.viewCreatePage = (req,res)=>{
    res.render('create-post')
}

exports.createPost = (req, res) => {
    let post = new Post(req.body, req.session.user._id)
    post.createPost().then(()=>{
        res.send("New post created!!")
    }).catch(err =>{
        res.send(err)
    })
}