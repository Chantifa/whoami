#!groovy

pipeline {
	agent any

		stages {
    		stage("JMeter") {
    			steps {
    			    sh "curl -O https://archive.apache.org/dist/jmeter/binaries/apache-jmeter-5.5.tgz"
    			    sh "tar -xvf apache-jmeter-5.5.tgz"
    			    sh "cp -rf apache-jmeter-5.5 /usr/bin/jmeter/apache-jmeter-5.5"
    			    sh "/usr/bin/apache-jmeter-5.5 -n -t /var/jenkins_home/workspace/whoami/whoami.jmx -l test.jtl"
    			}

    	    }

    }
}
