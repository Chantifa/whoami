node {
  stages {
   stage("SCM") {
    steps {
     git branch: 'develop', credentialsId: 'glpat-B5KLjMS27SnQhjyaGHyz', url: 'https://git.ffhs.ch/ramona.koksa/whoami.git'
    }
    stage('SonarQube Analysis') {
    def scannerHome = tool 'sonar-scanner';
    withSonarQubeEnv(credentialsId: 'sonarQubetoken') { // If you have configured more than one global server connection, you can specify its name
          bash "${scannerHome}/bin/sonar-scanner"
    }
  }
}
}