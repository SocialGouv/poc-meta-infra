#!/bin/bash

kubectl -n meta-infra create configmap ci-namespace-controller --from-file=controller/ci-namespace.controller.js -o yaml --dry-run=client | kubectl apply -f -
kubectl -n meta-infra rollout restart deployment/ci-namespace-controller
