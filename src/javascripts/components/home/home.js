import './home.scss';
import utils from '../../helpers/utils';

const buildNavbar = () => {
  const domString = `
    <nav class="row">
      <i class="fab fa-pinterest col"></i>
      <h1 class="col">Pinterest</h1>
      <div class="col d-flex justify-content-end mr-5">
        <div class="btn-group btn-group-toggle" data-toggle="buttons">
          <label class="btn btn-secondary google-icon">
            <i class="fab fa-google"></i>
          </label>
          <label class="btn btn-secondary">
            <p> Login</p>
          </label>
        </div>
      </div>
    </nav>
  `;
  utils.printToDom('#navbar', domString);
};

export default { buildNavbar };
