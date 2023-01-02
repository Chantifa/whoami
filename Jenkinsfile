#!groovy

pipeline {
	agent any

		stages {
    		stage("JMeter") {
    			steps {
    			    sh "/home/koksaramona/apache-jmeter-5.5/bin/jmeter.sh -Jjmeter.save.saveservice.output_format=xml -n -t whoami.jmx -l test.jtl"
    			}
    			post {
    			always {

    			}
    			}

        }
    }
}