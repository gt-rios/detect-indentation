'use babel';

import IndentationListView from './indentation-list-view';
import IndentationStatusView from './indentation-status-view';
import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,
  indentationListView: null,
  indentationStatusView: null,
  observedEditors: new WeakSet(),

  activate() {
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add(
      'atom-text-editor',
      'detect-indentation:show-selector',
      () => {
        this.indentationListView === null && this.createIndentationListView();
        this.indentationListView.toggle();
      }
    ));
  },

  deactivate() {
    this.subscriptions.dispose();
    this.indentationListView !== null && this.indentationListView.destroy();
    this.indentationStatusView !== null && this.indentationStatusView.destroy();
    this.observedEditors.clear();
  },

  consumeStatusBar(statusBar) {
    this.indentationStatusView = Object.create(IndentationStatusView);
    this.indentationStatusView.init(statusBar).attach();
    this.observeActiveTextEditor();
  },

  createIndentationListView() {
    this.indentationListView = Object.create(IndentationListView);
    this.subscriptions.add(this.indentationListView.init().emitter.on(
      'did-change-indentation',
      ({ editor, softTabs, tabLength }) => {
        if (typeof softTabs === 'undefined'
          || typeof tabLength === 'undefined') {
          const indentation = this.detectIndentation(editor);
          this.setIndentation(editor, indentation);
        } else {
          this.setIndentation(editor, { softTabs, tabLength });
        }
      }
    ));
  },

  observeActiveTextEditor() {
    this.subscriptions.add(atom.workspace.observeActiveTextEditor((editor) => {
      if (typeof editor !== 'undefined' && !this.observedEditors.has(editor)) {
        const indentation = this.detectIndentation(editor);
        this.setIndentation(editor, indentation);
      } else {
        this.indentationStatusView.update(editor);
      }
    }));
  },

  setIndentation(editor, { softTabs, tabLength }) {
    const scope = editor.getRootScopeDescriptor().scopes;
    if (softTabs === null) {
      softTabs = atom.config.get('editor.softTabs', { scope });
    }

    editor.setSoftTabs(softTabs);
    if (tabLength === null) {
      tabLength = atom.config.get('editor.softTabs', { scope });
    }

    editor.setTabLength(tabLength);
    this.observedEditors.add(editor);
    this.indentationStatusView.update(editor);
  },

  detectIndentation(editor) {
    const lineCount = editor.getLineCount() - 1;
    let shortest = 0;
    let numLinesWithTabs = 0;
    let numLinesWithSpaces = 0;
    let found = false;

    for (let i = 0; i < lineCount; i++) {
      // loop through more than 100 lines only if we haven't found any spaces yet
      if (i > 99 && found) {
        break;
      }

      if (editor.isBufferRowCommented(i)) {
        // Skip comments
        continue;
      }

      const firstSpaces = editor.lineTextForBufferRow(i).match(/^([ \t]+)[^ \t]/m);
      if (firstSpaces !== null) {
        const spaceChars = firstSpaces[1];
        if (spaceChars[0] === '\t') {
          numLinesWithTabs++;
        } else {
          const length = spaceChars.length;
          if (length === 1) {
            // Assume nobody uses single space spacing
            continue;
          }

          numLinesWithSpaces++;
          if (length < shortest || shortest === 0) {
            shortest = length;
          }
        }

        found = true;
      }
    }

    let softTabs = null;
    let tabLength = null;

    if (found) {
      if (numLinesWithTabs > numLinesWithSpaces) {
        softTabs = false;
      } else {
        softTabs = true;
        tabLength = shortest;
      }
    }

    return { softTabs, tabLength };
  }

};
