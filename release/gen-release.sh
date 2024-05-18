set -exu
HERE=$(dirname $(realpath $BASH_SOURCE))
cd $HERE

# --- config
releaseName=bca-random_1.0.0
# --- end config

workdir=$HERE/workdir
topDir=$HERE/..


# refreshing work dir
rm -rf $workdir
mkdir -p $workdir

# building and copying to workdir
cd $topDir
rm -rf build
pnpm build

cp -r build $workdir
cp manifest.json $workdir
cp doc/release-readme.md $workdir/readme.md

# refreshing target output dir
cd $HERE
mkdir -p output
rm -rf output/$releaseName
mv $workdir output/$releaseName

echo "done"