# UVic Rocketry Ground Station Software (Work-In-Progress)

## OS & Hardware Recommendations:

This project was developed using Ubuntu 16.  Other Linux distros should also work, provided you can get all the dependencies.

You'll also need an SDR stick compatible with rtl-sdr.  We've been using the Realtek RTL2838.

## Installation:

Install dependencies as described in "installation.txt" (or try running that file as a script if you're feeling lucky).

If you're only interested in testing the GUI and not the decoding components, some of the dependencies will not be necessary.  More information can be found in the "installation.txt" file.

## Testing Dependencies:

Test rtl-sdr/rtl_fm by plugging in your SDR stick and running the script `server/decoder/testingtools/hearsdr.sh`.  If you're not in Victoria, pass in the frequency of a local FM radio station (e.g. `./hearsdr.sh 90.5M`).  This script assumes that you have aplay installed.

You can test direwolf by going to the `server/decoder` directory and running `runtest.sh`.

## Running the Webapp:

First start `server/wsserver.py`, and then open `client/index.html` in a web browser.

## Calibration:

There is some timing error inherent in each sdr stick.  You can find this value using the open-source "Kalibrate" tool, and then use it for the "-p" option when running rtl_fm.  If you don't use an accurate "-p" value, you'll still be able to hear regular FM radio stations just fine, but you'll have little-to-no success decoding APRS.

Part of this tutorial describes the callibration process:
http://www.algissalys.com/amateur-radio/raspberry-pi-sdr-dongle-aprs-igate

## Licensing:

The client GUI uses the Flot charting library and the OpenLayers mapping library.  Licenses for those libraries can be found in their respective directories.  Otherwise, all code is copyrighted by its creator(s) unless otherwise specified (at least for the time being).
