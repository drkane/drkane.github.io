---
layout: post
title:  "Development version of WordPress on Windows 10"
date:   2016-06-13 11:19:35 +0100
---

**The problem**: I need a local development version of WordPress to help test problems with the live site and also test updates. Previously I’ve used WAMP but that tends to get a bit messy, particularly on Windows 10.

**The solution**: use docker to create a container with all the needed files that can be run when necessary. The steps described here create a copy of WordPress which allows you to access the WordPress installation files and database directly, allowing you to create an exact copy of the live site.

## Step 1 – install Docker

Download and install the [Docker Toolbox](https://www.docker.com/products/docker-toolbox). We’ll be mostly using `docker-compose`.

## Step 2 – configure the container

This step was adapted from the [instructions shown in the Docker WordPress docs](https://docs.docker.com/compose/wordpress/). The main adaptations are to allow for access to the filesystem and direct database access.

Navigate to an empty directory and create a file called `docker-compose.yaml`. Open and edit the file to include the following text:

```yaml
version: '2'
services:
  db:
    image: mysql:5.7
    volumes:
      - "./.data/db:/var/lib/mysql"
    restart: always
    ports:
      - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: wordpress
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wordpress
      MYSQL_PASSWORD: wordpress

  wordpress:
    volumes:
      - "./html:/var/www/html"
    depends_on:
      - db
    image: wordpress:latest
    links:
      - db
    ports:
      - "8000:80"
    restart: always
    environment:
      WORDPRESS_DB_HOST: db:3306
      WORDPRESS_DB_PASSWORD: wordpress
```

## Step 3 – copy the live files

You now need to make a copy of the files from your live site. I did this by downloading them via FTP from the server. Make sure you have a copy of all three main WordPress directorys (`wp-admin`, `wp-content`, `wp-includes`) plus the `index.php` file and any files starting `wp-*.php` in the main directory.

Copy these files into a directory called `html` in your project directory.

## Step 4 – edit wp-config.php

Because you’ve directly copied the files from the live site, your configuration settings won’t work. Open `wp-config.php` from the `html` directory in your text editor, and change the following configuration values to match the values specified in the docker-compose.yaml file.

```php
/** The name of the database for WordPress */
define('DB_NAME', 'wordpress');

/** MySQL database username */
define('DB_USER', 'wordpress');

/** MySQL database password */
define('DB_PASSWORD', 'wordpress');

/** MySQL hostname */
define('DB_HOST', 'db:3306');
```

You’ll also need to add or edit variables that give the URL of your site so that it doesn’t redirect to the live one. Add the following lines (removing any existing definitions of `WP_SITEURL` and `WP_HOME`):

```php
define('WP_HOME','http://192.168.99.100:8000/');
define('WP_SITEURL','http://192.168.99.100:8000/');
```

(Note: I think `192.168.99.100` is the default IP address given by Docker to the container, but yours may be different. The `:8000` port is configured in the `docker-compose.yaml` file.)

## Step 5 – run the container

To run the container I ran the “Docker Quickstart Terminal” which has been installed to the start menu. This gives access to the Docker virtual machine command line so you can run commands.

Navigate to the directory where the `docker-compose.yaml` you created above is located (using `cd xxxx`) and then run

```
docker-compose up -d
```

This will create the database and WordPress containers and start them. You can now access the installation in three ways:

- View the website (and access the admin backend) through your web browser at <http://192.168.99.100:8000/> (nb don’t do this yet as we haven’t copied the database)
- Edit theme and plugin files through your file system using the `html/wp-content/` directory in your project
- Directly access the database by connecting through host `192.168.99.100` on port `3306` using the user `wordpress` with password `wordpress`

## Step 6 – copy the database

The next stage is to take a copy of your live MySQL database and apply it to the local version. I did this by:

- Connect to the database using [HeidiSQL](http://www.heidisql.com/) with the credentials given above
- Dropping or emptying all the tables created when the container was started
- Getting a sql dump of the live site as a single file (I used [wpb2d](https://wordpress.org/plugins/wordpress-backup-to-dropbox/) for this)
- Editing the SQL dump file so that the `USE database;` statement at the top of the file was changed to `USE wordpress;` – this makes sure the SQL is executed in the right database
- Loading the SQL dump file in HeidiSQL and then running it.

Depending on the size of your file this might take a little while.

## Step 7 – use the site

Now if you go to <http://192.168.99.100:8000/> you should be able to access your site, and the admin backend should be available at <http://192.168.99.100:8000/wp-admin/>. You should be able to log in using the same credentials you use on the live site.

## Notes

- I found that if I made changes to the `docker-compose.yaml` file when tweaking the setup I would then need to run the `docker-compose down` command before re-running `docker-compose up -d`. There may be a better way to do this (`docker-compose build`?)
- You may find that some URLs (particularly in pages and posts) are hardcoded to point to the live site – this can mean you switch to the live version without realising it, so be careful! You can use [something like this tool from interconnectit](https://interconnectit.com/products/search-and-replace-for-wordpress-databases/) to change these values in the database.
- Be careful about user data – any personal data held in the live site is now also held in the local site. You may want to replace or anonymise the data in the `wp_users` table.
- You can [add your docker IP address to your hosts file](http://blog.pavelsklenar.com/5-useful-docker-tip-and-tricks-on-windows/) to make it into a nicer URL. If you do this don’t forget to change the `WP_SITEURL` and `WP_HOME` variables to reflect the change.
