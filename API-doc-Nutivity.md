# NUTIVITY REST API

API document for Nutivity App 

## API Reference v.0.1

### Login

```http
  POST /auth/login
```

```http
  Content-type: application/json
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username` | `email` | **Required** |
| `password`    | `string` | **Required** |

Response:

```json
{
    "user": {
        "user_id": 13,
        "email": "lisaSmai@metropolia.fi",
        "name": "Lisa Smai",
        "user_filename": "",
        "role": 2
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMywiZW1haWwiOiJsaXNhU21haUBtZXRyb3BvbGlhLmZpIiwibmFtZSI6Ikxpc2EgU21haSIsInVzZXJfZmlsZW5hbWUiOiIiLCJyb2xlIjoyLCJpYXQiOjE2Mzk1ODAxNTZ9.0fHjziSRq5MaUSPu_wxpet9EWQEJBUncjYnWnzLRHmk"
```

### Register

```http
  POST /auth/register
```

```http
  Content-type: multipart/form-data
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`     | `string` | **Required, min length 3** |
| `email` | `email` | **Required, email** |
| `password`    | `string` | **Required, min length 8 characters, at least one capital letter** |
| `filename`    | `file` | **Optional** |

Response:

```json
{
    "message": "Successfully registered!",
    "emailValid": true
}
```

### Get all activities

```http
  GET /activity
```

```http
  Authorization: Bearer token
  Guest mode does not require authorization
```

Response:

```json
[
  {
        "owner": "Jessica Medrod",
        "owner_id": 8,
        "activity": "Hiking",
        "id": 14,
        "location": "Espoo",
        "description": "Hiking in Nuuksio",
        "filename": "f7ab22def71d542757f65fcb8ea3258a",
        "VST": "2021-12-08T09:18:03.000Z",
        "VET": "2022-11-30T15:00:00.000Z",
        "participantNum": 2
    },
]
```

### Add new activity

```http
  POST /activity
```

```http
  Authorization: Bearer token
```

```http
  Content-type: multipart/form-data
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`     | `string` | **Required, min length 3** |
| `location` | `date` | **Required, YYYY-MM-DD** |
| `description`    | `number` | **Required** |
| `VET`    | `number` | **Required** |
| `filename`       | `file` | **Required, jpg, png, gif** |

Response:

```json
message	"activity added with id: 97"
```

### Get one activity by id

```http
  GET /activity/:activityId
```

```http
  Authorization: Bearer token
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `activityId`      | `int` | **Required**. Id of activity to fetch |

Response:

```json
{
    "owner": "Khava Gali",
    "owner_id": 7,
    "activity": "Fishing",
    "id": 15,
    "location": "Espoo",
    "description": "Fishing in Nuuksio",
    "filename": "34a10943cfd1e406ef28d2d9150769ab",
    "VST": "2021-12-01T09:57:44.000Z",
    "VET": "2022-01-01T10:00:00.000Z",
    "participantNum": 4
}
```

### Delete one activity by id

```http
  DELETE /activity/:activityId
```

```http
  Authorization: Bearer token
```


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `activityId`      | `int` | **Required**. Id of activity to delete |

Response:

```json
{
    "message": "Activity deleted"
}
```

### Post a participation entry

```http
  POST /activity/participation/:activityId
```

```http
  Authorization: Bearer token
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `activityId`      | `int` | **Required**. Id of activity |
| `userId`      | `int` | **Required**. Id of the logged in user from the session storage |
Response:

```json
{
  "message": "add participation data { userId: '6' }"
}
```
### Delete a participation entry

```http
  DELETE /activity/participation/:activityId
```

```http
  Authorization: Bearer token
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `activityId`      | `int` | **Required**. Id of activity |
| `userId`      | `int` | **Required**. Id of the logged in user from the session storage |
Response:

```json
{
  "message": "Participation deleted"
}
```

### Get comments of an activity

```http
  GET /activity/comment/:activityId
```

```http
  Authorization: Bearer token
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `activityId`      | `int` | **Required**. Id of activity to fetch |

Response:

```json
{
    "user": "The mighty admin",
    "user_id": 1,
    "activity": "Hiking",
    "comment": "Yay play",
    "time": "2021-12-14T19:02:59.000Z"
}
```

### Post comment on an activity

```http
  GET /activity/comment/:activityId
```

```http
  Authorization: Bearer token
```

```http
  Content-type: application/json
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `activityId`      | `int` | **Required**. Id of activity to fetch |
| `comment`      | `string` | **Required**. Content of the comment |

Response:

```json
{"message": "new comment id: 122"}
```


### Get all users 

```http
  GET /user
```

```http
  Authorization: Bearer token
```

```json
[
    {
        "user_id": 1,
        "email": "dieu-test@metropolia.fi",
        "name": "The mighty admin",
        "user_filename": "1639584006904.png",
        "role": 0
    },
    {
        "user_id": 4,
        "email": "xiaoming@metropolia.fi",
        "name": "Alex",
        "user_filename": "1639564826179.png",
        "role": 0
    }
]
```

### Get an user by user ID

```http
  GET /user/:id
```

```http
  Authorization: Bearer token
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. Id of the user to fetch |

Response:

```json
{
    "user_id": 1,
    "email": "dieu-test@metropolia.fi",
    "name": "The mighty admin",
    "user_filename": "1639584006904.png",
    "role": 0,
    "ownActivity": [
        {
            "activity_id": 17,
            "name": "Swimming",
            "location": "Helsinki",
            "description": "Swimming in this weekend",
            "filename": "a00f631933d073d58219cd0959e89296",
            "owner": 1,
            "VST": "2021-12-03T11:13:08.000Z",
            "VET": "2022-01-29T10:00:00.000Z",
            "owner_name": "The mighty admin",
            "num_participant": 2
        },
        {
            "activity_id": 87,
            "name": "Skateboarding",
            "location": "Helsinki",
            "description": "Skateboarding in Helsinki",
            "filename": "1639560269822.jpg",
            "owner": 1,
            "VST": "2021-12-15T09:24:29.000Z",
            "VET": "2022-01-16T10:00:00.000Z",
            "owner_name": "The mighty admin",
            "num_participant": null
        }
    ],
    "participateActivity": [
        {
            "participant": 1,
            "activity": 14,
            "activity_id": 14,
            "name": "Hiking",
            "location": "Espoo",
            "description": "Hiking in Nuuksio",
            "filename": "f7ab22def71d542757f65fcb8ea3258a",
            "owner": 8,
            "VST": "2021-12-08T09:18:03.000Z",
            "VET": "2022-11-30T15:00:00.000Z",
            "owner_name": "Jessica Medrod",
            "num_participant": 2
        },
        {
            "participant": 1,
            "activity": 15,
            "activity_id": 15,
            "name": "Fishing",
            "location": "Espoo",
            "description": "Fishing in Nuuksio",
            "filename": "34a10943cfd1e406ef28d2d9150769ab",
            "owner": 7,
            "VST": "2021-12-01T09:57:44.000Z",
            "VET": "2022-01-01T10:00:00.000Z",
            "owner_name": "Khava Gali",
            "num_participant": 4
        }
    ]
}
```

### Modify user

```http
  PUT /user/:id
```

```http
  Authorization: Bearer token
```

```http
  Content-type: multipart/form-data
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`     | `int` | **Optional**, user_id of the user, admin only|
| `name`     | `string` | **Optional, min length 3** |
| `email` | `email` | **Optional, email**  |
| `filename`    | `file` | **Optional** |

Response:
 - If email input is not existing in database:
```json
{
    "message": "Successfully updated profile!", "emailValid": true
}
```
 - If email input is existing in database:

```json
{
    "message": "Email address is taken!",
    "emailValid": true
}
```

### Change user password:

```http
  PUT /user/:id/passwordChange
```

```http
  Authorization: Bearer token
```

```http
  Content-type: application/json
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `currentPassword`    | `string` | **Required, min length 8 characters, at least one capital letter** |
| `newPassword`    | `string` | **Required, min length 8 characters, at least one capital letter** |
| `checkPassword`    | `file` | **Required, min length 8 characters, at least one capital letter** |
| `id`      | `int` | **Required**, user_id of the user |

Response:
 - If current password correct:
```json
{
  "message": "Update password succeeded"
}
```

 - If current password incorrect:
```json
{
  "message": "Update password failed, old password incorrect"
}
```


### Change user role between Moderator and Normal user:

```http
  PUT /user/:id
```

```http
  Authorization: Bearer token
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Optional**, user_id of the user, admin only |

Response:
 - If demoting user:
```json
{
  "message": "User demotion succeeded"
}
```

 - If promoting user:
```json
{
  "message": "User promotion succeeded"
}
```


### Delete user

```http
  DELETE /user/:id
```

```http
  Authorization: Bearer token
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Optional**, user_id of the user, admin only |

Response:

```json
{
  "message": "Account has been deleted."
}
```

### Check token

```http
  GET /user/token
```

```http
  Authorization: Bearer token
```

Response:

```json
{
    "user_id":1,
    "email":"dieu-test@metropolia.fi",
    "name":"The mighty admin",
    "user_filename":"1639568891350.png",
    "role":0
}
```


### Get list of activity in the last 24 hours

```http
  GET /activity/last24hours/list
```

```http
  Authorization: Bearer token
  Guest mode does not require authorization
```

Response:
```json
[
    {
        "owner": "The mighty admin",
        "owner_id": 1,
        "activity": "Skateboarding",
        "id": 87,
        "location": "Helsinki",
        "description": "Skateboarding in Helsinki",
        "filename": "1639560269822.jpg",
        "VST": "2021-12-15T09:24:29.000Z",
        "VET": "2022-01-16T10:00:00.000Z",
        "participantNum": 0
    },
    {
        "owner": "The mighty admin",
        "owner_id": 1,
        "activity": "Movie night",
        "id": 96,
        "location": "Lapland",
        "description": "Have fun with friends",
        "filename": "1639585203987.jpg",
        "VST": "2021-12-15T16:20:04.000Z",
        "VET": "2022-01-01T21:00:00.000Z",
        "participantNum": 0
    }
]
```

### Get list if activity by a date

```http
  GET /activity/searchDate/:searchDate
```

```http
  Authorization: Bearer token
  Guest mode does not require authorization
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `searchDate`      | `datetime` | **Required**, search date |


Response: For example searchDate = '2022-01-01'
```json
[
    {
        "owner": "Khava Gali",
        "activity": "Fishing",
        "id": 15,
        "location": "Espoo",
        "description": "Fishing in Nuuksio",
        "filename": "34a10943cfd1e406ef28d2d9150769ab",
        "VST": "2021-12-01T09:57:44.000Z",
        "VET": "2022-01-01T10:00:00.000Z",
        "participantNum": 4
    },
    {
        "owner": "The mighty admin",
        "activity": "Movie night",
        "id": 96,
        "location": "Lapland",
        "description": "Have fun with friends",
        "filename": "1639585203987.jpg",
        "VST": "2021-12-15T16:20:04.000Z",
        "VET": "2022-01-01T21:00:00.000Z",
        "participantNum": 0
    }
]
```

### Get list of activity by location

```http
  GET /activity/searchDate/:searchLocation
```

```http
  Authorization: Bearer token
  Guest mode does not require authorization
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `searchLocation`      | `string` | **Required**, search location |


Response: For example location = 'espoo'
```json
[[
    {
        "owner": "Jessica Medrod",
        "activity": "Hiking",
        "id": 14,
        "location": "Espoo",
        "description": "Hiking in Nuuksio",
        "filename": "f7ab22def71d542757f65fcb8ea3258a",
        "VST": "2021-12-08T09:18:03.000Z",
        "VET": "2022-11-30T15:00:00.000Z",
        "participantNum": 2
    },
    {
        "owner": "Khava Gali",
        "activity": "Fishing",
        "id": 15,
        "location": "Espoo",
        "description": "Fishing in Nuuksio",
        "filename": "34a10943cfd1e406ef28d2d9150769ab",
        "VST": "2021-12-01T09:57:44.000Z",
        "VET": "2022-01-01T10:00:00.000Z",
        "participantNum": 4
    }
]
```

### Get list if activity by name or type

```http
  GET /activity/searchDate/:searchType
```

```http
  Authorization: Bearer token
  Guest mode does not require authorization

```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `searchType`      | `string` | **Required**, search string |


Response: For example location = 'badminton'
```json
[
    {
        "owner": "Jasmin P.",
        "activity": "Badminton",
        "id": 82,
        "location": "Turku",
        "description": "Looking for a badminton buddy.",
        "filename": "1639407176755.jpg",
        "VST": "2021-12-13T14:52:56.000Z",
        "VET": "2021-12-30T07:00:00.000Z",
        "participantNum": 1
    }
]
```


### Get list of participant by activity ID

```http
  GET /activity/participants/:activityId
```

```http
  Authorization: Bearer token
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `searchDate`      | `datetime` | **Required**, search date |

Response:

```json
[
    {
        "name": "The mighty admin",
        "activity": 14
    },
    {
        "name": "alifah",
        "activity": 14
    }
]
```


