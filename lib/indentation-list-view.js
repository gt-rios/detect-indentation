'use babel';

import { Emitter } from 'atom';
import SelectListView from 'atom-select-list';

export default {

  emitter: null,
  selectListView: null,
  items: [
    { name: 'Auto Detect' },
    { name: 'Spaces (2)', softTabs: true, tabLength: 2 },
    { name: 'Spaces (3)', softTabs: true, tabLength: 3 },
    { name: 'Spaces (4)', softTabs: true, tabLength: 4 },
    { name: 'Spaces (8)', softTabs: true, tabLength: 8 },
    { name: 'Tabs', softTabs: false, tabLength: null }
  ],

  currentSoftTabs: null,
  currentTabLength: null,
  panel: null,
  previouslyFocusedElement: null,
  editor: null,

  init() {
    this.emitter = new Emitter();
    this.selectListView = new SelectListView({
      itemsClassList: ['mark-active'],
      items: this.items,
      filterKeyForItem: indentation => indentation.name,
      elementForItem: indentation => {
        const element = document.createElement('li');
        if (this.currentSoftTabs === indentation.softTabs
          && (indentation.softTabs === false
            || this.currentTabLength === indentation.tabLength)) {
          element.classList.add('active');
        }

        element.textContent = indentation.name;
        return element;
      },

      didConfirmSelection: indentation => {
        this.cancel();
        this.emitter.emit('did-change-indentation', {
          editor: this.editor,
          softTabs: indentation.softTabs,
          tabLength: indentation.tabLength
        });
      },

      didCancelSelection: () => this.cancel()
    });

    this.selectListView.element.classList.add('indentation-selector');
    return this;
  },

  destroy() {
    this.cancel();
    this.selectListView.dispose();
  },

  cancel() {
    if (this.panel !== null) {
      this.panel.destroy();
      this.panel = null;
    }

    this.currentSoftTabs = null;
    this.currentTabLength = null;
    if (this.previouslyFocusedElement !== null) {
      this.previouslyFocusedElement.focus();
      this.previouslyFocusedElement = null;
    }
  },

  attach() {
    this.previouslyFocusedElement = document.activeElement;
    if (this.panel === null) {
      this.panel = atom.workspace.addModalPanel({ item: this.selectListView });
    }

    this.selectListView.focus();
    this.selectListView.reset();
  },

  async toggle(editor) {
    if (this.panel !== null) {
      this.cancel();
      return;
    }

    if (typeof editor !== 'undefined') {
      this.editor = editor;
      this.currentSoftTabs = this.editor.getSoftTabs();
      this.currentTabLength = this.editor.getTabLength();
      await this.selectListView.update();
      this.attach();
    }
  }

};
