const ObjectID = require("mongodb").ObjectID

const postsCollection = require('../db').db().collection("posts");

let Post = function(data, userId){
    this.data = data;
    this.errors = []
    this.userId = userId;
}

Post.prototype.cleanUp = function(){
    if(typeof(this.data.title) != "string"){this.data.title = ""}
    if(typeof(this.data.body) != "string"){this.data.body = ""}

    this.data = {
        title: this.data.title.trim(),
        body: this.data.body.trim(),
        createdDate: new Date(),
        author: ObjectID(this.userId)
    }
}

Post.prototype.validate = function(){
    if(this.data.title == ""){this.errors.push("you must provide a title")}
    if(this.data.body == ""){this.errors.push("you must provide a body")}
}

Post.prototype.createPost = function(){
    return new Promise((resolve, reject)=>{
        this.cleanUp()
        this.validate()

        if(!this.errors.length){
            postsCollection.insertOne(this.data).then(data=>{
                console.log(data)
                resolve("post created!!")
            }).catch(()=>{
                this.errors.push("please try again later..")
                reject(this.errors)
            })
        }else{
            reject(this.errors)
        }
    })
}

module.exports = Post