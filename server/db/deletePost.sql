DELETE FROM comments where postid = $1;
DELETE FROM posts WHERE id = $1;
Select * FROM posts where userid = $2