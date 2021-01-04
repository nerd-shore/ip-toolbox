#!/bin/bash

############################################
#
# Keep off, or at least be gentle!
# For local development only.
# Andreas' private parts from here on.
#
##########################################

RED='\033[0;31m'
LIGHT_RED='\033[1;31m'
CYAN='\033[0;36m'
LIGHT_CYAN='\033[1;36m'
NC='\033[0m'

set -eu

function ensure_yarn {
  if [ ! -d node_modules ]; then
    yarn install --no-progress
  fi

  if [ yarn.lock -nt node_modules ]; then
    yarn install
    touch node_modules
  fi
}

function task_build_version {
  yarn buildversion
}

function task_init {
  ensure_yarn
  npm install --global lerna
  yarn bootstrap
}

#########################
## BUILD
########################
function task_build {
  CMD=${1:-}
  shift || true
  case ${CMD} in
    gsp) task_run_build_gsp ;;
    cc) task_run_build_cc ;;
    ctms) task_run_build_ctms ;;
    *) task_run_build ;;
  esac
}

function task_run_build_gsp {
  yarn build:gsp
}

function task_run_build_cc {
  yarn build:cc
}

function task_run_build_ctms {
  yarn build:ctms
}

function task_run_build {
  yarn build
}

#########################
## PRE-E2E
########################
function task_pre_e2e {
  CMD=${1:-}
  shift || true
  case ${CMD} in
    gsp) task_run_pre_e2e_gsp ;;
    cc) task_run_pre_e2e_cc ;;
    ctms) task_run_pre_e2e_ctms ;;
    *) task_run_pre_e2e ;;
  esac
}

function task_run_pre_e2e_gsp {
  yarn pree2e:gsp
}

function task_run_pre_e2e_cc {
  yarn pree2e:cc
}

function task_run_pre_e2e_ctms {
  yarn pree2e:ctms
}

function task_run_pre_e2e {
  yarn pree2e
}

#########################
## START
########################
function task_start {
  CMD=${1:-}
  shift || true
  case ${CMD} in
    gsp) task_run_start_gsp ;;
    cc) task_run_start_cc ;;
    ctms) task_run_start_ctms ;;
    *) task_run_start_usage ;;
  esac
}

function task_run_start_gsp {
  yarn start:gso
}

function task_run_start_cc {
  yarn start:cc
}


function task_run_start_ctms {
  yarn start:ctms
}

function task_run_start_usage {
  echo "Usage: $0 gsp | cc | ctms"
  exit 1
}

#########################
## E2E
########################
function task_e2e {
  CMD=${1:-}
  shift || true
  case ${CMD} in
    gsp) task_run_e2e_gsp ;;
    cc) task_run_e2e_cc ;;
    ctms) task_run_e2e_ctms ;;
    *) task_run_e2e_usage ;;
  esac
}

function task_run_e2e_gsp {
  yarn e2e:gsp
}

function task_run_e2e_cc {
  yarn e2e:cc
}

function task_run_e2e_ctms {
  yarn e2e:ctms
}

function task_run_e2e_usage {
  echo "Usage: $0 gsp | cc | ctms"
  exit 1
}

#########################
## MISC
########################
function task_lint {
  yarn lint
}

function task_clean_build {
  yarn clean:dist
}

#########################
## DOCKER DO ALL
########################
function task_docker_do_all {
  CMD=${1:-}
  shift || true
  case ${CMD} in
    gsp) task_docker_do_all_gsp ;;
    cc) task_docker_do_all_cc ;;
    ctms) task_docker_do_all_ctms ;;
    *) task_docker_do_all_usage ;;
  esac
}

function task_docker_do_all_gsp {
  cd packages/ias-gsp-frontend &&
  ./go docker do_all && cd ../..
}

function task_docker_do_all_cc {
  cd packages/ias-carrier-cockpit &&
  ./go docker do_all && cd ../..
}

function task_docker_do_all_ctms {
  cd packages/ias-ctms &&
  ./go docker do_all && cd ../..
}

function task_docker_do_all_usage {
  echo "Usage: $0 gsp | cc | ctms"
  exit 1
}

#########################
## DOCKER PUSH
########################
function task_docker_push {
  CMD=${1:-}
  shift || true
  case ${CMD} in
    gsp) task_docker_push_gsp ;;
    cc) task_docker_push_cc ;;
    ctms) task_docker_push_ctms ;;
    *) task_docker_push_usage ;;
  esac
}

function task_docker_push_gsp {
  cd packages/ias-gsp-frontend &&
  ./go docker push && cd ../..
}

function task_docker_push_cc {
  cd packages/ias-carrier-cockpit &&
  ./go docker push && cd ../..
}
function task_docker_push_ctms {
  cd packages/ias-ctms &&
  ./go docker push && cd ../..
}

function task_docker_push_usage {
  echo "Usage: $0 gsp | cc | ctms"
  exit 1
}

#########################
## TAGGING
########################
function task_tag {
  CMD=${1:-}
  shift || true
  case ${CMD} in
    add) task_add_tag ;;
    remove) task_remove_tag ;;
    *) task_tag_usage ;;
  esac
}

function task_run_e2e_on_request {
  echo -e "Initially run ${CYAN}e2e${NC} tests"
  read -r -p "Are you sure you want to continue? [y/N] " response
  case "$response" in
    [yY][eE][sS]|[yY])
      read -p 'Package name: ' packagevar
      echo -e "Running ${CYAN}e2e${NC} for ${LIGHT_CYAN}$packagevar${NC}"
      yarn e2e:$packagevar &&
      task_run_e2e_on_request
      ;;
    *)
      echo -e "${LIGHT_RED}No e2e tests will be performed${NC}"
      true
      ;;
  esac
}

function task_add_tag {
  task_run_e2e_on_request
  echo -e "Start ${CYAN}tagging${NC} process"
  read -r -p "Are you sure you want to continue? [y/N] " response
  case "$response" in
    [yY][eE][sS]|[yY])
      read -p 'Name the tag: ' tagvar
      echo -e "Tagging current version with ${LIGHT_CYAN}v$tagvar${NC}"
      git tag -fa v$tagvar -m "Add tag v$tagvar"
      git push --tag

      exit 1
      ;;
    *)
      echo -e "${RED}Process aborted${NC}"
      exit 1
      ;;
  esac
}

function task_remove_tag {
  echo "Starting ${CYAN}tag removal${NC}"
  read -r -p "Are you sure you want to continue? [y/N] " response
  case "$response" in
    [yY][eE][sS]|[yY])
      read -p 'Name the tag to be removed: ' tagvar
      git push origin :refs/tags/v$tagvar

      exit 1
      ;;
    *)
      echo -e "${RED}Process aborted${NC}"
      exit 1
      ;;
  esac
}

function task_tag_usage {
  echo "Usage: $0 add | remove"
  exit 1
}

function task_usage {
  echo "Usage: $0 build | init | start | e2e | lint | build_version | protractor | pree2e | tag"
  echo "All tasks (except for lint and build_version) can be scoped by adding: gsp | cc | ctms"
  exit 1
}

CMD=${1:-}
shift || true
case ${CMD} in
  docker_do_all) task_docker_do_all ${@:1} ;;
  docker_push) task_docker_push ${@:1} ;;
  build) task_build ${@:1} ;;
  init) task_init ;;
  start) task_start ${@:1} ;;
#  run) task_run ${@:1} ;;
#  test) task_test ${@:1} ;;
  pree2e) task_pre_e2e ${@:1} ;;
  e2e) task_e2e ${@:1} ;;
  protractor) task_protractor ${@:1} ;;
  lint) task_lint ;;
  build_version) task_build_version ;;
  tag) task_tag ${@:1} ;;
  *) task_usage ;;
esac
