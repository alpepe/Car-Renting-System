Car Renting System Exercises
Problem 1.	DONE  Create a car renting system
Prepare your project architecture for a car renting system and implement user authentication allowing administrator role.
Problem 2.	DONE  Add /cars/add route
This route should be available only for administrators. It should display a form with which a car can be added to the system. Choose what properties each car should have but make sure you save at least an image, model and price per day for every data entry.
Problem 3.	DONE  Add /cars/all route
This route should be available for anonymous users. It should display all available cars for rent. Keep in mind that currently rented cars should not be displayed here. Add searching by a property (no case-sensitive) of your choice and paging as additional functionality for this route. 
Problem 4.	DONE  Add /cars/rent/:id route
This route should be available for all registered users. Each user should be able to choose number of days for which to rent the car with the provided Id. Each rented car should not be shown on the /cars/all route.
Problem 5.	DONE  Add /users/me route
This route should be available only for registered users. It should show for the currently logged in user all his/her rent history in a table.
Problem 6.	Add /cars/edit/:id route
This route should be available only for administrators. It should allow the user to edit the car with the provided Id.
Problem 7.	Sky is the limit
Add functionality to the system as you see fit – you may add statistics, image uploads, nice design, etc. 
