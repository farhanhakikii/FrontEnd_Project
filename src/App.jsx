import React from 'react';
import './App.css';
import { Route, Switch, withRouter } from "react-router-dom";
import Cookie from "universal-cookie";
import { connect } from "react-redux";

import { userKeepLogin, cookieChecker } from "./redux/actions";
import Navbar from './views/components/Navbar';
import "bootstrap/dist/css/bootstrap.css";
import AuthPage from './views/screens/AuthPage';
import Home from './views/screens/Home';
import PageNotFound from './views/screens/PageNotFound';
import NovelPage from './views/screens/NovelPage';
import ListNovel from './views/screens/ListNovel';
import ListReader from './views/screens/ListReader';
import ListWriter from './views/screens/ListWriter';
import EpisodePage from './views/screens/EpisodePage';
import ProfilePage from './views/screens/ProfilePage';
import NewEps from './views/screens/NewEps';
import EditProfile from './views/screens/EditProfile';
import ListCategory from './views/screens/ListCategory';
import ListPayment from './views/screens/ListPayment';
import LupaPassword from './views/screens/LupaPassword';

const cookieObj = new Cookie();

class App extends React.Component{
  componentDidMount() {
    let cookieResult = cookieObj.get("authData", { path: "/" });
    if (cookieResult) {
      this.props.keepLogin(cookieResult);
    } else {
      this.props.cookieChecker();
    }
  }
  render(){
    return (
      <>
        <Navbar/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/novel/:novelId" component={NovelPage}/>
          <Route exact path="/register" component={AuthPage}/>
          <Route exact path="/notfound" component={PageNotFound}/>
          <Route exact path="/listcategory" component={ListCategory}/>
          <Route exact path="/listnovel" component={ListNovel}/>
          <Route exact path="/listreader" component={ListReader}/>
          <Route exact path="/listwriter" component={ListWriter}/>
          <Route exact path="/listpayment" component={ListPayment}/>
          <Route exact path="/novel/:novelId/:episodeId" component={EpisodePage}/>     
          <Route exact path="/newEps/:novelId" component={NewEps}/>     
          <Route exact path="/users/:userId" component={ProfilePage}/>     
          <Route exact path="/users/:userId/lupapass/:token" component={LupaPassword}/>     
          <Route exact path="/editprofile/:userId" component={EditProfile}/>     
        </Switch>
      </>
    );
  }
}
//"/novel/:novelId/:episodeId"

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  keepLogin: userKeepLogin,
  cookieChecker,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));