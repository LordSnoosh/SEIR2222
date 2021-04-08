# Git and Team Workflow Cheatsheet

## Team Workflow

To help illustrate collaborating on a project using Git/GitHub, consider the following two roles you can fulfill: **programmer** and **manager**.

**Programmers** will contribute code and issue pull requests, while **managers** integrate the code by merging the pull requests into the repo.

## Creating the Repo (One-time Setup)

**Manager**:

1. Create a repo (using the name of the project) on GitHub (personal account).
2. Copy the repo's URL shown in the **Quick setup** section.
3. `cd ~/code` then clone the repo `git clone <paste the URL>`.
4. `cd` into the newly created project folder and run `git remote -v` to verify that you have a remote named `origin`.
5. So that the repo is no longer "empty", let's create the README:  `touch README.md`
6. Make a commit:  `git add -A && git commit -m "Add README"`
7. If the default branch is `master`, let's rename it to `main`: `git branch -m main`
8. Push to the remote for the first time:  `git push -u origin main`
9. Now let's get the rest of the team (the Programmers) set up.

**Programmer**:

1. Browse to the manager's GH repo using the link they provide.
2. Click the `[Fork]` button near the top-right to fork the repo to your own account (it will replace the Manager's repo in the same browser tab).
3. Click the repo's green `[Code]` button and copy the https URL.
4. `cd ~/code` then clone the repo `git clone <paste the URL>`.
5. `cd` into the newly created project folder.
6. Now add a link to the manager's repo as well using the URL provided by the manager: `git remote add upstream <paste the URL>`. You can also go back to the manager's repo, click the green `[Code]` button and copy the https URL.
    > Note: The URL provided by the manager should be look something like `https://github.com/MANAGER_USERNAME/THE_REPOSITORY.git`.  
7. Ensure that you have two remotes named `origin` & `upstream`: `git remote -v`.
    > Note: The manager will only have an `origin` remote.
8. To be notified of when the manager has updated the `main` branch by merging pull requests, browse to the **manager's repo**, click the **Watch** button near the top right of the page and choose **All Activity**. 
9. Go back to your fork and make sure your GitHub account's notification settings are adjusted to notify you via email, etc. Your notification settings can be accessed by clicking your avatar, clicking **Settings**, and selecting **Notifications** in the sidebar.

Congrats, the project's repos are ready to rock!

## Create "Feature" Branches

When working in a team, it's rarely acceptable to make commits on the `main`/`master` branch because they are typically considered to be the production/deployed branch.

Instead, team members (manager and programmers) work on a separate "feature" branch.  A feature branch _can_ be created for each new feature, however, to simplify your workflow, we ask that each team member create and develop on a single feature branch created using their name.

Please create and checkout (switch to) your feature branch - no spaces are allowed in the name of the branch:

```
git checkout -b <yourname>
```

The above command equivalent to the following two commands:

```
git branch <yourname>
git checkout <yourname>
```

When we create a new branch, that branch will contain the exact same commits as the current branch you are in.  You can verify this by typing `git log` and verify that the current commit is pointed to by both your feature branch and the `main` branch (as well as the remote's ref):

```
commit bf0e90b563cb9448b0624d14376ffd7829b11454 (HEAD -> <yourname>, origin/main, main)
```

Now that all team members have their feature branches created, you are ready to start coding!

## Working on Feature Branches

IMPORTANT:  All team members make commits on their feature branch - so be sure that your feature branch is checked-out prior to running the `git commit...` command.

### Example Manager Contribution Workflow

1. Let's say the manager adds a new file to the project:

    ```
    touch file1.txt
    ```

2. The "work" is done and it's time to get this amazing new file to the other team members. **Again, before making a commit, verify that you are on your feature branch prior to making a commit**:

    ```
    git add -A
    git commit -m "Add file1.txt"
    ```

3. Time to push the feature branch to the remote (`origin` is the only remote the manager will have):

    ```
    git push origin <yourname>
    ```

4. When a feature branch is pushed to the manager's repo, a **[Compare & pull request]** button will appear.  A **pull request** is the mechanism used to merge code from a feature branch into the main branch.  Click the button, verify the branches look correct, type a comment, and click the **[Create pull request]** button:

    <img src="https://i.imgur.com/mNOhro5.png">

5. The manager will now see a **[Merge pull request]** button - click it and confirm to merge the new commit(s) in the feature branch into the `main` branch.

6. All team members should be developing with the latest codebase/commits! Therefore the manager should inform (don't rely on the programmers getting notified by GH) that new commit(s) have been added to the `main` branch and that they need to be pulled into their local projects...

7. All team members will checkout the `main` branch and pull the updates:

    ```
    git checkout main
    ```
    > Note:  You may see a message that "Your branch is up to date with 'origin/main' - this is a lie.
    ```
    git pull origin main
    ```
    > IMPORTANT:  Programmers will use `upstream` in place of `origin`

8. All team members need to merge the new commits now in `main` into their feature branches:

    ```
    git checkout <yourname>
    git merge main
    ```
    Now you're set to continue development!
    > Note:  It's really fun to see the project/files in VS Code respond to the changes in the codebase!

Congrats, you've completed the team workflow for when the manager has made a contribution.  When programmers make a contribution, the process is very similar...

### Example Programmer Contribution Workflow

1. Let's say a programmer adds a new file to the project:

    ```
    touch file2.txt
    ```
    and adds some text, e.g., "Line 1", to the first file, `file1.txt`.

2. The "work" is done and it's time to get this sweet like bear meat code to the other team members. **Again, before making a commit, verify that you are on your feature branch prior to making a commit**:

    ```
    git add -A
    git commit -m "Add text to file1.txt and add file2.txt"
    ```

3. Time to push the feature branch to the **programmer's remote repo** (it's not possible to push to repos for which they have not been added as contributors):

    ```
    git push origin <yourname>
    ```

4. The programmer will then browse to their repo (fork) and click the **[Compare & pull request]** button.  The next steps to issue a pull request are the same as in the manager's Step 4. After the **[Create pull request]** button is clicked, please let the manager know that you've issued a pull request.

5. The **manager** will now see that a pull request exists and will click the **Pull requests** menu:

    <img src="https://i.imgur.com/PIl4Z8q.png">

6. On the next screen that the **manager** sees, they will select the pending pull request that they wish to merge:

    <img src="https://i.imgur.com/V3MB6YY.png">

7. The manager can now see a **[Merge pull request]** button - click it and confirm to merge the new commit(s) in the feature branch into the `main` branch.

**Now follow the Manager Example's Steps 6 through 8 again to ensure that all team members are developing with the latest and greatest code.**

## Workflow Summary

The following diagram summarizes the above workflow:

<img src="https://i.imgur.com/B5CZSuT.png">

## Minimizing Merge Conflicts

1. Try to divide up work so that programmers don't make changes to the same file between merges. 
2. When notified that branches have been merged into `main` by the manager, **immediately** bring your local repo up to date so that you are working with the latest and greatest:
	- We're going to need to checkout the `main` branch to update it, however, _sometimes_ Git will not allow us checkout a different branch if there are uncommitted changes in the current branch.  The solution is to either `stash` or `commit` the changes first. Please read [this StackOverflow](https://stackoverflow.com/questions/22053757/checkout-another-branch-when-there-are-uncommitted-changes-on-the-current-branch) for how to resolve this scenario if Git does not allow the next step (`git checkout main`).
	- `git checkout main`
	- `git pull upstream main` **Manager** uses `origin` instead of `upstream`
	- `git checkout <feature_branch_name>`
	- `git merge main` This brings the latest code into your feature branch so that you are always developing with the latest and greatest.
3. Making frequent and small commits and pull requests will help minimize merge conflicts.

### Fixing Merge Conflicts Locally (especially for programmers)

>Note: When merging the latest and greatest into your feature branch, it's possible to create merge conflicts too. So managers aren't the only ones who get to enjoy fixing merge conflicts!

1. You will/should be in your feature branch when the conflicts occurred.
2. Typing `git status` will show you which file(s) have conflicts.
3. You will need to edit those files to remove the markers and fix up the code to what it "should" be - if in doubt what, consult your manager or other teammates.
4. After fixing the commits:
	- `git add -A`
	- `git commit -m "Fix merge conflicts"`
5. Continue developing as usual.

### Checking the Logs

To visualize the history of commits made to the repo we use the `git log` command. There are several options, but this format works well:

`git log --decorate --graph --oneline`

---

## Git Command Reference

#### Creating Repos

- **`git init`** Initializes a new local repository and begins version
  tracking. Creates a hidden directory that tracks info about the repository,
  including remote repositories.
- **`git clone <ssh_or_http_url>`** Clones a remote repository as a new local
  repository with the given connection format (SSH or HTTPS).
- **`git remote add <remote_name> <ssh_or_http_url>`** Connects your repo to
  a new remote at the given URL, via the given connection format
  (SSH or HTTPS), and names it with the given name.

#### Working on Repos

##### Branching and Merging

- **`git branch <branch_name>`** Creates a new branch with the given name.
- **`git checkout <branch_name>`** Moves you to the branch (or commit in
  history) with the given name.
- **`git checkout -b <branch_name>`** Creates a new branch and checks it
  out, all in one!
- **`git merge <branch_name>`** Merges the branch cwith the given name into
  the current branch.

##### Staging Changes

- **`git add <file_name>`** Adds changes made to the given file to 
  the staging area.
- **`git add .`** Adds all changes (creating, updating and removing files),
  to files in this directory and sub-directories, to the staging area.
- **`git add -A`** Adds all changes (creating, updating and removing files),
  in all files, to the staging area.
- **`git add -p`** Adds updates in all staged files to the staging area,
  but runs you through all the changes step by step.

##### Committing Snapshots

- **`git commit -m "awesome commit message"`** Saves a snapshot of the
  filesystem including any changes that have been added/staged as a commit.
  It saves the commit with a simple description, or *message*, given after
  `-m`.
- **`git commit`** Commits as above, but takes you to a text editor (`nano`)
  to edit the commit's *message*.

##### Exploring Repos

- **`git status`** Prints out the current "tracking state" of the repo. The
  state includes information about changes, additions and deletions of
  files, whether or not these changes have been added/stages, and sometimes
  even any merge conflicts.
- **`git log`** Prints out the commit history of the current branch of the
  current repo.
- **`git branch` & `git branch -v`** Prints out a list of all available
  branches in the repo.
- **`git remote` & `git remote -v`** Prints out a list of all available
  bremotes connected to the repo.
- **`git diff <branch_or_commit_name>`** Prints out information about
  *differences*, as insertions (in green) and deletions (in red), between
  the current commit and the given commit (or the most current commit in the
  given branch).

#### Collaborating with Other Repos (Remotes)

- **`git push (-u) (<remote_name> <branch_name>)`** Push, or send, commits to
  remote at the given branch. `-u` saves the remote and branch names as
  default for future use.
- **`git fetch <remote_name> <branch_name>`** Fetch, or receive, commits from
  a given remote at the given branch. Stores these commits in either the
  named commit, or in a special, new branch.
- **`git pull <remote_name> <branch_name>`** Performs a `git fetch` into a new
  branch, then merges it into the current branch and removes the fetched
  branch.

## Resources

- [Slides for the lesson on branching][branching-deck]

Articles and tutorials on branching and workflows in Git:

- [Git Branching][atlassian-branches]
- [Common Git Workflows][atlassian-workflows]
- [In-depth Discussion of a Workflow][in-depth-workflow]
- ['Reset Demystified'][git-scm-blog-reset] (helps to understand the structures of Git)
- **[A Git Branching visualization game!][git-viz-game]**

<!-- Links -->

[repo-image]: assets/git-workflow-1.png

[branching-deck]:         https://docs.google.com/presentation/d/1tE0D8F-TNNG36tjCN-H1hzhjAb2rWknGcohEESaPW08/edit#slide=id.p
[atlassian-branches]:     https://www.atlassian.com/git/tutorials/using-branches
[atlassian-workflows]:    https://www.atlassian.com/git/tutorials/comparing-workflows
[in-depth-workflow]:      http://nvie.com/posts/a-successful-git-branching-model
[git-scm-blog-reset]:     https://git-scm.com/blog/2011/07/11/reset.html
[git-viz-game]:           http://pcottle.github.io/learnGitBranching

[local-merge]: https://help.github.com/articles/checking-out-pull-requests-locally/#modifying-an-inactive-pull-request-locally
[pr]:          https://help.github.com/articles/creating-a-pull-request


