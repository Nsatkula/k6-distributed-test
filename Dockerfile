# Use the official K6 image for Linux
FROM grafana/k6:latest

# Switch to root to install packages
USER root

# Install Git
RUN apk add --no-cache git

# Switch back to the K6 user
USER k6

# Set the working directory inside the container
WORKDIR /scripts

# Clone the repository containing your K6 script
RUN git clone https://github.com/Nsatkula/k6-distributed-test.git /scripts

# Run the K6 script
CMD ["sh", "-c", "k6 run C:\Users\nitish.satkula\Downloads\K6Scripts"]