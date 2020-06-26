import firebase from 'firebase/app';
import 'firebase/auth';
import utils from '../../helpers/utils';
import './boards.scss';

const signMeOut = (e) => {
  e.preventDefault();
  firebase.auth().signOut();
};

const navbarSignOut = () => {
  const domString = `
    <nav id="boards" class="row">
      <i class="fab fa-pinterest col"></i>
      <h1 class="col">Boards</h1>
      <div class="col d-flex justify-content-end mr-5">
        <div class="btn-group btn-group-toggle" data-toggle="buttons">
          <label id="logout-button" class="btn btn-secondary">
            <p>Logout </p>
          </label>
          <label id="log-out-icon" class="btn btn-secondary">
            <i class="fas fa-sign-out-alt"></i>
          </label>
        </div>
      </div>
    </nav>
  `;
  utils.printToDom('#boards-nav', domString);
  $('body').on('click', '#logout-button', signMeOut);
};

export default { navbarSignOut };
