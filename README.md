# NUTIVITY PROJECT
Web development group project - Autumn 2021 - Metropolia

## IDEA

To create a web application for different sorts of activity sharing for registered users. 

## SCREENSHOTS OF THE DEPLOYED APP

Landing page

<img src="/app/assets/landing_page.png" width="70%">

Home page

<img src="/app/assets/home_page.png" width="70%">

## BUILD

1. Clone the project
```
    git clone https://github.com/dieu-vu/webdev-project-A2021.git
    cd webdev-project-A2021
```
2. Install dependencies
```
    npm i
```
3. Create/edit .env file with your database credentials: You have to contact owners for the credentials

```
 DB_HOST=127.0.0.1
 DB_USER=<your-db-user>
 DB_PASS=<your-db-user_password>
 DB_NAME=<your-db-name>
```

4. Run the application

```node app.js```

## API 

🔗 [**API Reference for Nutivity App**](https://github.com/dieu-vu/webdev-project-A2021/blob/version2/API-doc-Nutivity.md)

## USAGE OF THE DEPLOYED WEB

1. Login 

With credentials or without - if without then enter the home page for guests with limited functionalities.
2. Register

Create a new username - after creation redirect to login
3. User page
- User can open side menu to modify user profile, example: Name, email, password and profile picture by clicking on edit button or profile picture
- View joined activities and activities you as a user have published
- Random image generation if the user has not added a profile image or there is an error downloading it.
4. Activity page
- Join and opt out from activities through detailed pop up window
- Enter the comment section
- View activity cards as stack
- Hint texts to encourage users to open pop up menu
- Random image generation if the user has not added an activity image or there is an error downloading it.
- Only admin, moderator and activity owner can see delete button on activities
5. Search page
- Search activities by name/type, location or date
- Join activities or opt out from them
6. Pop-up window for the detailed-view of activity
- Possible on every page where activities displayed
- Access to activity specific comment platform
7. Comment page
- Connected with pop up windows and commenting is activity specific
- Comment time visible in minutes, hours and seconds
8. Admin
- Only visible for admins on the side navigation.
- Admin can delete all users, their activities and promote and demote moderators
9. Guest page
- The functionality for guests is very limited. They are only able to see the details of all valid - activities and search for specific activities by location, name or date.
10. Account settings page
- User can edit general information as in side menu in user page
- User can change password
- User can delete their own account with a confirmation required

11. Secure with HTTPS redirection

## DATABASE STRUCTURE
![Database structure](/app/assets/database.png?raw=true "Database") <br>

We have created a database with four tables. The foreign key constraint ONDELETE and ONUPDATE is implemented for all table to keep integrity of whole database, e.g. so if one user has been deleted, all activities, his/her participation and comments will be automatically deleted as well.

For participate_in table, we have implemented double identifiers, so the same user can never join the same activity twice.

We also implement uni-temporal data for the activity table and comment_in table.

🔗 [Project database SQL](/app/projectdb.sql) <br>

## CONTRIBUTORS
[Dieu Vu](https://github.com/dieu-vu) <br>
[Jasmin Partanen](https://github.com/jasminsp)<br>
[Xiaoming Ma](https://github.com/myxmxm)<br>
With support and teaching from course teachers: Patrick Ausderau, Ilkka Kylmäniemi, Aarne Klemetti, Ulla Sederlöf at Metropolia UAS.

Contact contributors for help if neccessary.

## LICENSE
Apache License 2.0
