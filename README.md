# Software Design Prototype
## Front End 
## Back End
### Firebase
Firebase dadabases used to store item information. Fields include image, name, type, description, and price. All feilds must be filled in order to post an object users must fill all feilds. 
Posts will be organized in to separate pages such as explore where all items are displayed to the user, and my items where a user can see all of the listing associated with their account. 
Email Passrowd system used for user authentication system. 
## File Organization 
###Routes.js
The main organization system for the screens within the app. Bottom tab system consists of 5 main tabs Explore, User, Settings, Login, and RegisterScreen. 

## TODO:
- [x] .gitignore doesn't seem to be working!
  - Here was the solution: https://stackoverflow.com/questions/25436312/gitignore-not-working#:~:text=To%20untrack%20every%20file%20that%20is%20now%20in%20your

- [ ] Location functionality. Need to get the permission to use the location of the device, and 
then add a field to the items in the database for their location (which I should be able to 
  automatically fetch with a built in function). Jan talks about it here:
  https://youtu.be/y_2JjNYuK6A?t=761

## To Run: 
Run `expo update`

Then run `expo start` and scan the QR code with the app on my phone. 

