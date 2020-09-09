# editor

## Project description
App contain two windows:
* textarea, where user can enter text with appropriate data tags
* preview, where the converted text is displayed. 

Interpreted tags have the format:
`
{{ MethodName/argument }}
`

The data is downloaded from the cocoinpaprica website (https://api.coinpaprika.com)   
(The maximum limit of request which we can sent to the API is 10/s)

Any errors are displayed under the input and output windows.

Editor interprets two type of tags: 
* `{{ Name/Symbol }}` - get full name of the coin, (Example: `{{Name/BTC }} -> Bitcoin`
* `{{ Exchange/Symbol }}` - get the current exchange rate of a given cryptocurrency

### Project setup 
Clone and install project

```
git clone https://github.com/annatrzeciak/editor.git
cd editor/
npm install
```

### Run project
Run cloned and installed project
```
npm run serve
```

