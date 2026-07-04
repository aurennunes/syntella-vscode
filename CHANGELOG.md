# Changelog

## 0.2.1

- Publishing: create the Open VSX namespace before the first publish so the
  extension ships to Open VSX as well as the VS Code Marketplace. No code
  changes to the extension itself.

## 0.2.0

- Snippets for the desktop GUI (`uiwindow` app skeleton, `uibutton`).
- Completion (via `syt lsp`) now covers the `ui` GUI module and its methods,
  the `net`/`ws`/`crypto`/`jwt`/`pg` modules in `use`, and the `parseInt` /
  `parseFloat` builtins.

## 0.1.0

- Initial release.
- Syntax highlighting for `.syt` (including sum types and `match`).
- Language server integration via `syt lsp`: diagnostics, hover, go to
  definition, document symbols, completion, and formatting.
- Snippets and editor configuration.
