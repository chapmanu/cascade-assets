# /bin/bash

# This script will download the ad landing sample page running on dev server and
# do some minimal post-processiing.
SAMPLE_PAGE_URL=http://localhost:5000/ad_landing_page/sample
TARGET_DIR=`pwd`
ASSETS_DIR=$TARGET_DIR/_assets

echo "Will save $SAMPLE_PAGE_URL $TARGET_DIR"

wget -v -nH -e robots=off \
     --content-disposition --page-requisites --convert-links --convert-file-only \
     $SAMPLE_PAGE_URL

for i in `find $ASSETS_DIR -type f`
do
    mv $i `echo $i | cut -d? -f1`
done
