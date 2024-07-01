# Code Connect

Code Connect is a tool for connecting your design system components in code with your design system in Figma. When using Code Connect, Figma's Dev Mode will display true-to-production code snippets from your design system instead of autogenerated code examples. In addition to connecting component definitions, Code Connect also supports mapping properties from code to Figma enabling dynamic and correct examples. This can be useful for when you have an existing design system and are looking to drive consistent and correct adoption of that design system across design and engineering.

Code Connect is easy to set up, easy to maintain, type-safe, and extensible. Out of the box Code Connect comes with support for React (and React Native), Storybook, SwiftUI and Jetpack Compose.

![image](https://static.figma.com/uploads/d98e747613e01685d6a0f9dd3e2dcd022ff289c0.png)

> [!NOTE]
> Code Connect is available on Organization and Enterprise plans and requires a full Design or Dev Mode seat to use.

## CLI installation

To install Code Connect locally to a React project, you can follow the instructions in the [React README](cli/README.md#installation).

For other platforms, you first need to have Node.js v16 or newer installed on your computer. You can check if you already have Node.js installed and which version by running `node -v`. If you need to install Node.js, instructions for all platforms can be found [on the Node.js website](https://nodejs.org/en/download/package-manager).

Once you have Node.js installed, you can install Code Connect globally, so it can be run from anywhere on your machine, by running:

`npm install --global @figma/code-connect`

We hope to provide a way to install Code Connect without requiring Node.js soon.

## Setup

To learn how to implement Code Connect for your platform, please navigate to the platform-specific API usage and documentation.

- [React (or React Native)](cli/README.md)
- [SwiftUI](swiftui/README.md)
- [Jetpack Compose](compose/README.md)

## General configuration

Code Connect can be configured with a `figma.config.json` file, which must be located in your project root (e.g. alongside the `package.json` or `.xcodeproj` file).

Every platform supports some common configuration options, in addition to any platform-specific options.

### `include` and `exclude`

`include` and `exclude` are lists of globs for where to parse Code Connect files, and for where to search for your component code when using the [interactive setup](cli/README.md#interactive-setup). `include` and `exclude` paths must be relative to the location of the config file.

```jsonp
{
  "codeConnect": {
    "include": [],
    "exclude": ["test/**", "docs/**", "build/**"]
  }
}
```

### `parser`

Code Connect will attempt to determine your project type by looking the first ancestor of the working directory which matches one of the following:

- If a `package.json` containing `react` is found, your project is detected as React
- If a file matching `Package.swift` or `*.xcodeproj` is found, your project is detected as Swift
- If a file matching `build.gradle.kts` is found, your project is detected as Jetpack Compose

In case this does not correctly work for your project, you can override the project type by using the `parser` configuration key. Valid values are `react`, `swift` and `compose`.

```jsonp
{
  "codeConnect": {
    "parser": "react"
  }
}
```

### `documentUrlSubstitutions`

`documentUrlSubstitutions` allows you to specify a set of substitutions which will be run on the `figmaNode` URLs when parsing or publishing documents.

This allows you to use different config files to switch publishing Code Connect between different files, without having to modify every Code Connect file (e.g. if you have a test version of your document you want to publish to). The substitutions are specified as an object, where the key is the string to be replaced, and the value is the string to replace that with.

For example, the config:

```
{
  "codeConnect": {
    "documentUrlSubstitutions": {
      "https://figma.com/design/1234abcd/File-1": "https://figma.com/design/5678dcba/File-2"
    }
  }
}
```

would change Figma node URLs like `https://figma.com/design/1234abcd/File-1/?node-id=12:345` to `https://figma.com/design/5678dbca/File-2/?node-id=12:345`.

## Common issues

### Connectivity issues due to proxies or network security software

Some proxies or network security software can prevent Code Connect from communicating with Figma's servers. If you encounter issues, you may need to explicitly allow connections to `https://api.figma.com/`. Please reach out to [Figma support](https://help.figma.com/hc/en-us/requests/new) if you are still unable to use Code Connect.
