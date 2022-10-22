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
           sh "${tool("sonarqube")}/bin/sonar-scanner.bat\
            -D"sonar.projectKey=whomai"
            -D"sonar.sources=."
            -D"sonar.host.url=http://127.0.0.1:9000"
            -D"sonar.login=sqp_55dfd657e6101d2c82cdd3da1dd0ba0c89020a3c"
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