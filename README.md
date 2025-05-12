In this task I have created the TODO List using React(Rect+Vite) Tailwind CSS for styling and enchaning the UI for frontend and for backend Convex Database.

In these user can submite five forms and each form is having five object.

After submitting all 5 forms only the submit button get visiable to submit the response till then it is disablead.

The TODO List get created at after submitting all the forms at the downword side user can tick the list after completing the task.

In backend the the response given by the user get stored in the Convex Database and the Admin can See it.



Steps to run backend:-

npx convex dev --once --configure=new (If you are using Convex database for first time then you need to signup and login here.)

npm install convex

npx convex push

npx convex codegen

npx convex dev



Steps to run frontend:-

npm install

npm install react-datepicker

npm run dev
