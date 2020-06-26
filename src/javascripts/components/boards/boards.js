import './boards.scss';
import utils from '../../helpers/utils';

const signMeOut = () => {
  console.warn('hey, sign me out is working!');
};

const navbarSignOut = () => {
  const domString = `
    <nav class="row">
      <i class="fab fa-pinterest col"></i>
      <h1 class="col hide">Boards</h1>
      <div class="col d-flex justify-content-end mr-5 hide">
        <div class="btn-group btn-group-toggle" data-toggle="buttons">
          <label class="btn btn-secondary">
            <p id="logout-button">Logout </p>
          </label>
          <label class="btn btn-secondary log-out-icon">
            <i class="fas fa-sign-out-alt"></i>
          </label>
        </div>
      </div>
    </nav>
  `;
  utils.printToDom('#navbar', domString);
  $('body').on('click', '#logout-button', signMeOut);
};

export default { navbarSignOut };
