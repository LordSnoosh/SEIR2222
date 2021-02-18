<img src="https://i.imgur.com/YmNE2R2.png">

#  Command Line Practice

[Here's a Cheat Sheet](https://learntocodewith.me/command-line/unix-command-cheat-sheet/) if you get stuck.

## Episode X: A New Terminal

A long time ago in a Unix environment far, far away, young Jedi Padawans who knew only of desktop software were seduced by the dark side of the Force to enter: The Terminal...

## Setup

* Open the **Terminal app**

* In today's folder in the class repo, create a directory called called `star_wars`. 

#### Complete all work inside the `star_wars` folder.

## Part I: Set the Scene

1. Create a directory called `death_star`, and make the following files inside of it: `darth_vader.txt`, `princess_leia.txt`, `storm_trooper.txt`

2. In `galaxy_far_far_away`, make a directory named `tatooine` and create the following files in it: `luke.txt`, `ben_kenobi.txt`.

3. Inside of `tatooine` make a directory called `millenium_falcon`, and in it create: `han_solo.txt`, `chewbaca.txt`

<br>

## Part II: `mv` - rename

* You can rename a file using the `mv` command. 

1. Rename `ben_kenobi.txt` to `obi_wan.txt`.

<br>

## Part II: `cp` - copy

* You can copy a file from one location to another using the `cp` command. (`man cp` for more info)

1. Copy `storm_trooper.txt` from `death_star` to `tatooine`.

<br>

## Part IV: `mv` - move

* You can use the `mv` command to move files from one location to another. `mv` can be used for renaming, moving, or both.  Run `man mv` to see the options—remember hit the `Q` key to get out of the manual page viewer.

1. Move `luke.txt` and `obi_wan.txt` to the `millenium_falcon`.

2. Move `millenium_falcon` out of `tatooine` and into `galaxy_far_far_away`.

3. Move `millenium_falcon` into `death_star`.

4. Move `princess_leia.txt` into the `millenium_falcon`.

<br>


## Part V: `rm` - remove

**BE CAREFUL WITH `rm`!!! THERE IS NO "TRASH" IN THE UNIX CLI. WHEN YOU DELETE SOMETHING IT IS GONE FOREVER!!!**

You can use `rm` to delete a file.


1. Delete `obi_wan.txt`.

<br>

## Part VI: all together

1. In `galaxy_far_far_away`, make a directory called `yavin_4`.

2. Move the `millenium_falcon` out of the `death_star` and into `yavin_4`.

3. Make a directory in `yavin_4` called `x_wing`.

4. Move `princess_leia.txt` to `yavin_4` and `luke.txt` to `x_wing`.

5. Move the `millenium_falcon` and `x_wing` out of `yavin_4` and into `galaxy_far_far_away`.

6. In `death_star`, create directories for `tie_fighter_1`, `tie_fighter_2` and `tie_fighter_3`.

7. Move `darth_vader.txt` into `tie_fighter_1`.

8. Make a copy of `storm_trooper.txt` in both `tie_fighter_2` and `tie_fighter_3`.

9. Move all of the `tie_fighters` out of the `death_star` and into `galaxy_far_far_away`.

<br>

## Part VII: `rm -r`: remove directories and everything they contain

**BE CAREFUL WITH `rm`!!! THERE IS NO TRASH CAN IN THE UNIX CLI. WHEN YOU DELETE SOMETHING IT IS GONE FOREVER**

Before you hit enter, make sure are deleting the right thing, or you could accidentally delete the contents of your computer (it has happened).

This command will not typically ask you if you "really want to delete." It will just delete.

1. Remove `tie_fighter_2` and `tie_fighter_3`.

## Part VIII:

1. Touch a file in `x_wing` called `the_force.txt`.

2. Destroy the `death_star` and anyone inside of it.

3. Return `x_wing` and the `millenium_falcon` to `yavin_4`.



