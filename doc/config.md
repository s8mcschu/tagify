## Configuration

### Frontend

In the [src/environments](../frontend/src/environments) directory, you will find three files with the following settings:

#### config.json

| Setting               | Values  | Explanation                                                                                                        |
| --------------------- | ------- | ------------------------------------------------------------------------------------------------------------------ |
| contactMail           | String  | This setting will place your Mail Address on some of the standard views. Example: 'prename.surname@provider.com'   |
| contactName           | String  | This setting will place youe name on some of the standard views.                                                   |
| resourceTimer         | Number  | Set the duration in milliseconds, with which resources are shown to users. Default: 5000                           |
| animationSpeedFactor  | Number  | Bigger values will speed up animations like page transitions, smaller values will slow them down. Default: 2       |
| resourceFolder        | String  | Path to the directory of the resources you want to show within the 'src/assets' folder. Default: 'tagging/images/' |
| cookieBanner          | Boolean | Show the default Cookie Banner. Default: true                                                                      |
| allowManualViewAccess | Boolean | [Developer option]: Disable automatic routing. Default: false                                                      |
| allowZeroTags         | Boolean | [Developer option]: Allow users to enter 0 tags for a resource. Default: false                                     |

#### environment.ts and environment.prod.ts

| Setting   | Values | Explanation                                                                                                                                                                                                                                |
| --------- | -----: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| serverURL | String | The URL through which your website can connect to your backend. In development (environment.ts) this will per default be http://localhost:56879. This value will be overridden with the entry in environment.prod.ts for your final build. |

### Backend

In the [src/environment](../backend/src/environment) directory, you will find a config.json file with the following settings:
| Setting | Values | Explanation |
|-------------|----------------:|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| port | Number | The port under which your server will be available. If you change this value, also change the serverUrl in your frontend settings. Standard: 56879 |
| corsOrigins | List of Strings | List of URLs (comma separated) which are allowed to communicate with the backend. Per default, the frontend hosted on http://localhost:4200 is allowed. If you host the frontend website on an external server, you will need to add the server address here. |
