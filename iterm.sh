#!/bin/bash
read -r -d '' script <<'EOF'
on run argv
tell application "iTerm2"
    activate
    set newWindow to (create window with default profile)
    tell newWindow
        activate
        set mysess to (current session)
        tell mysess
            repeat with arg in argv
                write text arg
            end repeat
        end tell
    end tell
end tell
end run
EOF
echo "$script" | osascript ``-'' "$@"
