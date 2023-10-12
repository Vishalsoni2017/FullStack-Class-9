const User = require('../models/User')

exports.register = (req, res)=>{
    let user = new User(req.body)
    user.register().then(()=>{
        req.session.user = {avatar: user.avatar, username: user.data.username, _id: user.data._id}
        req.session.save(()=>res.redirect('/'))
    }).catch(err =>{
        err.forEach(error => {
            req.flash('regErrors', error)
        })
        req.session.save(()=>res.redirect('/'))
    })
}

// two types of auth- session, token

exports.login = (req, res)=>{
    let user = new User(req.body)
    // user.avatar
    user.login().then((result)=>{
        req.session.user = {avatar: user.avatar ,username: user.data.username, _id: user.data._id}
        req.session.save(()=>res.redirect('/'))
    }).catch(err=>{
        // same as req.session.flash.errors = [err]
        req.flash('errors', err)
        req.session.save(()=>res.redirect('/'))
    })
}

exports.logout = (req, res)=>{
    req.session.destroy(()=>res.redirect('/'))
}

exports.home = (req, res)=>{
    if(req.session.user){
        res.render('home-dashboard')
    }else{
        res.render('home-guest', {errors: req.flash('errors'), regErrors: req.flash('regErrors')})
    }
}