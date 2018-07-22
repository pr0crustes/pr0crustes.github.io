#!/bin/bash

set -e

dpkg-scanpackages -m ./debs > Packages
bzip2 Packages
