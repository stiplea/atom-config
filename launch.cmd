#!/bin/zsh
cd $1 && ./$2
read "?Press Enter to exit."
echo "Exiting..."
osascript -e 'tell application "iTerm2" to close first window'
exit
