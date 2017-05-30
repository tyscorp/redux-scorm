# redux-scorm

[![Greenkeeper badge](https://badges.greenkeeper.io/tyscorp/redux-scorm.svg)](https://greenkeeper.io/)

WIP!

# Installation

### Like, so last year

```
npm i redux-scorm -S
```

### %CURRENT_YEAR%

```
yarn add redux-scorm
```

# Basic Usage

## Usage with Redux

```js
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { reducer as scorm, middleware as scormMiddleware } from 'redux-scorm';

// add the reducer
const reducer = combineReducers({
    scorm,
    // other reducers...
});

// add the middleware
const middleware = applyMiddleware(
    scormMiddleware({ scorm: window.API_1484_11 }),
    // other middleware...
);

// create the SCORMified store!
const store = createStore(reducer, middleware);
```

## Usage with React Redux

```js
import { connect } from 'react-redux';
import { setValue } from 'redux-scorm';

let locationComponent = ({ scorm, setValue }) => (
    <div>
        <p>Current Location: {scorm.model['cmi.location']}</p>
        <p onClick={() => setValue('cmi.location', Number(scorm.model['cmi.location'] + 1))}>Next Page</p>
    </div>
);

function mapStateToProps(state) {
    return {
        scorm: state.scorm
    };
}

const mapDispatchToProps = {
    setValue
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(locationComponent);
```

# API Reference

## Reducer

## Middleware

## Action Creators

### initialize

```
initialize()
```

### reinitialize

```
reinitialize()
```

### terminate

```
terminate()
```

### getValue

```
getValue(element)
```

### setValue
```
setValue(element, value)
```

### commit
```
commit()
```

### getLastError
```
getLastError()
```

### getErrorString
```
getErrorString(errorCode)
```

### getDiagnostic
```
getDiagnostic(errorCode)
```
