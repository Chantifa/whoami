#!groovy

pipeline {
	agent any

		stages {
    		stage("JMeter") {
    			steps {
    			    sh "/home/koksaramona/apache-jmeter-5.5/bin/jmeter.sh -n -t whoami.jmx -l test.jtl"
    			}
    			
        }
    }
}