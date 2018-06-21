#!/bin/bash

ERROR_FLAG=false

find * -name '*.test.js' | grep -v "node_modules"| while read testfile
    do
        cd $(dirname ${testfile})
        echo
        echo ===========
        echo ${testfile}
        jest ${testfile}
        exit_status=$?
        if [[ ${bats_exit_status} -ne 0 ]]; then
            echo true > ${ERROR_FLAG}
        fi
        cd -
    done


if [[ ${ERROR_FLAG} ]]; then
    echo "Failing tests!"
else
    echo "All tests passing!"
fi