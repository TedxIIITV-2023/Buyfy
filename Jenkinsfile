pipeline {
    agent any

    // Triggers the pipeline on pull requests
    triggers {
        githubPullRequests()
        githubPush()
    }

    stages {
        stage('Build') {
            steps {
                script {
                    // Add your build commands here
                    sh 'echo hiiii' // Example for a Gradle build
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    // Run unit tests or other types of tests
                    sh './gradlew test' // Example for running tests with Gradle
                }
            }
            post {
                always {
                    junit '**/build/test-results/**/*.xml' 
                }
            }
        }

        stage('Static Analysis') {
            steps {
                script {
                    sh './gradlew check' 
                }
            }
        }
    }

    post {
        success {
            script {
                // Notify GitHub of successful PR build
                githubNotify context: 'Build and Test', status: 'SUCCESS', description: 'Build and Tests passed!'
            }
        }

        failure {
            script {
                githubNotify context: 'Build and Test', status: 'FAILURE', description: 'Build or Tests failed!'
            }
        }
    }
}
