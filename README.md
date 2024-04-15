# Frontend-Developer-test-for-Blazesoft
this is the Frontend Developer test for Blazesoft writen by Tianyi Ma.\
This project was bootstrapped with Vite.\

To run the project, you can run:\
### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:5173) to view it in your browser.\
The page will reload when you make changes.\

This project does not include the error handle page for RESTful API yet (i.e. status code 404) sicne the requirement states that this is a single-page website.\

## Design Decision

### Form
Since the requirement needs two forms with same fields, the factory pattern will work well.\
However, this project is so small and will not get further development, the form is built as a function with a reducer controling the type of the form without unnecessary decoupling.\

### SSR
This project uses ReactDOMServer to implement SSR. Since the requirement does not mention Next.js, to prevent vendor-lock, this project does not use it.\

### Popup Modal
This project includes React-Bootstrap library to make the page more readable. However, the popup windows do NOT use `Modal` component in React-Boostrap library to implement. Only Alert components uses Bootstrap.\
