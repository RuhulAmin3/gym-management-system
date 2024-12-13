# Gym Management System

## Project Overview
The Gym Management System is designed to streamline the management of gym operations, including trainee registrations, trainer scheduling, and class bookings. This backend system provides a robust API to handle user authentication, scheduling, and booking functionalities efficiently.

## Live Hosting Link
[Gym Management System Live](https://gym-management-system-mocha.vercel.app/)

## Relation Diagram
![Relational Diagram](https://i.ibb.co.com/0hm4wch/prismaliser.png)

## Technology Stack
- **Language**: TypeScript
- **Framework**: Express.js
- **ORM**: Prisma
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Hosting**: Vercel
- **Pattern**: Modular

## API Endpoints

### Auth API
#### Login User
- **Endpoint**: `auth/v1/login` (POST) - login user
- **Request Body**:
  ```json
  {
      "email": "rahihasan@gmail.com",
      "password": "123123"
  }
  ```
- **Response**:
  ```json
  {
      "success": true,
      "statusCode": 200,
      "message": "user login successful",
      "data": {
          "accessToken": "<JWT Access Token>"
      }
  }
  ```

#### Register Trainee
- **Endpoint**: `auth/v1/register` (POST) - Only trainee can Register
- **Request Body**:
  ```json
  {
      "name": "Rahi Hasan",
      "email": "rahihasan@gmail.com",
      "password": "123123"
  }
  ```
- **Response**:
  ```json
  {
      "success": true,
      "statusCode": 201,
      "message": "Trainee account created successfully",
      "data": {
          "id": "675bc19ec8b3dea6374cd127",
          "name": "kafi Hasan",
          "userId": "675bc19dc8b3dea6374cd126",
          "createdAt": "2024-12-13T05:09:50.571Z",
          "updatedAt": "2024-12-13T05:09:50.571Z"
      }
  }
  ```

#### Add Trainer
- **Endpoint**: `auth/v1/trainer` (POST) - only admin can add trainer
- **Request Body**:
  ```json
  {
        "name": "William Fancy",
        "specialty": "Body fitness trainer",
        "email": "william.fancy@gmail.com",
        "password": "123123"
    }
  ```
- **Response**:
  ```json
   {
        "success": true,
        "statusCode": 201,
        "message": "Trainer added successfully",
        "data": {
            "id": "675bc7169a93c59977235d71",
            "name": "William Fancy",
            "userId": "675bc7169a93c59977235d70",
            "specialty": "Body fitness trainer",
            "createdAt": "2024-12-13T05:33:10.874Z",
            "updatedAt": "2024-12-13T05:33:10.874Z"
        }
  ```
#### Update Password
- **Endpoint**: `auth/v1/update-password` (POST) - user can update password
- **Request Body**:
  ```json
  {
            "oldPassword": "123123",
            "newPassword": "123456"
        }
  ```
- **Response**:
  ```json
   {
        "success": true,
        "statusCode": 200,
        "message": "user password updated successfully",
        "data": {
            "id": "675ba042a5fcdd22d87e7476",
            "email": "rahihasan@gmail.com",
            "role": "Trainee",
            "createdAt": "2024-12-13T02:47:30.488Z",
            "updatedAt": "2024-12-13T05:34:58.289Z"
        }
    }
  ```



### Trainer API
#### Get All Trainer
- **Endpoint**: `api/v1/trainer` (POST) - get all trainers
- **Query Params**:
    - `page`, `limit`, `sortBy`, `sortOrder`
- **Response**:
  ```json
  {
            "success": true,
            "statusCode": 200,
            "message": "all trainer retrived successfully",
            "meta": {
                "limit": 10,
                "total": 3,
                "page": 1,
                "totalPages": 1,
                "prevPage": null,
                "nextPage": null
            },
            "data": [
                {
                    "id": "675b2d6b26c67fa119b05967",
                    "name": "Robert Brown",
                    "userId": "675b2d6a26c67fa119b05966",
                    "specialty": "Cardio",
                    "createdAt": "2024-12-12T18:37:31.399Z",
                    "updatedAt": "2024-12-12T18:37:31.399Z",
                    "classes": [
                        {
                            "id": "675b09fe6a091b95ee24bce7",
                            "classDate": "2024-12-17T00:00:00.000Z",
                            "startTime": "2024-12-13T08:00:00.000Z",
                            "endTime": "2024-12-13T10:00:00.000Z",
                            "trainerId": "675b2d6b26c67fa119b05967",
                            "trainees": 8,
                            "createdAt": "2024-12-12T16:06:22.053Z",
                            "updatedAt": "2024-12-13T05:59:16.031Z"
                        }
                    ]
                },
                {
                    "id": "675b2d5426c67fa119b05965",
                    "name": "Jane Smith",
                    "userId": "675b2d5326c67fa119b05964",
                    "specialty": "Yoga Trainer",
                    "createdAt": "2024-12-12T18:37:08.470Z",
                    "updatedAt": "2024-12-13T02:58:36.190Z",
                    "classes": []
                }
            ]
        }
  ```

#### Get Single Trainer
- **Endpoint**: `api/v1/trainer/:id` (Get) - get single trainer
- **Response**:
  ```json
  {
            "success": true,
            "statusCode": 200,
            "message": "trainer retrived successfully",
            "data":
                {
                    "id": "675b2d6b26c67fa119b05967",
                    "name": "Robert Brown",
                    "userId": "675b2d6a26c67fa119b05966",
                    "specialty": "Cardio",
                    "createdAt": "2024-12-12T18:37:31.399Z",
                    "updatedAt": "2024-12-12T18:37:31.399Z",
                    "classes": [
                        {
                            "id": "675b09fe6a091b95ee24bce7",
                            "classDate": "2024-12-17T00:00:00.000Z",
                            "startTime": "2024-12-13T08:00:00.000Z",
                            "endTime": "2024-12-13T10:00:00.000Z",
                            "trainerId": "675b2d6b26c67fa119b05967",
                            "trainees": 8,
                            "createdAt": "2024-12-12T16:06:22.053Z",
                            "updatedAt": "2024-12-13T05:59:16.031Z"
                        }
                    ]
                },
            }

  ```

#### Update Single Trainer
- **Endpoint**: `api/v1/trainer/:id` (PATCH) - Update single trainer
- **Request Body**:
  ```json
  {
        "name": "William Fancy",
        "specialty": "Body fitness trainer",
  }
  ```
- **Response**:
  ```json
  {
            {
        "success": true,
        "statusCode": 200,
        "message": "Trainer updated successfully",
        "data": {
            "id": "675bc7169a93c59977235d71",
            "name": "William Fancy",
            "userId": "675bc7169a93c59977235d70",
            "specialty": "Body fitness trainer",
            "createdAt": "2024-12-13T05:33:10.874Z",
            "updatedAt": "2024-12-13T05:33:10.874Z"
        }

    }

  ```

#### Delete Single Trainer
- **Endpoint**: `api/v1/trainer/:id` (DELETE) - delete single trainer

- **Response**:
```json 
  {
        "success": true,
        "statusCode": 200,
        "message": "trainer deleted successfully",
        "data": null
  } 
  ```






### Class Schedule API
#### Create Class Schedule
- **Endpoint**: `api/v1/class-schedule` (POST) - create class schedule
- **Request Body**:
  ```json
  {
      "classDate": "2024-12-20",
      "startTime": "10:00",
      "endTime": "11:00",
      "trainerId": "675bc1a0c8b3dea6374cd130"
  }
  ```
- **Response**:
  ```json
  {
        "success": true,
        "statusCode": 201,
        "message": "class schedule created successfully",
        "data": {
            "id": "675bc8709a93c59977235d72",
            "classDate": "2024-12-13T00:00:00.000Z",
            "startTime": "2024-12-13T08:00:00.000Z",
            "endTime": "2024-12-13T10:00:00.000Z",
            "trainerId": null,
            "trainees": 0,
            "createdAt": "2024-12-13T05:38:56.036Z",
            "updatedAt": "2024-12-13T05:38:56.036Z"
      }
  }
  ```

#### Get All Class Schedule
- **Endpoint**: `api/v1/class-schedule` (GET) - get all class schedule
- **Query Params**:
    - `date=2024-12-13`, `page`, `limit`, `sortBy`, `sortOrder`
- **Response**:
  ```json
  {
        "success": true,
        "statusCode": 200,
        "message": "all class schedule retrived successfully",
        "meta": {
            "limit": 10,
            "total": 4,
            "page": 1,
            "totalPages": 1,
            "prevPage": null,
            "nextPage": null
        },

        "data": [
            {
                "id": "675b06b1372e5fe9f121d1af",
                "classDate": "2024-12-17T00:00:00.000Z",
                "startTime": "2024-12-12T08:00:00.000Z",
                "endTime": "2024-12-12T10:00:00.000Z",
                "trainerId": null,
                "trainees": 0,
                "createdAt": "2024-12-12T15:52:17.748Z",
                "updatedAt": "2024-12-12T15:52:17.748Z"
            },
            {
                "id": "675b06a6372e5fe9f121d1ae",
                "classDate": "2024-12-17T00:00:00.000Z",
                "startTime": "2024-12-12T06:00:00.000Z",
                "endTime": "2024-12-12T08:00:00.000Z",
                "trainerId": null,
                "trainees": 0,
                "createdAt": "2024-12-12T15:52:06.548Z",
                "updatedAt": "2024-12-12T15:52:06.548Z"
            },
        ]
  }
  ```
#### Get Single Class Schedule
- **Endpoint**: `api/v1/class-schedule/:id` (Get) - get a class schedule
- **Response**:
  ```json
  {
        "success": true,
        "statusCode": 200,
        "message": "class schedule retrieved successfully",
        "data": {
                "id": "675b09fe6a091b95ee24bce7",
                "classDate": "2024-12-16T00:00:00.000Z",
                "startTime": "2024-12-12T08:00:00.000Z",
                "endTime": "2024-12-12T10:00:00.000Z",
                "trainerId": "675b2d6b26c67fa119b05967",
                "trainees": 8,
                "createdAt": "2024-12-12T16:06:22.053Z",
                "updatedAt": "2024-12-13T02:29:38.196Z"
        }
  }

  ```

#### Update Single Class Schedule
- **Endpoint**: `api/v1/class-schedule/:id` (PUT) - Update single class schedule
- **Request Body**:
  ```json
  {
        "classDate": "2024-12-16",
        "startTime": "14:00",
        "endTime": "16:00"
    }
  ```
- **Response**:
  ```json
  {
        "success": true,
        "statusCode": 200,
        "message": "class schedule updated successfully",
        "data": {
            "id": "675b09fe6a091b95ee24bce7",
            "classDate": "2024-12-17T00:00:00.000Z",
            "startTime": "2024-12-13T08:00:00.000Z",
            "endTime": "2024-12-13T10:00:00.000Z",
            "trainerId": "675b2d6b26c67fa119b05967",
            "trainees": 8,
            "createdAt": "2024-12-12T16:06:22.053Z",
            "updatedAt": "2024-12-13T05:59:16.031Z"
        }
   }
  
  ```

#### Assign Trainer in Class Schedule
- **Endpoint**: `api/v1/class-schedule/:id` (PATCH) - assign trainer into a class schedule
- **Request Body**:
  ```json
  {
    "trainerId": "675bc7169a93c59977235d71"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "trainer assign successfully in the class schedule",
    "data": {
        "id": "675b06b1372e5fe9f121d1af",
        "classDate": "2024-12-17T00:00:00.000Z",
        "startTime": "2024-12-12T08:00:00.000Z",
        "endTime": "2024-12-12T10:00:00.000Z",
        "trainerId": "675bc7169a93c59977235d71",
        "trainees": 0,
        "createdAt": "2024-12-12T15:52:17.748Z",
        "updatedAt": "2024-12-13T06:04:10.974Z"
    }
  }
  ```

#### Delete Single Class Schedule
- **Endpoint**: `api/v1/class-schedule/:id` (DELETE) - delete single Class Schedule

- **Response**:
```json 
  {
        "success": true,
        "statusCode": 200,
        "message": "class schedule deleted successfully",
        "data": null
  }
  ```


### Trainee API
#### Get All Trainee
- **Endpoint**: `api/v1/trainee` (POST) - get all trainees
- **Query Params**:
    - `page`, `limit`, `sortBy`, `sortOrder`
- **Response**:
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "all trainee retrived successfully",
    "meta": {
        "limit": 10,
        "total": 13,
        "page": 1,
        "totalPages": 2,
        "prevPage": null,
        "nextPage": 2
    },
    "data": [
        {
            "id": "675ba043a5fcdd22d87e7477",
            "name": "Rahi Hasan",
            "userId": "675ba042a5fcdd22d87e7476",
            "createdAt": "2024-12-13T02:47:31.049Z",
            "updatedAt": "2024-12-13T02:47:31.049Z",
            "bookings": []
        },
        {
            "id": "675b3be61a839f53f29c6075",
            "name": "Sumaiya khan",
            "userId": "675b3be41a839f53f29c6066",
            "createdAt": "2024-12-12T19:39:17.943Z",
            "updatedAt": "2024-12-13T03:10:15.787Z",
            "bookings": [
                {
                    "id": "675ba43da5fcdd22d87e7478",
                    "traineeId": "675b3be61a839f53f29c6075",
                    "classScheduleId": "675b06a6372e5fe9f121d1ae",
                    "createdAt": "2024-12-13T03:04:29.615Z",
                    "updatedAt": "2024-12-13T03:04:29.615Z",
                    "classSchedule": {
                        "id": "675b06a6372e5fe9f121d1ae",
                        "classDate": "2024-12-17T00:00:00.000Z",
                        "startTime": "2024-12-12T06:00:00.000Z",
                        "endTime": "2024-12-12T08:00:00.000Z",
                        "trainerId": null,
                        "trainees": 1,
                        "createdAt": "2024-12-12T15:52:06.548Z",
                        "updatedAt": "2024-12-13T03:04:30.195Z"
                    }
                }
            ]
        }
    ]
  }
  ```
#### Booking Class Schedule
- **Endpoint**: `api/v1/trainee/booking` (POST) - booking class schedule
- **Request Body**:
  ```json
  {
    "classScheduleId": "675b06a6372e5fe9f121d1ae",
    "traineeId":"675b3be61a839f53f29c6075"
  }
  ```
- **Response**:
  ```json
  {
        "success": true,
        "statusCode": 200,
        "message": "class schedule booking successfully",
        "data": {
            "id": "675ba43da5fcdd22d87e7478",
            "traineeId": "675b3be61a839f53f29c6075",
            "classScheduleId": "675b06a6372e5fe9f121d1ae",
            "createdAt": "2024-12-13T03:04:29.615Z",
            "updatedAt": "2024-12-13T03:04:29.615Z"
        }
  }
  ```

#### Get Single Trainee
- **Endpoint**: `api/v1/trainee/:id` (Get) - get single trainee
- **Response**:
  ```json
  {
            "success": true,
            "statusCode": 200,
            "message": "trainer retrived successfully",
            "data":
                {
                    "id": "675b2d6b26c67fa119b05967",
                    "name": "Robert Brown",
                    "userId": "675b2d6a26c67fa119b05966",
                    "specialty": "Cardio",
                    "createdAt": "2024-12-12T18:37:31.399Z",
                    "updatedAt": "2024-12-12T18:37:31.399Z",
                    "classes": [
                        {
                            "id": "675b09fe6a091b95ee24bce7",
                            "classDate": "2024-12-17T00:00:00.000Z",
                            "startTime": "2024-12-13T08:00:00.000Z",
                            "endTime": "2024-12-13T10:00:00.000Z",
                            "trainerId": "675b2d6b26c67fa119b05967",
                            "trainees": 8,
                            "createdAt": "2024-12-12T16:06:22.053Z",
                            "updatedAt": "2024-12-13T05:59:16.031Z"
                        }
                    ]
                },
            }

  ```

#### Update Single Trainee
- **Endpoint**: `api/v1/trainee/:id` (PATCH) - Update single trainer
- **Request Body**:
  ```json
  {
    "name": "Sumaiya khan"
  }
  ```
- **Response**:
  ```json
  {
        "success": true,
        "statusCode": 200,
        "message": "trainee updated successfully",
        "data": {
            "id": "675b3be61a839f53f29c6075",
            "name": "Sumaiya khan",
            "userId": "675b3be41a839f53f29c6066",
            "createdAt": "2024-12-12T19:39:17.943Z",
            "updatedAt": "2024-12-13T06:21:13.899Z"
        }
  }

  ```

#### Delete Single Trainee
- **Endpoint**: `api/v1/trainee/:id` (DELETE) - delete single trainee

- **Response**:
```json 
  {
    "success": true,
    "statusCode": 200,
    "message": "traine deleted successfully",
    "data": null
  }
  ```

## Database Schema
### Models
- **User**: Stores user information and roles (Admin, Trainer, Trainee).
- **Trainer**: Stores trainer profiles and their classes.
- **Trainee**: Stores trainee profiles and their bookings.
- **ClassSchedule**: Defines class schedules.
- **Booking**: trainee class schedule bookings.

## Admin Credentials
- **Email**: `dev.ruhulamin3@gmail.com`
- **Password**: `123123`

## Trainer Credentials
- **Email**: `william.fancy@gmail.com`
- **Password**: `123123`

## Trainee Credentials
- **Email**: `kafi@gmail.com`
- **Password**: `123123`

## Instructions to Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/RuhulAmin3/gym-management-system
   cd gym-management-system
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Rename the `.env.example` file into `.env`

4. Start the server:
   ```bash
   npm run dev
   ```
5. Access the API documentation at: `http://localhost:4000`
