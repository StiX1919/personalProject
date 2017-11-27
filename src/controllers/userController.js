module.exports = {
    create: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const { username, runner, city, state, age, profilePic, authID } = req.body;

        dbInstance.createUser([username, runner, city, state, age, profilePic, authID])
        .then( () => {return res.status(200).json()})
        .catch(console.log)
    },

    getInfo: (req,res,next) => {
        const dbInstance = req.app.get('db')
        const { authid } = req.user
        console.log('req.user',req.user)

        dbInstance.getUserInfo([authid])
        .then(response => {console.log(response[0]); return res.status(200).json(response[0])})
        .catch(console.log)
    },
    openJobs: (req,res,next)=> {
        const dbInstance = req.app.get('db')
        const { id } = req.user

        dbInstance.getOpenJobs([id])
        .then(response => { return res.status(200).json(response) })
        .catch(console.log)
    },
    acceptedJobs: (req,res,next)=> {
        const dbInstance = req.app.get('db')
        const { id } = req.user

        dbInstance.getAcceptedJobs([id])
        .then(response => { return res.status(200).json(response) })
        .catch(console.log)
    },
    //job posting
    newJob: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const { postTitle, subTitle, post, userID, username } = req.body;
        console.log('req body', req.body)
        
        dbInstance.createPost([postTitle, subTitle, post, userID, username])
        .then( () => {console.log('REQ BODY', req.body); return res.status(200).json()})
        .catch(console.log)
    },
    //getting all posts for homepage
    getPosts: (req,res,next) => {
        const dbInstance = req.app.get('db')
        const { id } = req.user

        dbInstance.getAllPosts([id])
        .then(response => { return res.status(200).json(response)})
        .catch(console.log)
    },
    //editing posts
    editPost: (req,res,next) => {
        const dbInstance = req.app.get('db')
        const { ID } = req.params
        
        dbInstance.editPost([ID])
        .then(response => { return res.status(200).json(response) })
        .catch(console.log)
    },
    //view posts
    posterInfo: (req,res,next) => {
        const dbInstance = req.app.get('db')
        const { ID } = req.params
        console.log('HELLO')
        
        dbInstance.getPoster([ID])
        .then(response => { return res.status(200).json(response) })
        .catch(console.log)
    },
    acceptJob: (req,res,next) => {
        const dbInstance = req.app.get('db')
        const { id } = req.user
        const { PID } = req.params

        dbInstance.acceptJob([id, PID])
        .then(response => { return res.status(200).json(response)})
        .catch(console.log)
    },
    editJob: (req,res,next) => {
        const dbInstance = req.app.get('db')
        const { postTitle, subTitle, post } = req.body;
        const { ID } = req.params
        
        dbInstance.editJob([postTitle, subTitle, post, ID])
        .then( () => {return res.status(200).json()})
        .catch(console.log)
    },
    deletePost: (req,res,next) => {
        const dbInstance = req.app.get('db')
        const { ID } = req.params
        console.log(ID)

        dbInstance.deletePost([ID])
        .then(response => { return res.status(200).json(response)})
        .catch(console.log)
    }
}