import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
  faCalendarDay
} from '@fortawesome/free-solid-svg-icons';
// import './HeaderAction.scss';
import classNames from 'classnames';

const ICON_NAME = {
  left: faChevronLeft,
  right: faChevronRight,
  today: faCalendarDay
};

export default function HeaderAction({ iconName, callback, title, cssClass }) {
  return (
    <button
      className={classNames('header-action', 'icon-btn', cssClass)}
      title={title}
      onClick={() => callback()}
    >
      <FontAwesomeIcon icon={ICON_NAME[iconName]} />
    </button>
  );
}
