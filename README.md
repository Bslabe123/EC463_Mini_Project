# EC463_Mini_Project

# Synopsis
This is a simple sensor monitoring webapp developed using Node.JS. 
It handles up to four sensors.
Each sensor can be named accordingly and will produce a set of data points in JSON format. 
These data points are graphed upon login.
The app form doesnt allow for custom URLs for each of the sensors (these are hard-coded for the sake of demonstration) but can be edited at will.
An extra textbox can also be added to account for this.

# How to use
cd into the root folder of the project and start the service with
> node app.js 


if there is no other service on the conflicting port (TCP:8000) then a success message should be returned.
The service can now be seen running at
> http://localhost:8000/
