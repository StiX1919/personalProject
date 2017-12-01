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

        dbInstance.getUserInfo([authid])
        .then(response => { return res.status(200).json(response[0])})
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
        const { title, sub, content, ID, UN, ID2 } = req.body;
        
        dbInstance.createPost([title, sub, content, ID, UN, ID2])
        .then( () => { return res.status(200).json()})
        .catch(console.log)
    },
    //comment Posting
    newComment: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const { PID, COMMENT, UID, PID2 } = req.body;
        
        dbInstance.createComment([COMMENT, UID, PID, PID2])
        .then( () => { return res.status(200).json()})
        .catch(console.log)
    },
    getComments: (req,res,next)=> {
        const dbInstance = req.app.get('db')
        const { ID } = req.params

        dbInstance.getComments([ID])
        .then(response => { return res.status(200).json(response) })
        .catch(console.log)
    },
    //getting all posts for homepage
    getPosts: (req,res,next) => {
        const dbInstance = req.app.get('db')
        const { id } = req.user
        console.log('posts user', req.user)

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
        const { PID, UID } = req.params

        dbInstance.deletePost([PID, UID])
        .then(response => { return res.status(200).json(response)})
        .catch(console.log)
    }
}