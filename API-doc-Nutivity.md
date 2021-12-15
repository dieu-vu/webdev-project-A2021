# NUTIVITY REST API

API document for Nutivity App 

## API Reference v.0.1

#### Login

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

#### Register

```http
  POST /auth/register
```

```http
  Content-type: application/json
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

#### Get all activities

```http
  GET /activity
```

```http
  Authorization: Bearer token
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

#### Add new activity

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

#### Get one activity by id

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

#### Delete one activity by id

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

#### Post a participation entry

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
#### Delete a participation entry

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



#### Get all users

```http
  GET /user
```

```http
  Authorization: Bearer token
```

Response:

```json
[
  {
    "user_id": 3,
    "name": "John Doe",
    "email": "john@metropolia.fi",
    "role": 1
  }
]
```

#### Get one user

```http
  GET /user/:id
```

```http
  Authorization: Bearer token
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `cat_id`      | `int` | **Required**. cat_id of user to fetch |

Response:

```json
{
  "user_id": 3,
  "name": "John Doe",
  "email": "john@metropolia.fi",
  "role": 1
}
```

#### Modify user

```http
  PUT /user
```

```http
  Authorization: Bearer token
```

```http
  Content-type: application/json
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`     | `int` | **Optional**, user_id of the user, admin only|
| `name`     | `string` | **Optional, min length 3** |
| `email` | `email` | **Optional, email**  |
| `passwd`    | `number` | **Optional, min length 8 characters, at least one capital letter** |

Response:

```json
{
  "message": "user modified"
}
```

#### Delete user

```http
  DELETE /user
```

```http
  Authorization: Bearer token
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user_id`      | `int` | **Optional**, user_id of the user, admin only |

Response:

```json
{
  "message": "user deleted"
}
```

#### Check token

```http
  GET /user/token
```

```http
  Authorization: Bearer token
```

Response:

```json
{
  "user_id": 3,
  "name": "John Doe",
  "email": "john@metropolia.fi",
  "role": 1
}
```
