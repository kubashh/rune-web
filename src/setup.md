# Install an Executable Program (Linux / macOS / Windows)

## Prerequisites

- You have an executable file.

---

## Linux/MacOS (Shell, requires sudo)

```sh
sudo cp ./path_to_exe /usr/local/bin/rune
sudo chmod +x /usr/local/bin/rune
rune --help
```

---

## Windows (Cmd)

```bat
mkdir "%LOCALAPPDATA%\rune"
copy /Y "C:\path\to\rune_exe" "%LOCALAPPDATA%\rune\rune.exe"
```

then add this to User PATH:

    Win+R → sysdm.cpl → Enter
    Environment Variables → under User variables select Path → Edit…
    New → add: %LOCALAPPDATA%\rune
    OK → OK

```bat
rune --help
```

---

## Uninstall

### Linux/macOS (system install to `/usr/local/bin`)

```sh
sudo rm -f /usr/local/bin/myapp
```

### Windows

```bat
del "%LOCALAPPDATA%\rune\rune.exe"
```
