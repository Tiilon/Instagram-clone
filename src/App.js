import React, { useEffect, useState } from 'react';
import './App.css';
import Post from './Post';
import {db,auth} from './firebase'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input, Modal } from '@material-ui/core';
import ImageUpload from './ImageUpload';
import InstagramEmbed from 'react-instagram-embed'

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const [posts,setPosts] = useState([])
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [username,setUsername] = useState('')
  const [user,setUser] = useState('')
  const [open, setOpen] = React.useState(false);
  const [openSignIn, setOpenSignIn] = React.useState(false);
  const [modalStyle] = useState(getModalStyle);
  const classes = useStyles()

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSignInOpen = () => {
    setOpenSignIn(true);
  };

  const handleSignInClose = () => {
    setOpenSignIn(false);
  };

  const signUp = (e) => {
    e.preventDefault();
    auth
    .createUserWithEmailAndPassword(email,password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName:username
      })
    })
    .catch((error) => alert(error.message));
    setOpen(false)
  }

  const signIn = (e) => {
    e.preventDefault();
    auth
    .signInWithEmailAndPassword(email,password)
    .catch((error) => alert(error.message));
    setOpenSignIn(false)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {

      if (authUser) {
        console.log(authUser);
        setUser(authUser);
      }else {
        setUser(null);
      }
    })
      return () => {
        unsubscribe()
      }
  }, [user,username]);

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc=>({
        id:doc.id,
        post:doc.data()
      })))
    })
  }, []);
  return ( 
    <div className="app">
      
      <div className="app__header">
        <img 
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="" 
          className="app__headerImage" 
          />
          {user ?
          <Button onClick={()=> auth.signOut()}>Logout</Button>
          :
          <div className="app__loginContainer">
            <Button onClick={handleOpen}>Sign Up</Button>
            <Button onClick={handleSignInOpen}>Login</Button>
          </div>
        }
      </div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
      <div style={modalStyle} className={classes.paper}>
        <form className="app__signup">
          <center>
            <img 
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="" 
                className="app__headerImage" 
              />
          </center>
          <Input
            placeholder="username"
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
          />
          <Input
            placeholder="email"
            type="text"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <Button onClick={signUp}>Sign Up</Button>
        </form>
      </div>
      </Modal>
      <Modal
        open={openSignIn}
        onClose={handleSignInClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
      <div style={modalStyle} className={classes.paper}>
        <form className="app__signup">
          <center>
            <img 
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="" 
                className="app__headerImage" 
              />
          </center>
          <Input
            placeholder="email"
            type="text"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <Button onClick={signIn}>Sign Up</Button>
        </form>
      </div>
      </Modal>
      <div className="app__posts">
        {posts.map(({id,post}) => (
        <Post 
        username={post.username}
        caption={post.caption}
        imageUrl={post.imageUrl}
        />)
        )}
      </div>
      <InstagramEmbed
        url='https://instagr.am/p/Zw9o4/'
        maxWidth={320}
        hideCaption={false}
        containerTagName='div'
        protocol=''
        injectScript
        onLoading={() => {}}
        onSuccess={() => {}}
        onAfterRender={() => {}}
        onFailure={() => {}}
      />
      
      <ImageUpload />
    </div>
  );
}

export default App;
