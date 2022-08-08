echo "Starting..."
git fetch
git pull

echo "Installing dependencies..."
npm i
echo "Installing dependencies... Done"

echo "Running scripts..."
tsc src/main.ts
node src/main.js
echo "Running scripts... Done"

echo "Unzipping..."
cd data
while read -r line; do (unzip -o -d "$(basename "$line" .zip)" "$line"); done < <(find . | grep '.zip')

echo "Removing temporary Zip files..."
rm *.zip

cd ..
echo "Done!"

echo "Updating repo..."

git add -A && git commit -m "Updated files"
git push
echo "Updating repo... Done"

echo "Press any key to exit..."