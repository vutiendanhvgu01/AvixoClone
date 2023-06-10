# Overview Avixo 2 - Share-components

## Install the package
```plaintext
yarn add share-components
```
## Config to Import Share-components
For App is using which need to remote `share-components` need to config at <h3>next.config.js </h3>
please add for nextConfig:
```js
experimental:{
    externalDir:true
 }
```

## Using it inside of Avixo Apps

To use inside `Avixo Repo`, you can do the following

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { AvixoButton } from 'share-components';
```