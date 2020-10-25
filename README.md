<p align="center"><img width=20% src="https://github.com/zhuhanming/hit-your-targets/blob/master/assets/logo.png" /></p>
<h1 align="center">Hit Your Targets</h1>
<h3 align="center">A todo list for the meticulous</h2>

<p align="center"><a href="https://app.netlify.com/sites/eloquent-visvesvaraya-83fcf0/deploys" target="_blank"><img src="https://api.netlify.com/api/v1/badges/e702b129-4d70-4b36-afaf-f8f015c62f92/deploy-status" alt="Netlify Status"/></a>

> This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Table of contents
   * [Get started](#get-started)
   * [Project structure](#project-structure)
       * [Rules when creating a new React component](#rules-when-creating-a-new-react-component)
   * [React hooks exposed by the app](#react-hooks-exposed-by-the-app)
       * [useAuth](#useauth)
       * [useUser](#useuser)
       * [useSearch](#usesearch)
       * [useTheme](#usetheme)
       * [useTodo](#usetodo)
       * [useView](#useview)

## Get started
### Environment Variables
This project uses environment variables. Before running the application with `yarn start`, make sure there is a `.env` or `.env.local` file in the root directory containing the following keys:

```
REACT_APP_BACKEND_API=<Your backend url here>
```

It is recommended to run the backend server locally on your machine and point the environment variable to the local URL.

You can find and build the backend server in the [zhuhanming/hit-your-targets-api](https://github.com/zhuhanming/hit-your-targets-api) repository.

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Project structure
The current project structure is as shown below:
```
hityourtargets
├─public/
└─src/
  │ index.ts    
  │ serviceWorker.ts
  ├─app/
  ├─assets/
  ├─components/
  ├─constants/
  ├─contexts/
  ├─interfaces/
  ├─reducers/
  ├─routes/
  ├─services/
  └─utils/
```
### Rules when creating a new React component
This project creates a new folder for each component in its most sensible parent directory. 

* For example, a component such as the `Navbar` that is used by multiple other components should exist in the `components/` folder.
* A component that is only used by a single other component should exist in a subfolder of the parent component.
    * E.g. the `main/CalendarCard/`, `main/FunFact/`, `main/MainCard/` folders.

* Components wrapped by React Router's `<Route>` object should be contained in the `routes/` folder.

 A typical component folder should look like this:
 
```
component
├─subComponents/ # Folders containing stateless/function components
│ Component.scss  # The styles for the component with the same name
| index.tsx  # The stateful component for the stateless component it contains
 ```
A future modification would be to have a `index.ts` that simply points to the correct `Component.tsx` file, to allow for easy refactoring of components without having to change all imports for other components that uses the refactored component.
 
> The bare minimum that a component folder should contain is `index.tsx`. The rest are optional.

### `app/` directory
Contains:

* `App.tsx`, the entry point of the application.
* `store.tsx`, for Redux store.

### `assets/` directory
Contains animations, images, and general scss folders.  

### `components/` directory
Contains components that are used by more than 1 (or 2) components.

### `constants/` directory
Contains constants that are used throughout the application.

### `contexts/` directory
Contains contexts providing React hooks and providers that can be used by React components.

### `interfaces/` directory
Contains interfaces used in the application.

### `reducers/` directory
Contains reducers used in the application. [Redux Toolkit](https://redux-toolkit.js.org/) is used as the redux library of choice.

### `routes/` directory
Contains folders containing components that are wrapped by React Router's `<Route>` in `src/app/AuthenticatedApp` or `src/app/UnauthenticatedApp`.

### `services` and `utils` directory
Contain helper services, functions and data for usage around the application.


## React hooks exposed by the app
These hooks are exported from the various `contexts/*context` files in the `contexts` folder.
### useAuth
Useful authentication functions.

```
import { useAuth } from 'contexts/authContext';
```
Contains:

* `data`: The current user logged in.
* `login(form: {email: string, password: string})`: Used to log in with the given form.
* `signup(form: {email: string, password: string, fullName: string, passwordConfirmation: string})`: Used to register with the given form.
* `logout()`: Log out of the application.

#### Usage
```
const { logout } = useAuth()

<Button onClick={logout} />
``` 

### useUser
Retrieve user information.

```
import { useUser } from 'contexts/userContext';
```

#### Usage
```
// App.tsx
const App = () => {
  const user = useUser();

  return user 
      ? <AuthenticatedApp /> 
      : <UnauthenticatedApp />
};
```

### useSearch
Retrieve search information.

```
import { useSearch } from 'contexts/searchContext';
```
Contains:

* `searchType`: The current search criteria - by title or by tag. When not searching: `null`
* `titleString`: The title being searched for.
* `tags`: The list of tags being searched for.
* `searchLogic`: The current search logic for tags - must have all tags or must have any tag.
* `getFilteredTodos(todos: ToDo[])`: Used to get the list of todos meeting current search criteria.

#### Usage
```
// routes/list/index.tsx
const { todos } = useSelector(selectTodos);
const filteredTodos = getFilteredTodos(todos);
```

### useTheme
Retrieve current theme.

```
import { useTheme } from 'contexts/themeContext';
```
Contains:

* `theme`: The current theme, either `''` or `'dark'`.
* `toggle()`: Toggles the current theme.

#### Usage
```
const { theme, toggle } = useAuth()

<Button className={`button ${theme}`} onClick={toggle} />
```

### useTodo
Useful todo functions that connects backend and redux store.

```
import { useTodo } from 'contexts/todoContext';
```
Contains:

* `loadTodos()`: Fetches todos and loads results into store. The only function that is not async.
* `createTodo(code: {title: string, description: string, startTime: string, endTime: string, completed: boolean, tags: string[]})`: Creates todo and loads result into store.
* `createSubTodo(id: number, code: {title: string, startTime: string, endTime: string, completed: boolean})`: Creates a subtodo under the todo of given `id` and loads result into store.
* `updateTodo(id: number, code)`: Updates todo of given `id` and loads result into store. `code` is of the same structure as that of `createTodo`, except that all parameters are optional.
* `updateSubTodo(todoId: number, subtodoId: number, code)`: Updates subtodo of given `subtodoId` from todo of given `todoId` and loads result into store. `code` is of the same structure as that of `createSubTodo`, except that all parameters are optional.
* `deleteTodo(id: number)`: Deletes todo of given `id` and loads result into store.
* `deleteSubTodo(todoId: number, subtodoId: number)`: Deletes subtodo of given `subtodoId` from todo of given `todoId` and loads result into store.

#### Usage
```
const { updateTodo } = useTodo()
const { id } = todo;

const handleIncomplete = async () => {
  try {
    await updateTodo(id, {
      completed: false
    });
  } catch (error) {
    Sentry.captureException(error);
  }
}
```

### useView
Retrieve current View selected.

```
import { useView } from 'contexts/viewContext';
```
Contains:

* `viewSelected`: The current view - `View.TODAY`, `View.NEXT_SEVEN_DAYS`, `View.ALL` or `View.COMPLETED`
* `updateView(newView: View)`: Updates the current view.

#### Usage
```
const { updateView } = useView()

<Button onClick={(): void => updateView(View.TODAY)} />
```


