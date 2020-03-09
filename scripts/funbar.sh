#!/usr/bin/env bash

HOSTNAME=$(hostname -s)
TIME=$(date +"%a %-d %b %H:%M")
WIFI_SSID=$(networksetup -getairportnetwork en0 | cut -c 24-)

BATTERY_PERCENTAGE=$(pmset -g batt | egrep '([0-9]+\%).*' -o --colour=auto | cut -f1 -d'%')
BATTERY_STATUS=$(pmset -g batt | grep "'.*'" | sed "s/'//g" | cut -c 18-19)
BATTERY_REMAINING=$(pmset -g batt | egrep -o '([0-9]+%).*' | cut -d\  -f3)

BATTERY_CHARGING=""
if [ "$BATTERY_STATUS" == "Ba" ]; then
  BATTERY_CHARGING="false"
elif [ "$BATTERY_STATUS" == "AC" ]; then
  BATTERY_CHARGING="true"
fi

SPOTIFY_ARTIST=$(/usr/local/bin/spotify status artist)
SPOTIFY_ALBUM=$(/usr/local/bin/spotify status album)
SPOTIFY_TRACK=$(/usr/local/bin/spotify status track)

echo $(cat <<-DATA
{
  "hostname": "$HOSTNAME",
  "time": "$TIME",
  "ssid": "$WIFI_SSID",
  "battery": {
    "percentage": $BATTERY_PERCENTAGE,
    "charging": $BATTERY_CHARGING,
    "remaining": "$BATTERY_REMAINING"
  },
  "spotify": {
    "album": "$SPOTIFY_ALBUM",
    "artist": "$SPOTIFY_ARTIST",
    "track": "$SPOTIFY_TRACK"
  }
}
DATA)
