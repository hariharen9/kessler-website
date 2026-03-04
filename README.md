# Kessler 🛰️

**Kessler Syndrome (noun)** — A scenario where the density of objects in low Earth orbit causes collisions that cascade into debris, rendering space unusable.

Kessler is a high-performance, intelligent "cosmic cleanup" CLI tool designed to reclaim your hard drive from development debris. Written in Go, it safely finds and sweeps away `node_modules`, build caches, and runtime artifacts from over 10 ecosystems.

## ✨ Features

- **Blazingly Fast:** Concurrent scanning engine that processes massive directory trees in milliseconds.
- **Git-Aware Safety:** Automatically skips any directory tracked by Git, ensuring your source code remains untouched.
- **OS Trash Integration:** Moves debris to your native Trash instead of permanent deletion, making mistakes easy to undo.
- **Context-Aware:** Identifies ecosystems (Node.js, Rust, Python, Go, etc.) by looking for trigger files like `package.json` or `Cargo.toml`.
- **Beautiful TUI:** Interactive terminal interface with live telemetry and orbital stats.
- **CI/CD Ready:** Support for non-interactive modes and JSON output for automation.

## 🚀 Installation

### Using NPM
```bash
npm install -g @hariharen/kessler
```

### Using Go
```bash
go install github.com/hariharen/kessler@latest
```

### Binary Download
Download the latest binary for your OS from the [Releases](https://github.com/hariharen9/kessler/releases) page.

## 🛠️ Usage

Simply run `kessler` in your terminal to start an interactive cleanup of your current directory:

```bash
kessler
```

To clean a specific path:
```bash
kessler ./path/to/projects
```

For more options, run:
```bash
kessler --help
```

## 📜 License

MIT License. See [LICENSE](LICENSE) for details.
