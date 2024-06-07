#!/bin/bash

# Exit immediately if a command exits with a non-zero status
CONTRACT_NAME="TokenRegistry"
SCRIPT_PATH="script/DeployTokenRegistry.s.sol"
OUTPUT_PATH="out"

ABI_PATH="../src/abis"

set -e

# Source the environment variables from the .env file
if [ -f ".env" ]; then
  source .env
else
  echo ".env file not found!"
  exit 1
fi

# Check if RPC_URL is set
if [ -z "$RPC_URL" ]; then
  echo "RPC_URL is not set in the .env file!"
  exit 1
fi

# Run the Forge deployment script
forge script $SCRIPT_PATH --broadcast --rpc-url $RPC_URL


if [ $? -eq 0 ]; then
  echo "Deployment successful!"

  # Create ABI folder if it doesn't exist
  mkdir -p $ABI_PATH

  # Copy the ABI to the abi folder
  cp $OUTPUT_PATH/$CONTRACT_NAME.sol/$CONTRACT_NAME.json $ABI_PATH/

  echo "ABI copied to $ABI_PATH/"
else
  echo "Deployment failed."
fi
