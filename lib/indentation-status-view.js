'use babel';

import { Disposable } from 'atom';

export default {

  statusBar: null,
  element: null,
  clickSubscription: null,
  tile: null,
  tooltip: null,

  init(statusBar) {
    this.statusBar = statusBar;
    this.element = document.createElement('a');
    this.element.classList.add('detect-indentation-tile', 'inline-block');
    const clickHandler = event => {
      event.preventDefault();
      atom.commands.dispatch(
        atom.views.getView(atom.workspace.getActiveTextEditor()),
        'detect-indentation:show-selector'
      );
    };

    this.element.addEventListener('click', clickHandler);
    this.clickSubscription = new Disposable(() => {
      this.element.removeEventListener('click', clickHandler);
    });

    return this;
  },

  destroy() {
    this.clickSubscription.dispose();
    this.tile !== null && this.tile.destroy();
    this.tooltip !== null && this.tooltip.dispose();
  },

  attach() {
    this.update(atom.workspace.getActiveTextEditor());
    this.tile = this.statusBar.addRightTile({
      item: this.element,
      priority: 201
    });
  },

  update(editor) {
    atom.views.updateDocument(() => {
      if (typeof editor === 'undefined') {
        this.element.style.display = 'none';
        return;
      }

      let tooltipText;
      if (editor.getSoftTabs() === false) {
        this.element.textContent = 'Tabs';
        tooltipText = this.element.textContent;
      } else {
        const spaces = editor.getTabLength();
        this.element.textContent = `Spaces (${spaces})`
        tooltipText = `${spaces} Spaces`;
      }

      if (this.tooltip !== null) {
        this.tooltip.dispose();
        this.tooltip = null;
      }

      this.element.style.display = '';
      this.tooltip = atom.tooltips.add(this.element, {
        title: `File uses ${tooltipText} for indentation`
      });
    });
  }

};
