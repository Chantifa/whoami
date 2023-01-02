#!groovy

pipeline {
	agent any

		stages {
    		stage("JMeter") {
    			steps {
    			    sh "/usr/bin/jmeter -n -t /var/jenkins_home/workspace/whoami/whoami.jmx -l test.jtl"
    			}

    	    }

    }
}
