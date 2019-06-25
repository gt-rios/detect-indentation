# Detect Indentation

A fast and minimal detect indentation package for [Atom](https://atom.io). The detection algorithm comes from the popular [auto-detect-indentation](https://atom.io/packages/auto-detect-indentation) package, which is no longer maintained.

![](https://user-images.githubusercontent.com/17343833/60067815-a58dc480-96fb-11e9-85f6-c4125e94b8ea.jpg)

## Install

Run the following command:

```bash
apm install detect-indentation
```

## Features

- Fast and minimal by design. This package only attempts to detect indentation when an editor is opened
- Displays the indentation for the active editor in the Status Bar
- Easily change the indentation for the active editor with the _indentation selector_ by:  
clicking the indentation in the Status Bar, __or__ selecting __Packages > Detect Indentation > Show Selector__ on the Menu Bar, __or__ running the `Detect Indentation: Show Selector` command in the Command Palette
- Detect indentation again after the active editor is modified, by selecting `Auto Detect` from the indentation selector. This would be useful for example, after converting Tabs to Spaces with the default [whitespace](https://atom.io/packages/whitespace) package

## Keymap

To add a keyboard shortcut to show the indentation selector, add the `detect-indentation:show-selector` command to your `keymap.cson` file. For example:

```cson
'atom-text-editor':
  'ctrl-i': 'detect-indentation:show-selector'
```
