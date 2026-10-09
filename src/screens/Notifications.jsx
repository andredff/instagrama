import { NOTIFICATIONS } from '../data.js';
import { Avatar } from '../components/Common.jsx';

export default function Notifications({ openProfile }) {
  return (
    <div className="screen">
      <header className="subbar"><span className="subbar__title pad-l">Berrantes</span></header>
      <ul className="notif-list">
        {NOTIFICATIONS.map((n, i) => (
          <li key={i}>
            <button className="notif" onClick={() => openProfile(n.user)}>
              <Avatar handle={n.user} size={42} />
              <span className="notif__text"><b>{n.user}</b> {n.text} <span className="muted">{n.time}</span></span>
            </button>
          </li>
        ))}
      </ul>
      <p className="end-note">Nenhuma notificação de checagem. Elas foram silenciadas por você.</p>
    </div>
  );
}
