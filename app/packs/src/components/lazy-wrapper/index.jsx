import React, { lazy, Suspense } from "react";

const Discovery = lazy(() => import("src/components/discovery"));
const Chat = lazy(() => import("src/components/chat/Chat"));
const FirstQuestPopup = lazy(() => import("src/components/one_time_popups/FirstQuestPopup"));
const FlashMessages = lazy(() => import("src/components/FlashMessages"));
const Login = lazy(() => import("src/components/login/Login"));
const ResetPassword = lazy(() => import("src/components/login/ResetPassword"));
const ChangePassword = lazy(() => import("src/components/login/ChangePassword"));
const TopBar = lazy(() => import("src/components/top_bar"));
const UserSettings = lazy(() => import("src/components/talent/Edit/Settings"));
const NewPortfolio = lazy(() => import("src/components/portfolio/NewPortfolio"));
const DiscoveryShow = lazy(() => import("src/components/discovery/show"));
const TalentPage = lazy(() => import("src/components/talent/TalentPage"));
const LoggedOutTopBar = lazy(() => import("src/components/top_bar/LoggedOutTopBar"));
const Rewards = lazy(() => import("src/components/rewards"));
const Support = lazy(() => import("src/components-v2/support"));
const UserSupportPage = lazy(() => import("src/components-v2/user-support-page"));
const QuestsShow = lazy(() => import("src/components/rewards/quests/show"));
const Footer = lazy(() => import("src/components/design_system/footer"));
const SubdomainFooter = lazy(() => import("src/components/design_system/subdomain_footer"));
const ProfileShow = lazy(() => import("src/components/profile/show"));
const SignInPage = lazy(() => import("src/components-v2/pages/sign-in"));
const SignUpPage = lazy(() => import("src/components-v2/pages/sign-up"));
const HomepagePage = lazy(() => import("src/components-v2/pages/homepage"));
const OnboardingPage = lazy(() => import("src/components-v2/pages/onboarding"));
const ForgotPasswordPage = lazy(() => import("src/components-v2/pages/forgot-password"));
const SetPasswordPage = lazy(() => import("src/components-v2/pages/set-password"));
const TalentModelsProfilePage = lazy(() => import("src/components-v2/pages/talent-models-profile"));
const NetworkPage = lazy(() => import("src/components-v2/pages/network"));
const ProductAnnouncementModal = lazy(() => import("src/components-v2/product-announcement-modal"));
const MessageUserList = lazy(() => import("src/components/chat/MessageUserList"));
const TalentKeywordSearch = lazy(() => import("src/components/talent/TalentKeywordSearch"));
const Web3ModalConnect = lazy(() => import("src/components/login/Web3ModalConnect"));
const UpcomingTalents = lazy(() => import("src/components/talent/UpcomingTalents"));
const Notifications = lazy(() => import("src/components/notifications"));

const COMPONENT_MAP = {
  Discovery,
  Chat,
  FirstQuestPopup,
  FlashMessages,
  ChangePassword,
  TopBar,
  UserSettings,
  NewPortfolio,
  DiscoveryShow,
  TalentPage,
  LoggedOutTopBar,
  Rewards,
  Support,
  UserSupportPage,
  QuestsShow,
  Footer,
  SubdomainFooter,
  ProfileShow,
  SignInPage,
  SignUpPage,
  OnboardingPage,
  ForgotPasswordPage,
  SetPasswordPage,
  TalentModelsProfilePage,
  NetworkPage,
  ProductAnnouncementModal,
  Login,
  ResetPassword,
  MessageUserList,
  TalentKeywordSearch,
  Web3ModalConnect,
  UpcomingTalents,
  Notifications,
  HomepagePage
};

const Wrapper = componentName => {
  const Component = COMPONENT_MAP[componentName];
  return (props, railsContext) => (
    <Suspense fallback={<></>}>
      <Component {...props} railsContext={railsContext} />
    </Suspense>
  );
};

export default Wrapper;
