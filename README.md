# Axum - PostgreSQL - NextJS (with MUI)

This is a full-stack example app with [Rust's Axum framework](https://github.com/tokio-rs/axum), PostgreSQL, NextJS *(with TypeScript and MUI)*. 

After completing the installation steps below, you can send a sign up request from **frontend** to your **Axum backend** to insert the user data to the **database**. And the app sends a dummy mail to the user who signed up. 

That's all.

# Installation

Since this is a full stack example, the installation might take a while. Especially the database.

## Step 1 - Configure the `backend`

This and the front end is very easy. Just go to **`/backend`** directory and run **`cargo install`**. Then run the backend with `cargo watch -x run` and wait for the program to be compiled.

### Edit `.env` file
You need to edit the .env file to change these four parameters:
 - **DATABASE**
 - **SMTP_USERNAME** 
 - **SMTP_PASSWORD** 
 - **SENDER**

Use this format for the entry **DATABASE**:
>"host=localhost user={YOUR_USER} password='{YOUR_PASSWORD}' port={YOUR_PORT (5432 is default for psql)} dbname={YOUR_DB_NAME}"

Please mind the spaces between the parameters. For more information, check [the official tokio_postgres example](https://docs.rs/tokio-postgres/0.7.6/tokio_postgres/index.html).

**SMTP_USERNAME** is the Gmail email addresss you want to use. **SMTP_PASSWORD** is the password of [the app password for the Gmail address](https://support.google.com/accounts/answer/185833?hl=en).

**SENDER** can be anything but it's usually the name of your app.

## Step 2 - Configure the `frontend`
I used [the official NextJS template for Material UI](https://github.com/mui/material-ui/tree/master/examples/nextjs-with-typescript). So if the files like `Link.tsx` or `_document.tsx` don't make sense, this is because I didn't create them but take them from the template.

Just install the packages using `npm i` and run the app with `npm run dev`. It will open the app on `localhost:3000`.

### Edit `.env` file
You need to edit `.env` file to declare the backend. I used `localhost:5000`, you can change it to whatever port you want.

## Configure the `database`

I used PostgreSQL for this example. If you use a different database it's totally fine but you need to edit the backend accordingly. This guide only for Postgres example.

First of all make sure that PostgreSQL is installed on your system. Then run the `postgresql` service if it's not actively running.

After creating the user and the database, just run the command in `schemas.sql` file to create the `user` schema. That's all for database.

# Running
After completing these steps successfully, you can send a request from the frontend using the form there and check the database if the user is created and check the user's inbox if the email is sent.

Please feel free to create an issue if you notice an error.
