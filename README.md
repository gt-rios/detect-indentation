# Detect Indentation

A fast and minimal detect indentation package for [Atom](https://atom.io). The detection algorithm was copied from the popular [auto-detect-indentation](https://atom.io/packages/auto-detect-indentation) package, which is no longer maintained, but the rest of the code and the feature set is different.

## Install

Run the following command:

```bash
apm install detect-indentation
```

## Features

- Fast and minimal by design. This package only attempts to detect indentation when an editor is opened
- Easily switch to a different indentation with a Select List by:
  - Clicking the Status Bar button
  - Selecting __Packages > Detect Indentation > Show Selector__ on the Menu Bar
  - Or running the `Detect Indentation: Show Selector` command in the Command Palette
- Detect indentation again after an open editor has been changed, by selecting `Auto Detect` from the Select List.  
This would be useful for example, after selecting `Convert Tabs to Spaces` from the default [Whitespace](https://atom.io/packages/whitespace) package
