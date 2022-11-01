pipeline {
    agent any
    parameters {
        string(name: 'email', description: 'E-Mail address for result')
    }
    tools {nodejs "nodejs"}
    stages {
                stage("Code Checkout from GitLab") {
        steps {
           git branch: 'develop', credentialsId: 'c1557bd4-d8ec-47a9-8d4a-cd76f4e6a8d3', url: 'https://git.ffhs.ch/ramona.koksa/whoami.git'
         }
    }
    stage('npm-build') {
    steps {
        nodejs(nodeJSInstallationName: 'nodejs'){
            sh "npm ci"
            sh "npm start&"
				sh "cd client/"
				sh "npm ci"
				sh "npm start&"
        }}
         post {
            success {
               notify("Successful", params.email)
            }
            failure {
               notify("Failure", params.email)
            }
         }
    }
   stage("Test") {
       steps{
           sh "npm test"
   }
}

 stage('SonarQube analysis') {
             steps {
                      script {
    def scannerHome = tool 'sonar-scanner';
   withSonarQubeEnv(installationName: 'sonar-whoami', credentialsId: 'sonarQube') { // If you have configured more than one global server connection, you can specify its name
      sh "${scannerHome}/bin/sonar-scanner"
   }
    }
  }
       }
        stage("Quality gate") {
            steps {
                waitForQualityGate abortPipeline: true
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