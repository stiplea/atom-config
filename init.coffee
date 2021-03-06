# Your init script
#
# Atom will evaluate this file each time a new window is opened. It is run
# after packages are loaded/activated and after the previous editor state
# has been restored.
#
# An example hack to log to the console when each text editor is saved.
#
# atom.workspace.observeTextEditors (editor) ->
#   editor.onDidSave ->
#     console.log "Saved! #{editor.getPath()}"

atom.commands.add 'atom-workspace', 'dot-atom:demo', ->
  console.log "Hello from dot-atom:demo"

atom.commands.add 'atom-workspace', 'custom:build-and-run', ->
  atom.commands.dispatch(atom.workspace.element, 'atom-shell-commands:build')
  atom.commands.dispatch(atom.workspace.element, 'atom-shell-commands:execute')
