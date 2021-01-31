#!/bin/sh
set -euo pipefail

# printenv

envFolder="/usr/share/nginx/html/environment"

indexHtml="/usr/share/nginx/html/index.html"
defaultConfFile="/etc/nginx/conf.d/default.conf"
cspFrameSrcValues=${CSP_FRAME_SRC_VALUES:-"*"}
# The unsupported browser list is a regex. Therefore, add new user agents with |
unsupportedBrowserUserAgents=${UNSUPPORTED_BROWSER_USER_AGENTS:-"MSIE 7.0|MSIE 6.0"}

echo "Inject env variables into nginx default.conf"
echo "=================================="
sed -i "s?CSP_FRAME_SRC_VALUES?${cspFrameSrcValues}?" $defaultConfFile
sed -i "s?UNSUPPORTED_BROWSER_USER_AGENTS?${unsupportedBrowserUserAgents}?" $defaultConfFile
echo "Done!"
echo ""

echo "Running nginx"
# deamon off: https://stackoverflow.com/questions/25970711/what-is-the-difference-between-nginx-daemon-on-off-option?lq=1
nginx -g 'daemon off;'
