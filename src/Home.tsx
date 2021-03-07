 import { Button, Card, CardActions, CardHeader } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Profile } from './Profile';
import { Props } from './Properties';
import { ButtonGroup } from '@material-ui/core';
import ReactDOM from 'react-dom';

const useStyles = makeStyles((theme: Theme) =>
createStyles({
    container: { display: 'flex', flexWrap: 'wrap', width: 400, margin: `${theme.spacing(0)} auto` },
    btn: { marginTop: theme.spacing(2), flexGrow: 1 },
    header: { textAlign: 'left', background: '#212121', color: '#fff' },
    card: { marginTop: theme.spacing(1) },
    textcell: { textAlign: 'left'},
    column: { display: "flex", flexDirection: "column", width: 250, margin: "0 auto"},
    groupedOutlined: { "&:not(:first-child)": { marginLeft: -1},
      "&:not(:last-child)": {borderRightColor: "rgba(0, 0, 0, 0.23)"}
    }
  })
);

  
  export const Home = (props: Props) => {

    const handleProfile = () => {
      ReactDOM.render(<Profile username={props.username} />, document.getElementById('app'));
    };
    const handleDummy = () => {
      return;
    };

    const classes = useStyles();

    return (
      <form noValidate autoComplete="off">
        <Card className="classescard">
          <CardHeader className="classesheader" title="Menu Options" />
        <CardActions>
        <ButtonGroup
        fullWidth
        aria-label="full width outlined button group"
        className={classes.column}
        classes={{ groupedOutlined: classes.groupedOutlined }}
      >
          <Button
            variant="contained"
            size="large"
            color="secondary"
            className={classes.btn}
            onClick={handleProfile}
          >
          Profile of  {props.username}
          </Button>
          <Button variant="contained" size="large" color="secondary" className={classes.btn} onClick={handleDummy} disabled={true}> Dummy Option A </Button>
          <Button variant="contained" size="large" color="secondary" className={classes.btn} onClick={handleDummy} disabled={true}> Dummy Option B </Button>
          <Button variant="contained" size="large" color="secondary" className={classes.btn} onClick={handleDummy} disabled={true}> Dummy Option C </Button>
          </ButtonGroup>
        </CardActions>
      </Card>
    </form>
    )
}