#!groovy
pipeline {
   node {
           sshagent(['ubuntu-host-root-keys']) {
           sh 'ssh -o StrictHostKeyChecking=no -l chanti 172.31.199.84 uname -a'
           }
   parameters {
        string(name: 'email', description: 'E-Mail address for result')
    }
   stages {
      stage("Build") {

         steps {
            sh "npm ci"
                sh "cd client/"
                sh "npm ci"
                sh "cd .."
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

      node {
        stage('SCM') {
          checkout scm
        }
        stage('SonarQube Analysis') {
          def scannerHome = tool 'sonar-whoami';
          withSonarQubeEnv() {
            sh "${scannerHome}/bin/sonar-scanner"
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

        stage("Test") {
            sh "cd client/"
            sh "npm test"
            sh "cd .."
        }
}

