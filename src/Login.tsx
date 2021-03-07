import { Validator }  from "./Validator";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import { Home } from "./Home";
import ReactDOM from 'react-dom';
import { useReducer, useEffect } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 400,
      margin: `${theme.spacing(0)} auto`
    },
    loginBtn: {
        marginTop: theme.spacing(2),
        flexGrow: 1
      },
    loginMain: {
    marginTop: theme.spacing(2),
    flexGrow: 1
    },
    header: {
      textAlign: 'center',
      background: '#212121',
      color: '#fff'
    },
    card: {
      marginTop: theme.spacing(10)
    }
  })
);
const validator = new Validator();

//state type

type State = {
  username: string
  password:  string
  isLoginButtonDisabled: boolean
  isContinueButtonDisabled: boolean
  helperText: string
  isError: boolean
};

const initialState:State = {
  username: '',
  password: '',
  isLoginButtonDisabled: true,
  isContinueButtonDisabled: true,
  helperText: '',
  isError: false,
};

type Action = { type: 'setUsername', payload: string }
  | { type: 'setPassword', payload: string }
  | { type: 'setIsButtonDisabled', payload: boolean }
  | { type: 'setIsContinueButtonDisabled', payload: boolean }
  | { type: 'loginSuccess', payload: string }
  | { type: 'loginFailed', payload: string }
  | { type: 'setIsError', payload: boolean };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setUsername': 
      return {
        ...state,
        username: action.payload
      };
    case 'setPassword': 
      return {
        ...state,
        password: action.payload
      };
    case 'setIsButtonDisabled': 
      return {
        ...state,
        isLoginButtonDisabled: action.payload
      };
    case 'setIsContinueButtonDisabled':
        return {
            ...state,
            isContinueButtonDisabled: action.payload
            };
    case 'loginSuccess': 
        return {
        ...state,
        helperText: action.payload,
        isError: false
      };
    case 'loginFailed': 
      return {
        ...state,
        helperText: action.payload,
        isError: true
      };
    case 'setIsError': 
      return {
        ...state,
        isError: action.payload
      };
  }
}

const Login = () => {

  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);
  let user: any;
  let validated: boolean = false;

  useEffect(() => {
    if (state.username.trim() && state.password.trim()) {
     dispatch({
       type: 'setIsButtonDisabled',
       payload: false
     });
    } else {
      dispatch({
        type: 'setIsButtonDisabled',
        payload: true
      });
    }
  }, [state.username, state.password]);

  const handleMain = () => {
      
    ReactDOM.render(<Home username={state.username}/>, document.getElementById('app'));
  };

  const handleLogin = () => {
    [ validated, user ] = validator.validate(state.username, state.password);
    
    if (validated) {
      dispatch({
        type: 'loginSuccess',
        payload: 'Login Successfully'
      });
      dispatch({
        type: 'setIsContinueButtonDisabled',
        payload: false
      });
      dispatch({
        type: 'setIsButtonDisabled',
        payload: true
      });
    } else {
      dispatch({
        type: 'loginFailed',
        payload: 'Incorrect username or password'
      });
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => { 
    if (event.keyCode === 13 || event.which === 13) { state.isLoginButtonDisabled || handleLogin(); }
  };

  const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: 'setUsername',
        payload: event.target.value
      });
    };

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: 'setPassword',
        payload: event.target.value
      });
    }

    console.info(JSON.stringify(user));

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="Login App" />
        <CardContent>
            <TextField
              error={state.isError}
              fullWidth
              id="username"
              type="email"
              label="Username"
              placeholder="Username"
              margin="normal"
              onChange={handleUsernameChange}
              onKeyPress={handleKeyPress}
            />
            <TextField
              error={state.isError}
              fullWidth
              id="password"
              type="password"
              label="Password"
              placeholder="Password"
              margin="normal"
              helperText={state.helperText}
              onChange={handlePasswordChange}
              onKeyPress={handleKeyPress}
            />
        </CardContent>
        <CardActions>
        <Button
            variant="contained"
            size="large"
            color="secondary"
            className={classes.loginBtn}
            onClick={handleLogin}
            disabled={state.isLoginButtonDisabled}>
            Login
          </Button>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            className={classes.loginMain}
            onClick={handleMain}
            disabled={state.isContinueButtonDisabled}>
            Continue
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}

export default Login;