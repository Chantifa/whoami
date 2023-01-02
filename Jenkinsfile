#!groovy

pipeline {
    agent any

    stages {
        stage("JMeter") {
            steps {
            sh "curl -O https://archive.apache.org/dist/jmeter/binaries/apache-jmeter-5.5.tgz"
            sh "tar -xvf apache-jmeter-5.5.tgz"
            sh "./apache-jmeter-5.5/bin/jmeter.sh -Jjmeter.save.saveservice.output_format=xml -n -t whoami.jmx -l test.jtl"
            }
            post {
                always {
                    perfReport 'test.jtl'

                }
            }

        }

        stage("ZAP") {
        			parallel {
        				stage("ZAP Attack") {

        					steps {
        						bat label: '', script: 'cd C:\\Program Files\\OWASP\\Zed Attack Proxy & java -jar zap-2.7.0.jar -cmd -quickurl http://localhost:3002/songs -quickout C:\\temp\\zaptestresults.xml'
        					}
        				}
        			}
        		}

    }
}