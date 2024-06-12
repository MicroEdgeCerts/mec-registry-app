#!/bin/bash

if [[ $# -ne 1 ]]; then
  echo "Usage: $0 [env_file]"
  exit 1
fi

if [[ ! -f $1 ]]; then
  echo "File not found: $1"
  exit 1
fi

while IFS= read -r line || [[ -n "$line" ]]; do
  if [[ ! -z "$line" && "${line:0:1}" != "#" ]]; then
    export "$line"
    echo "Exported: $line"
  fi
done < "$1"
