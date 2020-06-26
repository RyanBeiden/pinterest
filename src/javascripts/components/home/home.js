import firebase from 'firebase/app';
import 'firebase/auth';
import utils from '../../helpers/utils';
import './home.scss';

const signMeIn = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(googleProvider);
};

const navbarSignIn = () => {
  const domString = `
    <nav id="home" class="row">
      <i class="fab fa-pinterest col"></i>
      <h1 class="col">Pinterest</h1>
      <div class="col d-flex justify-content-end mr-5">
        <div class="btn-group btn-group-toggle" data-toggle="buttons">
          <label class="btn btn-secondary google-icon">
            <i class="fab fa-google"></i>
          </label>
          <label id="login-button" class="btn btn-secondary">
            <p> Login</p>
          </label>
        </div>
      </div>
    </nav>
  `;
  utils.printToDom('#home-nav', domString);
  $('body').on('click', '#login-button', signMeIn);
};

export default { navbarSignIn };
