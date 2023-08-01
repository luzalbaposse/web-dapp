// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
import "core-js/stable";
import "regenerator-runtime/runtime";

import Rails from "@rails/ujs";

import "channels";
import "@fontsource/plus-jakarta-sans";

import ReactOnRails from "react-on-rails";
import MessageUserList from "src/components/chat/MessageUserList";
import Chat from "src/components/chat/Chat";
import TalentKeywordSearch from "src/components/talent/TalentKeywordSearch";
import Web3ModalConnect from "src/components/login/Web3ModalConnect";
import UpcomingTalents from "src/components/talent/UpcomingTalents";
import Notifications from "src/components/notifications";

// New Layout components - @TODO: we need to check which of the above components we'll still be using or not

import Login from "src/components/login/Login";
import ResetPassword from "src/components/login/ResetPassword";
import ChangePassword from "src/components/login/ChangePassword";
import TopBar from "src/components-v2/navbar-proxy";
import UserSettings from "src/components/talent/Edit/Settings";
import NewPortfolio from "src/components/portfolio/NewPortfolio";
import Discovery from "src/components/discovery";
import DiscoveryShow from "src/components/discovery/show";
import TalentPage from "src/components/talent/TalentPage";
import LoggedOutTopBar from "src/components/top_bar/LoggedOutTopBar";
import Support from "src/components-v2/support";
import UserSupportPage from "src/components-v2/user-support-page";
import Footer from "src/components/design_system/footer";
import SubdomainFooter from "src/components/design_system/subdomain_footer";
import FlashMessages from "src/components/FlashMessages";
import SignInPage from "src/components-v2/pages/sign-in";
import SignUpPage from "src/components-v2/pages/sign-up";
import OnboardingPage from "src/components-v2/pages/onboarding";
import ForgotPasswordPage from "src/components-v2/pages/forgot-password";
import SetPasswordPage from "src/components-v2/pages/set-password";
import HomepagePage from "src/components-v2/pages/homepage";
import EarnPage from "src/components-v2/pages/earn-page";
import ConnectionsPage from "src/components-v2/pages/connections";
import ProductAnnouncementModal from "src/components-v2/product-announcement-modal";
import ExploreCollectivesPage from "src/components-v2/pages/explore-collectives-page";
import CollectiveShowPage from "src/components-v2/pages/collective-show-page";
import ProfilePage from "../src/components-v2/pages/profile";

import "stylesheets/application.scss";

// eslint-disable-next-line no-undef
require.context("../images", true);

ReactOnRails.register({
  ChangePassword,
  Chat,
  Discovery,
  DiscoveryShow,
  UserSettings,
  FlashMessages,
  Footer,
  SubdomainFooter,
  LoggedOutTopBar,
  Login,
  MessageUserList,
  NewPortfolio,
  Notifications,
  ResetPassword,
  TalentKeywordSearch,
  TalentPage,
  TopBar,
  UpcomingTalents,
  Web3ModalConnect,
  Support,
  UserSupportPage,
  SignInPage,
  SignUpPage,
  ForgotPasswordPage,
  SetPasswordPage,
  HomepagePage,
  ConnectionsPage,
  OnboardingPage,
  ProductAnnouncementModal,
  ExploreCollectivesPage,
  CollectiveShowPage,
  EarnPage,
  ProfilePage
});

Rails.start();

// TO ENABLE ACTIVE STORAGE LATER
// import * as ActiveStorage from "@rails/activestorage"
// ActiveStorage.start()
