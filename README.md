# crud-user-vehicle
## Installation
npm install

## Start Project
npm start


Endpoints
1. Create User
Endpoint: POST /users/createUser
Description: Create a new user.
Request Body:
name: User's name.
surname: User's surname.
email: User's email address.
password: User's password.
phone: User's phone number (optional).
location: User's location (optional).
2. User Login
Endpoint: POST /users/login
Description: Authenticate a user and get a JWT token.
Request Body:
email: User's email address.
password: User's password.
3. Get User by ID
Endpoint: GET /users/getUserById/:id
Description: Get user details by ID.
Request Parameters:
id: User ID.
4. Update User
Endpoint: PUT /users/updateUser/:id
Description: Update user details by ID.
Request Parameters:
id: User ID.
Request Body:
Any fields you want to update (e.g., name, surname, phone, location).
5. Delete User
Endpoint: DELETE /users/deleteUser/:id
Description: Delete user by ID.
Request Parameters:
id: User ID.
6. Add Vehicle to User
Endpoint: POST /users/addVehicle
Description: Add a vehicle to a user.
Request Body:
userId: ID of the user.
vehicleId: ID of the vehicle.
7. Get User Vehicles
Endpoint: GET /users/getUserVehicles/:id
Description: Get vehicles owned by a user.
Request Parameters:
id: User ID.
8. Create Vehicle
Endpoint: POST /vehicles/createVehicle
Description: Create a new vehicle.
Request Body:
vehicle_name: Vehicle name.
vehicle_brand: Vehicle brand.
vehicle_number: Vehicle registration number.
9. Get Vehicles
Endpoint: POST /vehicles/getVehicles
Description: Get vehicles based on a search query.
Request Body:
search: Search query.
Authentication
For protected endpoints, include information on how to authenticate and include the JWT token in the request header.

Error Handling
Document how errors are handled and the possible error responses.
