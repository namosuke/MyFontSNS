import React from 'react';
import { Link } from 'react-router-dom';

import
{
  makeStyles,
  createMuiTheme,
  ThemeProvider,
}
  from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { teal } from '@material-ui/core/colors';
import { useCurrentUser, usePosts } from '../util/fetch';
import Loading from '../components/Loading';

interface TabPanelProps {
  children: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'rgba(0,0,0,0)',
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: teal[500],
    },
    secondary: {
      main: '#FDFDEA',
    },
    background: {
      paper: 'rgba(0,0,0,0)',
    },
  },
});

const Profile = () => {
  const currentUser = useCurrentUser();
  const posts = usePosts();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  if (!currentUser || !posts) return <Loading className="load-icon" />;

  return (
    <>
      <div className="profile-container">

        <div className="profile-main-container grid">
          <div className="left-container">
            <Loading className="profile-icon" />
            <h2>{currentUser.name}</h2>
            <h3>{`@${currentUser.screen_id}`}</h3>
            <div className="follow-container">
              <p>{`フォロー${currentUser.follow.length}`}</p>
              <p>{`フォロワー${currentUser.follower.length}`}</p>
            </div>
          </div>

          <div className="right-container">
            {
              currentUser.tags.map((tag) => (
                <p
                  key={tag}
                  className={[
                    'flex', 'items-center', 'justify-center',
                    'px-1', 'py-1',
                    'border', 'border-transparent',
                    'text-base', 'font-medium', 'text-white',
                    'rounded-md',
                    'bg-indigo-600', 'hover:bg-indigo-700',
                    'md:py-4', 'md:text-lg', 'md:px-10',
                    'tags',
                  ].join(' ')}
                >
                  {tag}
                </p>
              ))
            }
          </div>
        </div>

        <div>
          <Link to="/font/set">
            <p className={[
              'w-full',
              'flex', 'items-center', 'justify-center',
              'px-8', 'py-3',
              'border', 'border-transparent',
              'text-base', 'font-medium', 'text-white',
              'rounded-md',
              'bg-indigo-600', 'hover:bg-indigo-700',
              'md:py-4', 'md:text-lg', 'md:px-10',
            ].join(' ')}
            >
              フォントを見る
            </p>
          </Link>
        </div>
        <ThemeProvider theme={theme}>
          <div className={classes.root}>

            <AppBar position="static" color="secondary">
              <Tabs
                value={value}
                TabIndicatorProps={{
                  style: {
                    backgroundColor: '#D98032',
                  },
                }}
                onChange={handleChange}
                aria-label="simple tabs example"
              >
                <Tab label="ポスト" {...a11yProps(0)} />
                <Tab label="返信" {...a11yProps(1)} />
                <Tab label="メディア" {...a11yProps(2)} />
                <Tab label="いいね" {...a11yProps(3)} />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              <div className="posts-container">
                {
                  posts.filter((post) => post.user.id === currentUser.id)
                    .map((post) => (
                      <div
                        key={post.id}
                        className="ml-3 inline-flex rounded-md box-container"
                      >
                        <div className={[
                          'items-center', 'justify-center',
                          'px-5', 'py-3',
                          'border', 'border-transparent',
                          'text-base', 'font-medium',
                          'rounded-md',
                          'text-indigo-600', 'hover:bg-indigo-50i',
                          'post-card',
                        ].join(' ')}
                        >
                          <p className="text-lg name-tag">{post.user.name}</p>
                          <p className="px-5 py-3">{post.text}</p>
                        </div>
                      </div>
                    ))
                }
              </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
              返信
            </TabPanel>
            <TabPanel value={value} index={2}>
              写真
            </TabPanel>
            <TabPanel value={value} index={3}>
              いいね
            </TabPanel>
          </div>
        </ThemeProvider>

      </div>
    </>
  );
};
export default Profile;
