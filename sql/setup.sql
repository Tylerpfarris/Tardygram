DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS comments CASCADE;


CREATE TABLE users (
    github_user_name TEXT NOT NULL PRIMARY KEY,
    github_avatar_url TEXT NOT NULL
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY NOT NULL,
    post_by TEXT NOT NULL
        REFERENCES users(github_user_name)
        ON DELETE CASCADE,
    photo_url TEXT NOT NULL,
    caption TEXT,
    tags TEXT[]
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY NOT NULL,
    post_id INTEGER NOT NULL
        REFERENCES posts(id)
        ON DELETE CASCADE,
    comment TEXT NOT NULL,
    comment_by TEXT NOT NULL
        REFERENCES users(github_user_name)
        ON DELETE CASCADE
        
);