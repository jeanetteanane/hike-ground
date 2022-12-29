module.exports = func =>{
    return(req, res, next) =>{
        func(req, res, next).catch(next)
    }
}

//function returns pass req, res, next then passes to function, and catches the error and passes to next

//func is what you pass in, return(req, res, next) a new function then executes function and is passed to catches error and next