pipeline {
agent any
tools {nodejs "nodenv"}
stages {
 stage("Code Checkout from GitLab") {
  steps {
   git branch: 'develop',
    credentialsId: 'glpat-B5KLjMS27SnQhjyaGHyz',
    url: 'https://git.ffhs.ch/ramona.koksa/whoami.git'
  }
 }
   stage('Code Quality Check via SonarQube') {
   steps {
       script {
       def scannerHome = tool 'sonarqube';
           withSonarQubeEnv("sonarqube-container") {
           sh "${tool("sonarqube")}/bin/sonar-scanner \
           -Dsonar.projectKey=whoami \
           -Dsonar.sources=. \
           -Dsonar.css.node=. \
           -Dsonar.host.url=http://your-ip-here:9000 \
           -Dsonar.login=your-generated-token-from-sonarqube-container"
               }
           }
       }
   }

   stage("Install Project Dependencies") {
   steps {
       nodejs(nodeJSInstallationName: 'nodenv'){
           sh "npm install"
           }
       }
   }
}
}