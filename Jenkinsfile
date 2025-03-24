pipeline {
    agent { label 'Docker1' } // Replace 'docker-node' with the actual label of your Jenkins agent
    stages {
        stage('Checkout Code') {
            steps {
                echo 'Cloning Git repository...'
                checkout scm
            }
        }
        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                sh 'docker build -t test-image .'
            }
        }
        stage('Run Tests') {
            steps {
                echo 'Running tests...'
                sh 'docker run --rm test-image'
            }
        }
    }
    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check logs for errors.'
        }
    }
}
