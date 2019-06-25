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
- Displays the indentation for the active editor in the _Status Bar_ button
- Easily switch to a different indentation with a _Select List_ by:  
Clicking the _Status Bar_ button, or selecting __Packages > Detect Indentation > Show Selector__ on the _Menu Bar_, or running the `Detect Indentation: Show Selector` command in the _Command Palette_
- Detect indentation again after the active editor is modified, by selecting `Auto Detect` from the _Select List_. This would be useful for example, after converting Tabs to Spaces with the default [Whitespace](https://atom.io/packages/whitespace) package
