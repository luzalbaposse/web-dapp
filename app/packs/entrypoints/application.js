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

// New Layout components - @TODO: we need to check which of the above components we'll still be using or not

import Wrapper from "src/components/lazy-wrapper";
import "stylesheets/application.scss";

const Discovery = Wrapper("Discovery");
const Chat = Wrapper("Chat");
const FirstQuestPopup = Wrapper("FirstQuestPopup");
const FlashMessages = Wrapper("FlashMessages");
const Login = Wrapper("Login");
const ResetPassword = Wrapper("ResetPassword");
const ChangePassword = Wrapper("ChangePassword");
const TopBar = Wrapper("TopBar");
const UserSettings = Wrapper("UserSettings");
const NewPortfolio = Wrapper("NewPortfolio");
const DiscoveryShow = Wrapper("DiscoveryShow");
const TalentPage = Wrapper("TalentPage");
const LoggedOutTopBar = Wrapper("LoggedOutTopBar");
const Rewards = Wrapper("Rewards");
const Support = Wrapper("Support");
const UserSupportPage = Wrapper("UserSupportPage");
const QuestShow = Wrapper("QuestsShow");
const Footer = Wrapper("Footer");
const SubdomainFooter = Wrapper("SubdomainFooter");
const ProfileShow = Wrapper("ProfileShow");
const SignInPage = Wrapper("SignInPage");
const SignUpPage = Wrapper("SignUpPage");
const OnboardingPage = Wrapper("OnboardingPage");
const HomepagePage = Wrapper("HomepagePage");
const ForgotPasswordPage = Wrapper("ForgotPasswordPage");
const SetPasswordPage = Wrapper("SetPasswordPage");
const TalentModelsProfilePage = Wrapper("TalentModelsProfilePage");
const NetworkPage = Wrapper("NetworkPage");
const ProductAnnouncementModal = Wrapper("ProductAnnouncementModal");
const MessageUserList = Wrapper("MessageUserList");
const TalentKeywordSearch = Wrapper("TalentKeywordSearch");
const Web3ModalConnect = Wrapper("Web3ModalConnect");
const UpcomingTalents = Wrapper("UpcomingTalents");
const Notifications = Wrapper("Notifications");

// eslint-disable-next-line no-undef
require.context("../images", true);

ReactOnRails.register({
  ChangePassword,
  Chat,
  Discovery,
  DiscoveryShow,
  UserSettings,
  FirstQuestPopup,
  FlashMessages,
  Footer,
  SubdomainFooter,
  LoggedOutTopBar,
  Login,
  MessageUserList,
  NewPortfolio,
  Notifications,
  ProfileShow,
  QuestShow,
  ResetPassword,
  Rewards,
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
  TalentModelsProfilePage,
  HomepagePage,
  NetworkPage,
  OnboardingPage,
  ProductAnnouncementModal
});

Rails.start();

// TO ENABLE ACTIVE STORAGE LATER
// import * as ActiveStorage from "@rails/activestorage"
// ActiveStorage.start()
