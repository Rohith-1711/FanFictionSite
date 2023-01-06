import * as React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import {reactLocalStorage} from 'reactjs-localstorage';
import  {useState, useEffect, useRef} from 'react';
import Link from '@material-ui/core/Link';
import SearchBar from "material-ui-search-bar";
import Menu from '@material-ui/core/Menu';
import PersonIcon from '@material-ui/icons/Person';
import PostAddIcon from '@material-ui/icons/PostAdd';
import HelpIcon from '@material-ui/icons/Help';
import ChatIcon from '@material-ui/icons/Chat';
import MenuItem from '@material-ui/core/MenuItem';
import EditIcon from '@material-ui/icons/Edit';
import { NavLink ,Router,Redirect } from 'react-router-dom';
import { Form,FormControl,Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
//import Routes from '../../../Routes/Routes';
import Avatar from '@material-ui/core/Avatar';
import { firestore } from 'firebase';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));


function Header(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();
  const { sections, title } = props;
  const [profileDetails, setprofileDetails] = useState(null);
 
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect (() =>{
    const id = reactLocalStorage.getObject('id');
    console.log("mounted");
    console.log(id)
    
    firestore().collection('userss').where('id','==',id)
    .get()
    .then(snapshot =>{
        const users=[]
        snapshot.forEach(snapshot=>{
          
            setprofileDetails(snapshot.data())
        })
        
        console.log(snapshot)
    })
    .catch(error=>console.log(error))
    
     /* firestore().collection('userss').where('id','==',id)
      .get()
      .then(snapshot =>{
          const det=[]
          snapshot.forEach(doc=>{
              const data=doc.data()
              det.push(data)
          })
          this.setState({det:det})
          this.state.det.map(userr =>{
               console.log(userr.username)
               this.setState({
              // username: this.state.username=userr.username,
               //bio: this.state.bio=userr.bio,
               //date: this.state.date=userr.dob,
               =userr.url
              });
              
          });
         
          console.log(snapshot)
      })
      .catch(error=>console.log(error))*/
  },[])
 

  return (
    
    <React.Fragment>


      <Toolbar className={classes.toolbar}>
        <Button size="small">Subscrbe</Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
        </Typography>
        <SearchBar
  
  />
  &nbsp;  &nbsp;
  <div className="pull-left">
                           <Avatar id="simple-menu" onClick={handleClick} alt="Remy Sharp" src={profileDetails?.url} />
  </div>

  <Menu
  id="simple-menu"
  anchorEl={anchorEl}
  keepMounted
  open={Boolean(anchorEl)}
  onClose={handleClose}
>
<MenuItem onClick={handleClose}><NavLink class="NavLink" to="/Profile"> <PersonIcon/> &nbsp; My Profile  </NavLink></MenuItem>     
<MenuItem onClick={handleClose}><NavLink class="NavLink" to="/AddBlog"> <PostAddIcon/> &nbsp;New Article  </NavLink></MenuItem>       
<MenuItem onClick={handleClose}><NavLink class="NavLink" to="/Manage"><EditIcon/> &nbsp;Manage Articles</NavLink></MenuItem>       
<MenuItem onClick={handleClose}><NavLink class="NavLink" to="/Video"><ChatIcon/> &nbsp;Share a Story </NavLink></MenuItem>    
<MenuItem onClick={handleClose}><NavLink class="NavLink" to="/Chat"><ChatIcon/> &nbsp;Discussion Forum </NavLink></MenuItem>    
<MenuItem  onClick={handleClose}> <NavLink  class="NavLink" to="#"> <HelpIcon/> &nbsp; Support </NavLink> </MenuItem>
<MenuItem onClick={handleClose}><NavLink  class="NavLink" to="/"><ExitToAppIcon/> &nbsp; Logout </NavLink></MenuItem>
</Menu>

      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            className={classes.toolbarLink}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>

    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;