insert into comments (comment, userid, postid)
values ($1, $2, $3);
-- SELECT * FROM users u, comments c 
-- WHERE u.id = c.userid and postid = $4;