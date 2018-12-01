#!/bin/zsh
echo "\n---------------------------------------\n"
cd $1 && ./$2
echo "\n---------------------------------------\n"
read "?Press Enter to exit."
echo "Exiting..."
osascript -e 'tell application "iTerm2" to close first window'
exit
