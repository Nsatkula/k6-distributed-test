pipeline {
    agent { label 'docker-node' } // Replace 'docker-node' with your Jenkins node's label

    environment {
        DOCKER_IMAGE = 'test-image' // Name of the Docker image to build and run
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Cloning the Git repository...'
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building the Docker image...'
                sh 'docker build -t ${DOCKER_IMAGE} .'
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Running tests inside the Docker container...'
                sh 'docker run --rm ${DOCKER_IMAGE}'
            }
        }
    }

    post {
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline failed. Please check the logs.'
        }
    }
}pipeline {
    agent { label 'docker-node' } // Replace with your Jenkins node label

    environment {
        DOCKER_IMAGE = 'test-image' // Use the image you built
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Cloning Git repository...'
                checkout scm
            }
        }

        stage('Run Tests in Docker Container') {
            steps {
                echo 'Running tests inside Docker container...'
                sh 'docker run --rm ${DOCKER_IMAGE}'
            }
        }
    }

    post {
        success {
            echo 'Tests executed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check logs for errors.'
        }
    }
}