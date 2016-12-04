# Scratchity git commands reference

## How to update library git projects?

Blockly = a git subtree  
Closure library = a git submodule

Blockly - merge from up-stream to repo:

    git subtree pull --squash --prefix=src/web/blockly https://github.com/jeroenpx/blockly-scratchity.git master

Blockly - merge from repo to up-stream:

    ? to lookup => something with "git subtree push ..."

Closure library - your local copy:

    git submodules init
    git submodules update

Closure library - use newer version:

    ? to look up

## How this repository was made:

Blockly is submitted with the git subtree command. (there is a separate repository for blockly in scratch)

    git subtree add --prefix=src/web/blockly --squash "--message=Adding blockly (with git subtree) into project. See also 'blockly-scratchity' project." https://github.com/jeroenpx/blockly-scratchity.git 6e66d4191267935e142251fe641f0aeef6c1c01a

Than, did a rebase (not sure if needed) by doing an interactive rebase:  
See: http://stackoverflow.com/questions/12858199/how-to-rebase-after-git-subtree-add

Then, a pull with a separate merge commit for all my personal changes to blockly

    git subtree pull --squash --prefix=src/web/blockly https://github.com/jeroenpx/blockly-scratchity.git master

At some point I also did a git subtree pull without the --squash. This caused the complete history of blockly to appear inside the project.
I noticed the history was also submitted after I did a push... (a bit too late)
(Note: you also get merge conflicts if not doing a git subtree pull with the initial commit ref first)
Because I did not want the full history, I did a:

    git reset --soft <the_commit_before_merge>
    git push --force origin master

After that I resubmitted all the lost code.
The mistake however did cause some issues in the github project to be closed (unintentially).

For the closure library a submodule was used:
(see also https://chrisjean.com/git-submodules-adding-using-removing-and-updating/)

    git submodule add https://github.com/google/closure-library src/web/closure-library
