#!groovy

pipeline {

    agent any

	parameters {
        string(name: 'email',
        defaultValue:'koksaramona@gmail.com',
        description: 'E-Mail address for result')
    }

    tools {
        nodejs '19.0.1'
    }

	stages {
		stage("Build") {

			steps {
			    sh "npm ci"
			    }
		    }

		stage("Test") {

        			steps {
        			        sh "npm test"
        			}
        			post {
        				success {
        					notify("Successful", params.email)
        				}
        				failure {
        					notify("Failure", params.email)
        				}
        			}
        		}

        stage("JaCoCo") {
            steps {
                echo 'Code Coverage'
                jacoco()
                sh "ls -la"
            }
        }

		stage('SonarQube analysis') {
			steps {
				script {
					scannerHome = tool 'sonar-scanner';
				}
				withSonarQubeEnv(
				        installationName: 'sonar-whoami',
				        credentialsId: 'Sonar') {
                      sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=whoami"
				}
			}
		}

		}
	}


def notify(result, email) {
	emailext (
		subject: "Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
		body: "Result: ${result}",
		recipientProviders: [[$class: 'DevelopersRecipientProvider']],
		to: email
	)
}

