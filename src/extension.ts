import * as vscode from "vscode";
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
} from "vscode-languageclient/node";

let client: LanguageClient | undefined;

export function activate(context: vscode.ExtensionContext): void {
  context.subscriptions.push(
    vscode.commands.registerCommand("syntella.restartServer", async () => {
      await stopClient();
      await startClient(context);
    }),
  );

  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((e) => {
      if (
        e.affectsConfiguration("syntella.server.path") ||
        e.affectsConfiguration("syntella.server.enabled")
      ) {
        void restart(context);
      }
    }),
  );

  void startClient(context);
}

export async function deactivate(): Promise<void> {
  await stopClient();
}

async function restart(context: vscode.ExtensionContext): Promise<void> {
  await stopClient();
  await startClient(context);
}

async function startClient(context: vscode.ExtensionContext): Promise<void> {
  const config = vscode.workspace.getConfiguration("syntella");
  if (!config.get<boolean>("server.enabled", true)) {
    return;
  }

  const command = config.get<string>("server.path", "syt") || "syt";

  // The Syntella language server is `syt lsp`: a JSON-RPC server over stdio,
  // shipped inside the `syt` binary. No separate install needed.
  const serverOptions: ServerOptions = {
    run: { command, args: ["lsp"], transport: TransportKind.stdio },
    debug: { command, args: ["lsp"], transport: TransportKind.stdio },
  };

  const clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: "file", language: "syntella" }],
    synchronize: {
      fileEvents: vscode.workspace.createFileSystemWatcher("**/*.syt"),
    },
    outputChannelName: "Syntella Language Server",
  };

  client = new LanguageClient(
    "syntella",
    "Syntella Language Server",
    serverOptions,
    clientOptions,
  );

  try {
    await client.start();
  } catch (err) {
    client = undefined;
    const msg = err instanceof Error ? err.message : String(err);
    void vscode.window.showErrorMessage(
      `Syntella: could not start the language server ("${command} lsp"). ` +
        `Make sure \`syt\` is on your PATH or set "syntella.server.path". (${msg})`,
    );
  }
}

async function stopClient(): Promise<void> {
  if (client) {
    const c = client;
    client = undefined;
    await c.stop();
  }
}
