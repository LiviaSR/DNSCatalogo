#!/bin/bash
git fetch
git pull origin main
git add .
git commit -m "added feature"
git push origin main
