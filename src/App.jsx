import { useCallback, useEffect, useRef, useState } from 'react';
import { useStore } from './store.js';
import { ME } from './data.js';
import { BottomNav, Toast } from './components/Common.jsx';
import Feed from './screens/Feed.jsx';
import PostDetail from './screens/PostDetail.jsx';
import Compose from './screens/Compose.jsx';
import Profile from './screens/Profile.jsx';
import Search from './screens/Search.jsx';
import Notifications from './screens/Notifications.jsx';
import FactCheck from './screens/FactCheck.jsx';

const TABS = ['feed', 'search', 'compose', 'notifications', 'profile'];

export default function App() {
  const [state, dispatch] = useStore();
  const [stack, setStack] = useState([{ name: 'feed' }]);
  const [toastText, setToastText] = useState('');
  const [unread, setUnread] = useState(true);
  const timer = useRef();
  const scroller = useRef();

  const current = stack[stack.length - 1];

  const toast = useCallback((t) => {
    setToastText(t);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToastText(''), 2600);
  }, []);

  const go = (name) => {
    if (name === 'notifications') setUnread(false);
    setStack([{ name, handle: name === 'profile' ? ME : undefined }]);
  };
  const push = (screen) => setStack((s) => [...s, screen]);
  const back = () => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));
  const openPost = (id) => push({ name: 'post', id });
  const openProfile = (handle) => push({ name: 'profile', handle });
  const openChecks = () => push({ name: 'factcheck' });

  useEffect(() => { scroller.current?.scrollTo(0, 0); }, [stack]);

  const tab = TABS.includes(current.name) && stack.length === 1 ? current.name : stack[0].name;
  const common = { state, dispatch, go, openPost, openProfile, openChecks, toast, back };

  let view;
  switch (current.name) {
    case 'post':
      view = <PostDetail {...common} post={state.posts.find((p) => p.id === current.id)} />;
      break;
    case 'compose':
      view = <Compose {...common} />;
      break;
    case 'profile':
      view = <Profile {...common} handle={current.handle || ME} canGoBack={stack.length > 1} />;
      break;
    case 'search':
      view = <Search {...common} />;
      break;
    case 'notifications':
      view = <Notifications {...common} />;
      break;
    case 'factcheck':
      view = <FactCheck {...common} />;
      break;
    default:
      view = <Feed {...common} unread={unread} />;
  }

  const hideNav = current.name === 'compose' || current.name === 'post';

  return (
    <div className="shell">
      <div className="phone">
        <main className={`scroller ${hideNav ? '' : 'has-nav'}`} ref={scroller}>{view}</main>
        {!hideNav && <BottomNav screen={tab} go={go} unread={unread} />}
        <Toast text={toastText} />
      </div>
      <p className="disclaimer">
        Instagrama é uma sátira. Os perfis são inventados; os boatos são reais, já foram desmentidos por agências de checagem e cada um leva à checagem original. Imagens: reprodução das agências.
      </p>
    </div>
  );
}
