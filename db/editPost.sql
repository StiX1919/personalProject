SELECT p.id, p.post_title, p.post_sub, p.post, p.runnerid, u.username, u.city, u.state, u.runner, u.profilepic, p.userid 
FROM posts p, users u WHERE u.id = p.userid and p.id = $1;