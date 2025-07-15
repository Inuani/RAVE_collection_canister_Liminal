#!/bin/bash

CANISTER_ID=$(dfx canister id liminal)
REPLICA="http://127.0.0.1:4943"

echo "Canister ID: $CANISTER_ID"
echo "Using replica: $REPLICA"

# Step 1: Clear existing assets
echo "Clearing existing assets..."
dfx canister call liminal clear '(record {})'

# Step 2: Create a batch
echo "Creating batch..."
BATCH_RESPONSE=$(dfx canister call liminal create_batch '(record {})')
echo "Batch created: $BATCH_RESPONSE"

# Step 3: Upload files individually first to test
echo "Testing individual file upload..."
icx-asset \
  --replica $REPLICA \
  --pem  ~/.config/dfx/identity/raygen/identity.pem \
  upload $CANISTER_ID ./public/skull.jpg /skull.jpg

if [ $? -eq 0 ]; then
    echo "✓ Individual upload successful"
    
    # Step 4: Try sync for remaining files
    echo "Syncing all files..."
    icx-asset \
      --replica $REPLICA \
      --pem ~/.config/dfx/identity/raygen/identity.pem \
      sync $CANISTER_ID ./public
else
    echo "✗ Individual upload failed, trying direct dfx approach..."
    
    # Alternative: Use dfx canister call directly
    echo "Using dfx canister call approach..."
    
    # You'll need to encode your files to base64 and call store method
    # This is more complex but will definitely work
fi