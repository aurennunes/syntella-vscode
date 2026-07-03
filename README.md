# Syntella for VS Code

Language support for [Syntella](https://syntella.dev), a small, explicit
programming language that runs exactly as it reads.

## Features

- **Syntax highlighting** for `.syt` files (keywords, sum types and `match`,
  strings, numbers, types, functions, operators).
- **Language server** integration via `syt lsp`, providing:
  - diagnostics as you type (lex, name resolution, type checking),
  - hover,
  - go to definition,
  - document symbols (outline / breadcrumbs),
  - completion (triggered on `.`),
  - document formatting (`syt fmt`).
- **Snippets** for the common shapes (`func`, `type`, `sumtype`, `match`,
  `contract`, `impl`, `flow`, ...).
- Editor configuration: comment toggling, bracket matching, auto-closing.

## Requirements

The language server ships inside the `syt` binary, so you need Syntella
installed and on your `PATH`:

```sh
curl -fsSL dl.syntella.dev/install.sh | bash
```

If `syt` is not on your `PATH`, set the full path in settings:

```jsonc
{
  "syntella.server.path": "/absolute/path/to/syt"
}
```

## Settings

| Setting | Default | Description |
| --- | --- | --- |
| `syntella.server.path` | `syt` | Path to the `syt` binary (runs `syt lsp`). |
| `syntella.server.enabled` | `true` | Enable the language server. |
| `syntella.trace.server` | `off` | Trace client/server messages. |

## Commands

- **Syntella: Restart Language Server** rebuilds the connection to `syt lsp`.

## Building from source

```sh
npm install
npm run build      # bundles src/extension.ts -> dist/extension.js
```

Press `F5` in VS Code to launch an Extension Development Host, or run
`npm run package` (with `@vscode/vsce` installed) to produce a `.vsix`.

## License

MIT. Part of the [Syntella](https://github.com/aurennunes/syntella) project.
