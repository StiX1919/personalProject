UPDATE users SET username = $1, runner = $2, city = $3, state = $4, age = $5, profilepic = $6 
WHERE authid = $7;
