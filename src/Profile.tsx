import { Button, Box, Card, CardContent, CardHeader, TextField, CardActions } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Props } from './Properties';
import { Validator } from './Validator';

import React, { useReducer } from 'react';
import { Home } from './Home';
import ReactDOM from 'react-dom';

const validator = new Validator();


type State = {
  id: string, username: string, password:  string, first_name: string, other_names: string
  ad_street: string, ad_town: string, ad_county: string, ad_postcode: string,
  mobile: string, email: string, company: string,
  pref_mail: boolean, pref_sms: boolean,
  isEditDisabled: boolean, isCancel: boolean, isOkDisabled: boolean, 
  helperText: string, isError: boolean
};

const initialState:State = {
  id: '', username: '', password: '', first_name: '', other_names: '',
  ad_street: '', ad_town: '', ad_county: '', ad_postcode: '',
  mobile: '', email: '', company: '',
  pref_mail: false,  pref_sms: false,  
  isEditDisabled: false, isOkDisabled: true, isCancel: true, helperText: '', isError: false,
};

enum act {
  pwd, uname, pname, fname, oname, street, town, county, pcode, mob, email, company, 
  mail, sms, isEditDisabled, isOkDisabled, isCancel, isError
}

type Action = { type: act.uname, payload: string }
  | { type: act.pwd, payload: string } | { type: act.fname, payload: string }
  | { type: act.oname, payload: string } | { type: act.street, payload: string }
  | { type: act.town, payload: string } | { type: act.county, payload: string }
  | { type: act.pcode, payload: string } | { type: act.mob, payload: string }
  | { type: act.email, payload: string } | { type: act.company, payload: string }
  | { type: act.mail, payload: boolean } | { type: act.sms, payload: boolean }
  | { type: act.isEditDisabled, payload: boolean } | { type: act.isCancel, payload: boolean } | { type: act.isOkDisabled, payload: boolean }
  | { type: act.isError, payload: boolean };


const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case act.uname: return { ...state, username: action.payload };
    case act.pwd: return { ...state, password: action.payload };
    case act.fname: return { ...state, first_name: action.payload };
    case act.oname: return { ...state, other_names: action.payload };
    case act.street: return { ...state, ad_street: action.payload };
    case act.town: return { ...state, ad_town: action.payload };
    case act.county: return { ...state, ad_county: action.payload };
    case act.pcode: return { ...state, ad_postcode: action.payload };
    case act.mob: return { ...state, mobile: action.payload };
    case act.email: return { ...state, email: action.payload };
    case act.company: return { ...state, company: action.payload };
    case act.mail: return { ...state, pref_mail: action.payload };
    case act.sms: return { ...state, pref_sms: action.payload };
    case act.isEditDisabled: return { ...state, isEditDisabled: action.payload };
    case act.isOkDisabled: return { ...state, isOkDisabled: action.payload };
    case act.isCancel: return { ...state, isCancel: action.payload };
    case act.isError: return { ...state, isError: action.payload };
  }
}

const useStyles = makeStyles((theme: Theme) =>
createStyles({
    container: { display: 'flex', flexWrap: 'wrap', width: 400, margin: `${theme.spacing(0)} auto` },
    btn: { marginTop: theme.spacing(2), flexGrow: 1 },
    header: { textAlign: 'left', background: '#212121', color: '#fff' },
    card: { marginTop: theme.spacing(1) },
    textcell: { textAlign: 'left'}
  })
);


  const loadStateFromScreen = (state: State, username: string) => {

    if (state.id==='') {
      const user = validator.getUser2(username);
      if (user!= null){
        state.id = user.id;
        state.username = username;
        state.first_name = user.first_name;
        state.other_names = user.other_names;
        state.password = user.password;
        const address = user.address;
        state.ad_street = address.street;
        state.ad_town = address.town;
        state.ad_county = address.county;
        state.ad_postcode = address.postcode;
        state.mobile = user.mobile;
        state.email = user.email;
        state.company = user.company;
        const pref = user.preferences;
        state.pref_mail = pref.mail;
        state.pref_sms = pref.sms;
      } else {
        throw new Error("Unable to load profile");
      }  
    }
  }
  
  // const saveProfile = (state: State): ProfileType => {

  //   const ret: ProfileType = {
  //     id: state.id,
  //     username: state.username, 
  //     first_name: state.first_name,
  //     other_names: state.other_names, 
  //     password: state.password,
  //     address: { street: state.ad_street, town: state.ad_town, county: state.ad_county, postcode: state.ad_postcode}, 
  //     mobile: state.mobile, 
  //     email: state.email, 
  //     company : state.company, 
  //     preferences: { mail: state.pref_mail, sms: state.pref_sms}      
  //   };
  //   return ret;
  // }
  
  
  export const Profile = (props: Props) => {

    const classes = useStyles();
    const [state, dispatch] = useReducer(reducer, initialState);
    const onChg = ((action: any, ppayload: any) => {
      dispatch({ type: act.isOkDisabled, payload: false });
      dispatch({ type: action, payload: ppayload });
    });
    const onUnameChg: React.ChangeEventHandler<HTMLInputElement> = (event) => { onChg( act.uname, event.target.value); };
    const onPwdChg: React.ChangeEventHandler<HTMLInputElement> = (event) => { onChg( act.pwd, event.target.value ); };
    const onFnameChg: React.ChangeEventHandler<HTMLInputElement> = (event) => { onChg( act.fname, event.target.value ); };
    const onOnameChg: React.ChangeEventHandler<HTMLInputElement> = (event) => { onChg( act.oname, event.target.value ); };
    const onStreetChg: React.ChangeEventHandler<HTMLInputElement> = (event) => { onChg( act.street, event.target.value ); };
    const onTownChg: React.ChangeEventHandler<HTMLInputElement> = (event) => { onChg( act.town, event.target.value ); };
    const onCountyChg: React.ChangeEventHandler<HTMLInputElement> = (event) => { onChg( act.county, event.target.value ); };
    const onPcodeChg: React.ChangeEventHandler<HTMLInputElement> = (event) => { onChg( act.pcode, event.target.value ); };
    const onMobChg: React.ChangeEventHandler<HTMLInputElement> = (event) => { onChg( act.mob, event.target.value ); };
    const onEmailChg: React.ChangeEventHandler<HTMLInputElement> = (event) => { onChg( act.email, event.target.value ); };
    const onCoyChg: React.ChangeEventHandler<HTMLInputElement> = (event) => { onChg( act.company, event.target.value ); };
    // const onMailChg: React.ChangeEventHandler<HTMLInputElement> = (event) => { dispatch({ type: act.mail, payload: event.target.value }); };
    // const onSmsChg: React.ChangeEventHandler<HTMLInputElement> = (event) => { dispatch({ type: act.sms, payload: event.target.value }); };
    const handleKeyPress = (event: React.KeyboardEvent) => 
    { 
      // if (event.keyCode === 13 || event.which === 13) { 
      //   state.isLoginButtonDisabled || handleLogin(); 
      // }
    };
    const handleEdit = () => {
      dispatch({ type: act.isEditDisabled, payload: true });
      dispatch({ type: act.isOkDisabled, payload: true });
    };
    const handleOk = () => {
      dispatch({ type: act.isOkDisabled, payload: true });
    };
    const handleCancel = () => {
      if(!state.isEditDisabled) {
        ReactDOM.render(<Home username={state.username}/>, document.getElementById('app'));
      }
      dispatch({ type: act.isCancel, payload: true });
    };
    // let okVisibility: string = "hidden";
    // if (state.isEditDisabled ) okVisibility = "visible";
    const showit = (stat: boolean) => {
      let okVisibility: string = "hidden";
      if (stat ) okVisibility = "visible";
      return okVisibility;
    }
    // const okVisibility: string = "hidden";
  
    loadStateFromScreen(state, props.username);
    return (
      <form className={classes.container} noValidate autoComplete="off">
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="User Profile" />
        <CardContent>

          <TextField fullWidth id="id" value={state.id} label="Id" placeholder="Id" margin="normal" InputProps={{readOnly: true}} />
          <TextField fullWidth id="username" value={state.username} label="username" placeholder="username" margin="normal" onChange={onUnameChg} onKeyPress={handleKeyPress} InputProps={{readOnly: !state.isEditDisabled }} />
          <TextField fullWidth id="password" value={state.password} label="password" placeholder="password" margin="normal" onChange={onPwdChg} onKeyPress={handleKeyPress} InputProps={{readOnly: !state.isEditDisabled }} />
          <TextField fullWidth id="first_name" value={state.first_name} label="first_name" placeholder="first_name" margin="normal" onChange={onFnameChg} onKeyPress={handleKeyPress} InputProps={{readOnly: !state.isEditDisabled }} />
          <TextField fullWidth id="other_names" value={state.other_names} label="other_names" placeholder="other_names" margin="normal" onChange={onOnameChg} onKeyPress={handleKeyPress} InputProps={{readOnly: !state.isEditDisabled }} />
          <TextField fullWidth id="street" value={state.ad_street} label="street" placeholder="street" margin="normal" onChange={onStreetChg} onKeyPress={handleKeyPress} InputProps={{readOnly: !state.isEditDisabled }} />
          <TextField fullWidth id="town" value={state.ad_town} label="town" placeholder="town" margin="normal" onChange={onTownChg} onKeyPress={handleKeyPress} InputProps={{readOnly: !state.isEditDisabled }} />
          <TextField fullWidth id="county" value={state.ad_county} label="county" placeholder="county" margin="normal" onChange={onCountyChg} onKeyPress={handleKeyPress} InputProps={{readOnly: !state.isEditDisabled }} />
          <TextField fullWidth id="postcode" value={state.ad_postcode} label="postcode" placeholder="postcode" margin="normal" onChange={onPcodeChg} onKeyPress={handleKeyPress} InputProps={{readOnly: !state.isEditDisabled }} />
          <TextField fullWidth id="mobile" value={state.mobile} label="mobile" placeholder="mobile" margin="normal" onChange={onMobChg} onKeyPress={handleKeyPress} InputProps={{readOnly: !state.isEditDisabled }} />
          <TextField fullWidth id="email" value={state.email} label="email" placeholder="email" margin="normal" onChange={onEmailChg} onKeyPress={handleKeyPress} InputProps={{readOnly: !state.isEditDisabled }} />
          <TextField fullWidth id="company" value={state.company} label="company" placeholder="company" margin="normal" onChange={onCoyChg} onKeyPress={handleKeyPress} InputProps={{readOnly: !state.isEditDisabled }} />
          {/* <TextField fullWidth id="mail" label="mail" placeholder="mail" margin="normal" onChange={onMailChg} onKeyPress={handleKeyPress} />
          <TextField fullWidth id="sms" label="sms" placeholder="sms" margin="normal" onChange={onSmsChg} onKeyPress={handleKeyPress} /> */}
        <CardActions>
          <Box component="span" visibility={showit(!state.isEditDisabled)}>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            className={classes.btn}
            onClick={handleEdit}
            disabled={state.isEditDisabled}>
            Edit
          </Button>
          </Box>
          <Box component="span" visibility={showit(state.isEditDisabled)}>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            className={classes.btn}
            onClick={handleOk}
            disabled={state.isOkDisabled}
            >
            Save
          </Button></Box>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            className={classes.btn}
            onClick={handleCancel}>
            Cancel
          </Button>
          </CardActions>
          <div>
          </div>
        </CardContent>
      </Card>
  hello
    </form>
    )


}