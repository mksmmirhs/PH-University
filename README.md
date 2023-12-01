# Edit Hosts File

sudo nano /etc/hosts

# Add the following lines at the end of the file:

# 127.0.0.1 facebook.com

# 127.0.0.1 www.facebook.com

# Save the file (Ctrl + O) and exit (Ctrl + X).

# Apply Changes

sudo service NetworkManager restart

# Focus Mode Script

# Create a simple script to toggle this setting. Open a text editor and paste:

#!/bin/bash

HOSTS_FILE="/etc/hosts"
FOCUS_MODE_FILE="$HOME/.focus_mode"

if [ -e $FOCUS_MODE_FILE ]; then # Focus mode is on, turn it off
sudo sed -i '/facebook.com/d' $HOSTS_FILE
rm $FOCUS_MODE_FILE
echo "Focus mode OFF"
else # Focus mode is off, turn it on
echo "127.0.0.1 facebook.com" | sudo tee -a $HOSTS_FILE
touch $FOCUS_MODE_FILE
echo "Focus mode ON"
fi

# Make the Script Executable

# Open a terminal in the same directory as your script.

# Type chmod +x focus_mode.sh and press Enter.

# Run the Script

# Open a terminal and run ./focus_mode.sh.
