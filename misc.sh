# git init
git checkout -b $1
git remote add misc git@github.com:acou12/misc.git
git push -u misc $1
echo "- [$2](https://github.com/acou12/misc/tree/$1) - $3" >> ~/misc/misc-master/README.md
