import awsconfig from './aws-exports';
import Amplify, { API, graphqlOperation, Storage } from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignOut } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import React, { useEffect, useState } from 'react';
import { listTeasers } from './graphql/queries';
import { updateTeaser } from './graphql/mutations';
import { IconButton, Paper } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ReactPlayer from 'react-player';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import AllPosts from './containers/AllPosts';
import PostsBySpecifiedUser from './containers/PostsBySpecifiedUser';
import { SignUpPage, SignInPage } from './components/Access';
import logo from './logo.svg';
import './App.css';

Amplify.configure(awsconfig);

const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        return <Redirect to="/signup" />;
      }}
    />
  );
};

function App() {
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();
  const [teasers, setTeasers] = useState([]);
  const [teaserPlaying, setTeaserPlaying] = useState('');
  const [videoURL, setVideoURL] = useState('');

  useEffect(() => {
    void fetchTeasers();
  }, []);

  const fetchTeasers = async () => {
    try {
      const teaserData = await API.graphql(graphqlOperation(listTeasers));
      const teaserList = teaserData.data.listTeasers.items;
      console.log('teaser list', teaserList);
      setTeasers(teaserList);
    } catch (error) {
      console.log('error on fetching teasers', error);
    }
  };

  const addLike = async (idx) => {
    try {
      const teaser = teasers[idx];
      teaser.likes = teaser.likes + 1;
      delete teaser.createdAt;
      delete teaser.updatedAt;

      const teaserData = await API.graphql(graphqlOperation(updateTeaser, { input: teaser }));
      const teaserList = [...teasers];
      teaserList[idx] = teaserData.data.updateTeaser;
      setTeasers(teaserList);
    } catch (error) {
      console.log('error on adding Like to teaser', error);
    }
  };

  const toggleTeaser = async (idx) => {
    if (teaserPlaying === idx) {
      setTeaserPlaying('');
      return;
    }

    const teaserFilePath = teasers[idx].filePath;
    try {
      const fileAccessURL = await Storage.get(teaserFilePath, { expires: 60 });
      console.log('access url', fileAccessURL);
      setTeaserPlaying(idx);
      setVideoURL(fileAccessURL);
    } catch (error) {
      console.error('error accessing the file from s3', error);
      setVideoURL('');
      setTeaserPlaying('');
    }
  };

  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/),
  );

  // Assuming you have two redirect URIs, and the first is for localhost and second is for production
  const [localRedirectSignIn, productionRedirectSignIn] = awsconfig.oauth.redirectSignIn.split(',');

  const [localRedirectSignOut, productionRedirectSignOut] = awsconfig.oauth.redirectSignOut.split(',');

  const updatedawsconfig = {
    ...awsconfig,
    oauth: {
      ...awsconfig.oauth,
      redirectSignIn: isLocalhost ? localRedirectSignIn : productionRedirectSignIn,
      redirectSignOut: isLocalhost ? localRedirectSignOut : productionRedirectSignOut,
    },
  };

  Amplify.configure(updatedawsconfig);

  const drawerWidth = 240;

  const theme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#1EA1F2',
        contrastText: '#fff',
      },
      background: {
        default: '#15202B',
        paper: '#15202B',
      },
      divider: '#37444C',
    },
    overrides: {
      MuiButton: {
        color: 'white',
      },
    },
    typography: {
      fontFamily: ['Arial'].join(','),
    },
    status: {
      danger: 'orange',
    },
  });

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      height: '100%',
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    appBar: {
      marginLeft: drawerWidth,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
  }));

  const classes = useStyles();

  return (
    <Router>
      <Switch>
        <Route path="/signin/:type?">
          <SignInPage />
        </Route>
        <Route path="/signup/:type?">
          <SignUpPage />
        </Route>
        <PrivateRoute
          path="/"
          render={() => (
            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <div>Hello, {user.username}</div>
                <p>Welcome to Konfy MVP!</p>
                <AmplifySignOut />
              </header>
              <div className={classes.root}>
                <ThemeProvider theme={theme}>
                  <CssBaseline />
                  <Switch>
                    <Route exact path="/" component={AllPosts} />
                    <Route exact path="/global-timeline" component={AllPosts} />
                    <Route exact path="/:userId" component={PostsBySpecifiedUser} />
                    <Redirect path="*" to="/" />
                  </Switch>
                </ThemeProvider>
              </div>
              <div className="teaserList">
                {teasers.map((teaser, idx) => {
                  return (
                    <Paper variant="outlined" elevation={2} key={`teaser${idx}`}>
                      <div className="teaserCard">
                        <IconButton aria-label="play" onClick={() => toggleTeaser(idx)}>
                          {teaserPlaying === idx ? <PauseIcon /> : <PlayArrowIcon />}
                        </IconButton>
                        <div>
                          <div className="teaserTitle">{teaser.title}</div>
                          <div className="teaserOwner">{teaser.owner}</div>
                        </div>
                        <div>
                          <IconButton aria-label="like" onClick={() => addLike(idx)}>
                            <FavoriteIcon />
                          </IconButton>
                          {teaser.likes}
                        </div>
                        <div className="teaserDescription">{teaser.description}</div>
                      </div>
                      {teaserPlaying === idx ? (
                        <div className="ourVideoPlayer">
                          <ReactPlayer
                            url={videoURL}
                            controls
                            playing
                            height="480px"
                            onPause={() => toggleTeaser(idx)}
                          />
                        </div>
                      ) : null}
                    </Paper>
                  );
                })}
              </div>
            </div>
          )}
        />
      </Switch>
    </Router>
  );
}

export default App;
