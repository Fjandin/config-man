workflow "Build, Test & Publish" {
  on = "push"
  resolves = ["Publish"]
}

action "Install" {
  uses = "actions/yarn@master"
  args = "install"
}

action "Typecheck" {
  needs = "Install"
  uses = "actions/yarn@master"
  args = "typecheck"
}

action "Lint" {
  needs = "Install"
  uses = "actions/yarn@master"
  args = "tslint"
}

action "Test" {
  needs = "Install"
  uses = "actions/yarn@master"
  args = "test"
}

action "Master" {
  needs = ["Typecheck", "Lint", "Test"]
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "Publish" {
  needs = "Master"
  uses = "actions/npm@master"
  args = "publish"
  secrets = ["NPM_TOKEN"]
}
