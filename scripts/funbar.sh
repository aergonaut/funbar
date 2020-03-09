#!/usr/bin/env bash

HOSTNAME=$(hostname -s)
TIME=$(date +"%a %-d %b %H:%M")

echo $(cat <<-DATA
{
  "hostname": "$HOSTNAME",
  "time": "$TIME"
}
DATA)
