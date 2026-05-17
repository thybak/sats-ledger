#!/usr/bin/env bash
set -euo pipefail

# -----------------------------------------------------------------------------
# bootstrap.sh
#
# Bootstraps an Ubuntu-based Distrobox/Toolbox container for developing a
# Tauri + Svelte + TypeScript application.
#
# Responsibilities:
#   1. Install required system packages via apt-get.
#   2. Install mise (tool version manager).
#   3. Install pinned development tools from mise.toml.
#   4. Install JavaScript dependencies with pnpm.
#   5. Install Playwright browsers with system dependencies.
#
# Usage:
#   chmod +x bootstrap.sh
#   ./bootstrap.sh
#
# Assumptions:
#   - Running inside an Ubuntu 24.04 container.
#   - A mise.toml file exists in the project root.
#   - package.json is present.
# -----------------------------------------------------------------------------

echo "==> Updating package metadata..."
sudo apt-get update

echo "==> Installing base development packages..."
sudo apt-get install -y \
  libwebkit2gtk-4.1-dev \
  build-essential \
  curl \
  wget \
  file \
  libxdo-dev \
  libssl-dev \
  libayatana-appindicator3-dev \
  librsvg2-dev \
  patchelf \
  unzip \
  tar \
  just \
  jq

# -----------------------------------------------------------------------------
# Install mise
# -----------------------------------------------------------------------------
if ! command -v mise >/dev/null 2>&1; then
  echo "==> Installing mise..."
  curl https://mise.run | sh

  # Add mise to PATH for current shell
  export PATH="$HOME/.local/bin:$PATH"
else
  echo "==> mise already installed."
fi

# Ensure PATH contains mise in future shells
if ! grep -q 'HOME/.local/bin' "$HOME/.bashrc" 2>/dev/null; then
  echo 'export PATH="$HOME/.local/bin:$PATH"' >> "$HOME/.bashrc"
fi

# -----------------------------------------------------------------------------
# Install development tools from mise.toml
# -----------------------------------------------------------------------------
if [[ -f mise.toml ]]; then
  echo "==> Installing tool versions from mise.toml..."
  mise install
else
  echo "WARNING: mise.toml not found. Skipping tool installation."
fi

# Activate mise shims in this shell
if ! grep -q 'mise activate bash' ~/.bashrc 2>/dev/null; then
  echo 'eval "$(mise activate bash)"' >> ~/.bashrc
  source ~/.bashrc
fi

# -----------------------------------------------------------------------------
# Install project dependencies
# -----------------------------------------------------------------------------
if [[ -f package.json ]]; then
  echo "==> Installing Node dependencies with pnpm..."
  pnpm install --frozen-lockfile
else
  echo "WARNING: package.json not found. Skipping pnpm install."
fi

# -----------------------------------------------------------------------------
# Install Playwright browsers with system dependencies
# -----------------------------------------------------------------------------
echo "==> Installing Playwright browsers and system dependencies..."
pnpm exec playwright install --with-deps

echo
echo "Bootstrap completed successfully."
echo
echo "Next steps:"
echo "  source ~/.bashrc"
echo "  pnpm tauri dev"
