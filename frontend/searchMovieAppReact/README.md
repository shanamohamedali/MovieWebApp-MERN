## Movie Search App (Sample Netflix Clone)
  A simple movie search app developed using React. Where you can log in using a username and password, you can see a list of movies on the home page and search for movies.
  
  ![img](https://github.com/shanamohamedali/searchMovieAppReact/blob/master/Screenshot_12-1-2025_165959_localhost.jpeg)
  ![img](https://github.com/shanamohamedali/searchMovieAppReact/blob/master/Screenshot_12-1-2025_165432_localhost.jpeg)
  

  ## Features 
  - **Forms** Login Form, Signup Form, Forget password. 
    Form validation - On blur and submission form validation is applied.
    on Blur, an invalid message will appear if the user enters an incorrect format.
    If the user submits the form without filling out any field, the required message will show up in the fields.
    In the Login Form if the user enters the correct username and password the user will be redirected to the home page. Otherwise, an error message will appear. Only Authenticated users can access the home page.
- **Movie List with Search Box**
    On the home page, movies are listed, and also you can search for movies.
- **Dark and Light Mode**
   A button to switch between dark and light mode.
- **Logout**
   The logout button can be used to log out of the home page. if a user logs in, the user can't go back to the login page until he logs out. (Protected Router used)

- ## Technologies Used
- **React Router Dom** - To navigate between pages and for protected router
- **Custom Hooks** - Handling input fields, and managing local storage all this is performed using customs hooks
- **Debounce** - Debounce has been used to improve the performance and to avoid unnecessary API calls
- **Context** -To manage state across components.
-**Axios** - to make an HTTP request to fetch data from TMDB API
- **Tailwind CSS**- For styling and responsive user interface
- **Vite**- for bundling and serving app

- ## How to Run?
- **Install Dependencies**
- Run `npm install` to install the app's dependencies.

-**Start the App**
- Run `npm run dev` to start the app
  
- ##Live Link
  [Site Link](https://filmcraze.netlify.app/)
                  
  
  

  
