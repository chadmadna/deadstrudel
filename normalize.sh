#!/bin/bash

SOURCE_DIR="$1"

if [ -z "$SOURCE_DIR" ]; then
    echo "Error: Please provide a folder path."
    echo "Usage: ./normalize.sh /path/to/audio"
    exit 1
fi

for file in "$SOURCE_DIR"/*.wav; do
    [ -e "$file" ] || continue

    echo "Analyzing: $(basename "$file")"

    # Pass 1: Measure audio metrics
    analysis=$(ffmpeg -hide_banner -i "$file" -af "loudnorm=I=-16:TP=-3:print_format=json" -f null - 2>&1)
    json_stats=$(echo "$analysis" | awk '/{/{flag=1} flag; /}/{flag=0; print ""; exit}')

    measured_i=$(echo "$json_stats" | grep '"input_i"' | sed -E 's/.*"([^"]+)".*/\1/')
    measured_tp=$(echo "$json_stats" | grep '"input_tp"' | sed -E 's/.*"([^"]+)".*/\1/')
    measured_lra=$(echo "$json_stats" | grep '"input_lra"' | sed -E 's/.*"([^"]+)".*/\1/')
    measured_thresh=$(echo "$json_stats" | grep '"input_thresh"' | sed -E 's/.*"([^"]+)".*/\1/')
    target_offset=$(echo "$json_stats" | grep '"target_offset"' | sed -E 's/.*"([^"]+)".*/\1/')

    dirname=$(dirname "$file")
    filename=$(basename "$file")
    temp_file="$dirname/temp_$filename"

    echo "Normalizing: $filename"

    # Pass 2: Process to a temporary file
    ffmpeg -hide_banner -y -i "$file" -af "loudnorm=I=-16:TP=-3:measured_I=$measured_i:measured_TP=$measured_tp:measured_LRA=$measured_lra:measured_thresh=$measured_thresh:offset=$target_offset:linear=true" -c:a pcm_s16le "$temp_file"

    # Safe replacement block
    if [ $? -eq 0 ] && [ -f "$temp_file" ]; then
        mv "$temp_file" "$file"
        echo "Successfully replaced original file."
    else
        echo "Error processing $filename. Original file preserved."
        rm -f "$temp_file"
    fi
done
