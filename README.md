# Detect Indentation

A fast and minimal detect indentation package for [Atom](https://atom.io). The detection algorithm comes from the popular [auto-detect-indentation](https://atom.io/packages/auto-detect-indentation) package, which is no longer maintained.

![](https://user-images.githubusercontent.com/17343833/60067815-a58dc480-96fb-11e9-85f6-c4125e94b8ea.jpg)

## Install

Run the following command:

```bash
apm install detect-indentation
```

## Features

- Fast and minimal by design: this package only attempts to detect the indentation for the active editor once, when it is opened.
- Easily change the indentation for the active editor at any time with the _indentation selector_ by:  
clicking the indentation button in the Status Bar, __or__ selecting __Packages > Detect Indentation > Show Selector__ in the Menu Bar, __or__ running the `Detect Indentation: Show Selector` command in the Command Palette.
- Displays the indentation for the active editor in the Status Bar.

## Keymap

To add a keyboard shortcut to show the indentation selector, add the `detect-indentation:show-selector` command to your `keymap.cson` file. For example:

```cson
'atom-text-editor':
  'ctrl-i': 'detect-indentation:show-selector'
```
