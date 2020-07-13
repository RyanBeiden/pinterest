import utils from '../../helpers/utils';
import './newBoard.scss';

const showBoardForm = () => {
  const domString = `
    <form class="new-board form-inline">
      <div class="form-group">
        <label for="custom-board-name">Add a New Board</label>
        <input type="text" class="form-control" id="custom-board-name" placeholder="Engagement ideas">
      </div>
      <button type="submit" class="btn btn-danger submit-new-board" id="submit-board">Add</button>
    </form>
  `;
  utils.printToDom('#board-form', domString);
};

export default { showBoardForm };
