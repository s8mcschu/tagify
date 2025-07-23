# Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Creating a new Gamification Element:
- Create a component in app/components/game-elements
- Create a tutorial component (see e.g. Points Element for reference)
- Make sure the component implements the GameElementComponent Interface and contains and subscribes to "@Input() triggerTutorialEvent?: Observable<any>;" (see e.g. Points Element for reference)
- Make the Game Element known in the types/Gamification.ts file
- If you use several game elements, make sure the session.service receives and returns the correct game element