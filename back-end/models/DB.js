const { Pool } = require("pg");
const connectionString = process.env.DB_URL;
const pool = new Pool({
  connectionString,
});
pool
  .connect()
  .then((res) => {
    console.log(`project five DB connected will...`);
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = pool;








const createAllTables = () => {
  pool
    .query(
      `
   

      

 CREATE TABLE roles (
  id SERIAL PRIMARY KEY  NOT NULL,
  role VARCHAR(255) NOT NULL
 
);
CREATE TABLE permissions (
  id SERIAL PRIMARY KEY  NOT NULL,
  role_id INT REFERENCES roles(id),
  permission VARCHAR(255) NOT NULL
 
);



CREATE TABLE regions (
id SERIAL PRIMARY KEY  NOT NULL,
region VARCHAR(255) NOT NULL
);



CREATE TABLE users (
id SERIAL PRIMARY KEY  NOT NULL,
user_region INT REFERENCES regions(id),
user_role INT REFERENCES roles(id),
firstName VARCHAR(255),
lastName VARCHAR(255),
nikeName VARCHAR(255),
email VARCHAR(255) UNIQUE,
password VARCHAR(255),
active SMALLINT DEFAULT 0,
is_deleted SMALLINT DEFAULT 0,
latitude VARCHAR(255) null,
longitude VARCHAR(255) null,
image VARCHAR(255) DEFAULT 0 ,
created_at TIMESTAMP



);

CREATE TABLE categories (
id SERIAL PRIMARY KEY  NOT NULL,
category VARCHAR(255) NOT NULL,
created_at TIMESTAMP ,
image VARCHAR(255) DEFAULT 0
);




CREATE TABLE sub_categories (
id SERIAL PRIMARY KEY  NOT NULL,
category_id INT REFERENCES categories(id),
sub_category VARCHAR(255),
image VARCHAR(255) DEFAULT 0
);


CREATE TABLE status (
id SERIAL PRIMARY KEY  NOT NULL,
status_name VARCHAR(255) 



);

CREATE TABLE services (
id SERIAL PRIMARY KEY  NOT NULL,
service_provider INT REFERENCES users(id),
sub_category_id INT REFERENCES users(id),
service_title VARCHAR(255),
description  TEXT,
default_image VARCHAR(255) NOT NULL,
created_at TIMESTAMP
);


CREATE TABLE services_images (
id SERIAL PRIMARY KEY  NOT NULL,
image VARCHAR(255) ,
service_id INT REFERENCES services(id),
created_at TIMESTAMP
);


CREATE TABLE posts (
id SERIAL PRIMARY KEY  NOT NULL,
poster_id INT REFERENCES users(id),
sub_category_id INT REFERENCES sub_categories(id),
title VARCHAR(255) ,
service_id INT REFERENCES services(id),
description TEXT,
image VARCHAR(255)  NOT NULL,
created_at TIMESTAMP

);
CREATE TABLE comments (
id SERIAL PRIMARY KEY  NOT NULL,
commenter_id INT REFERENCES users(id),
post_id INT REFERENCES posts(id),
comment TEXT ,
created_at TIMESTAMP

);
CREATE TABLE orders (
id SERIAL PRIMARY KEY  NOT NULL,
service_provider_id INT REFERENCES services(id),
status_id INT REFERENCES status(id),
sub_category_id INT REFERENCES sub_categories(id),
review TEXT ,
created_at TIMESTAMP

);
CREATE TABLE customer_provider_rate(
id SERIAL PRIMARY KEY  NOT NULL,
customer_id INT REFERENCES users(id),
provider_id INT REFERENCES services(id),
rate INT ,
created_at TIMESTAMP

);
CREATE TABLE provider_rates(

  id SERIAL PRIMARY KEY  NOT NULL,
  
  provider_id INT REFERENCES services(id),
  
  total_rate INT default 0
  
  );

  ` )
    .then((result) => {
      console.log("result", result);
    })
    .catch((err) => {
      console.log(err);
    });
};




//createAllTables()