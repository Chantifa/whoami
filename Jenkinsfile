#!groovy

def AGENT_LABEL = null

pipeline {

    agent any

	parameters {
        string(name: 'email',
        defaultValue:'ramona.koksa@students.ffhs.ch',
        description: 'E-Mail address for result')
    }

	stages {
		stage("Build") {

			steps {
				sh "npm ci"
				sh "npm start"
				sh "cd /client"
				sh "npm ci"
				sh "npm start"
			}
		}

		stage("Test") {

        			steps {
        				sh "npm test"
        			}
        			post {
        				always {
        					junit "build/test-results/test/*.xml"
        				}
        				success {
        					notify("Successful", params.email)
        				}
        				failure {
        					notify("Failure", params.email)
        				}
        			}
        		}

		stage('SonarQube analysis') {
			steps {
				script {
					scannerHome = tool 'SonarQube Scanner';
				}
				withSonarQubeEnv('sonarQube') {
					bat "${scannerHome}/bin/sonar-scanner.bat -Dsonar.projectKey=whoami -Dsonar.sources=src -Dsonar.java.source=1.8 -Dsonar.java.binaries=build/classes"
				}
			}
		}

		stage("Quality Gate") {
			options {
				timeout(time: 5, unit: 'MINUTES')
				retry(2)
			}
			steps {
				script  {
					sleep(10)
					def qg = waitForQualityGate()
					if (qg.status != 'OK') {
						error "Pipeline aborted due to quality gate failure: ${qg.status}"
					}
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

