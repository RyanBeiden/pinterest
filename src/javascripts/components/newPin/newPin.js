import utils from '../../helpers/utils';
import './newPin.scss';

function imageInputWatcher() {
  $('#pin-image-label').html(this.files[0].name);
}

const showPinForm = () => {
  const domString = `
    <button class="btn btn-warning back-boards" id="back-to-boards"><i class="fas fa-arrow-left"></i> Back to Boards</button>
    <div class="btn-group dropleft new-pin-position">
      <button type="button" class="btn btn-danger dropdown-toggle new-pin" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-thumbtack"></i> New Pin</button>
      <div class="dropdown-menu">
        <form>
          <div class="form-group">
            <label for="custom-pin-name">Name Your Pin</label>
            <input type="text" class="form-control" id="custom-pin-name" placeholder="Cheapest dinner meal">
          </div>
          <div class="form-group">
            <div class="custom-file dropdown-item">
              <input type="file" class="custom-file-input" id="custom-pin-image">
              <label class="custom-file-label" for="custom-pin-image" id="pin-image-label">Choose Image</label>
            </div>
          </div>
          <button type="submit" class="btn btn-danger submit-new-pin" id="submit-pin">Add</button>
        </form>
      </div>
    </div>
  `;
  utils.printToDom('#pin-form', domString);
  $('body').on('change', '#custom-pin-image', imageInputWatcher);
};

export default { showPinForm };
