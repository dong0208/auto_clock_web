# git add . && git commit -a -m "daily" && git push 

branch=`echo gray`
br=`git symbolic-ref HEAD 2>/dev/null | cut -d"/" -f 3`
echo "start publish from $br ..."
git add . && git commit -a -m "code publish update" && git push 
echo "update code from $br ..."
echo "switch to $branch and merge from $br ..."
git checkout $branch && git merge $br
echo "build $branch..."
cnpm run build-$branch 
echo "update $branch code..."
git push && git pull && git push && git add . && git commit -a -m "$branch" && git push 
echo "hk-p cdn build..."
hk-p cdn build
echo "hk-p page publish..."
hk-p page build/index.html
echo "finish update and switch back..."
git checkout $br