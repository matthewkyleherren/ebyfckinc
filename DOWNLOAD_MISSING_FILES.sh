#!/bin/bash
#
# Download Missing Image Files for WE+AR TRBL Website
# Run this script from the project root directory
#
# Usage: bash DOWNLOAD_MISSING_FILES.sh
#

cd "$(dirname "$0")"

echo "╔══════════════════════════════════════════════════════════════════╗"
echo "║     Downloading Missing Files for WE+AR TRBL Website            ║"
echo "╚══════════════════════════════════════════════════════════════════╝"
echo ""
echo "📥 Downloading 21 missing image files..."
echo ""

# Create necessary directories
mkdir -p assets/favicons

# Download missing files
echo "1/21 - Downloading favicons..."
wget -x -nH https://wear-trbl.snpdev.ru/assets/favicons/apple-touch-icon.png
wget -x -nH https://wear-trbl.snpdev.ru/assets/favicons/mstile-150x150.png
wget -x -nH https://wear-trbl.snpdev.ru/assets/favicons/safari-pinned-tab.svg

echo ""
echo "2/21 - Downloading IKI product images (men's)..."
wget -x -nH https://wear-trbl.snpdev.ru/assets/iki_mns-cart-desktop.905a8bc9.jpg
wget -x -nH https://wear-trbl.snpdev.ru/assets/iki_mns-main-desktop.905a8bc9.jpg
wget -x -nH https://wear-trbl.snpdev.ru/assets/iki_mns-preview-desktop.905a8bc9.jpg

echo ""
echo "3/21 - Downloading IKI product images (women's)..."
wget -x -nH https://wear-trbl.snpdev.ru/assets/iki_wmns-cart-desktop.905a8bc9.jpg
wget -x -nH https://wear-trbl.snpdev.ru/assets/iki_wmns-main-desktop.905a8bc9.jpg
wget -x -nH https://wear-trbl.snpdev.ru/assets/iki_wmns-preview-desktop.905a8bc9.jpg

echo ""
echo "4/21 - Downloading TEE product images (men's desktop)..."
wget -x -nH https://wear-trbl.snpdev.ru/assets/iki-tee-1_mns-main-desktop.09c39f78.jpg
wget -x -nH https://wear-trbl.snpdev.ru/assets/iki-tee-2_mns-main-desktop.6a87ec7c.jpg
wget -x -nH https://wear-trbl.snpdev.ru/assets/iki-tee-3_mns-main-desktop.b98910fd.jpg
wget -x -nH https://wear-trbl.snpdev.ru/assets/iki-tee-4_mns-main-desktop.ba9ced01.jpg

echo ""
echo "5/21 - Downloading TEE product images (women's desktop)..."
wget -x -nH https://wear-trbl.snpdev.ru/assets/iki-tee-1_wmns-main-desktop.44c78255.jpg
wget -x -nH https://wear-trbl.snpdev.ru/assets/iki-tee-2_wmns-main-desktop.75f1450d.jpg
wget -x -nH https://wear-trbl.snpdev.ru/assets/iki-tee-3_wmns-main-desktop.f9baca1c.jpg
wget -x -nH https://wear-trbl.snpdev.ru/assets/iki-tee-4_wmns-main-desktop.bc8f7b9d.jpg

echo ""
echo "6/21 - Downloading cart images..."
wget -x -nH https://wear-trbl.snpdev.ru/assets/tee-alone-1_mns-cart-desktop.58085263.jpg
wget -x -nH https://wear-trbl.snpdev.ru/assets/tee-alone-1_mns-cart-desktop.5e267408.jpg
wget -x -nH https://wear-trbl.snpdev.ru/assets/tee-alone-1_wmns-cart-desktop.85425812.jpg
wget -x -nH https://wear-trbl.snpdev.ru/assets/tee-alone-1_wmns-cart-desktop.c3d5c73e.jpg

echo ""
echo "✅ Download complete!"
echo ""
echo "📊 Verifying files..."
echo ""

# Count downloaded files
DOWNLOADED=$(find assets -type f \( -name "*.jpg" -o -name "*.png" -o -name "*.svg" \) | wc -l | xargs)
echo "Total image files now: $DOWNLOADED"
echo ""
echo "Run the verification script to confirm all files are present."