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
        					    sh "curl -Ls https://github.com/zaproxy/zaproxy/releases/download/v2.9.0/ZAP_2.9.0_Linux.tar.gz > /tmp/ZAP_2.9.0_Linux.tar.gz"
        					    sh "cd /tmp tar -zxvf ZAP_2.9.0_Linux.tar.gz"
        					    sh "sudo mv /tmp/ZAP_2.9.0 /opt/"
        					    sh "cd /opt"
        					    sh "bash zap.sh"
        						bat label: '', script: 'cd C:\\Program Files\\OWASP\\Zed Attack Proxy & java -jar zap-2.7.0.jar -cmd -quickurl http://localhost:3002/songs -quickout C:\\temp\\zaptestresults.xml'
        					}
        				}
        			}
        		}

    }
}