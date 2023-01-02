#!groovy

pipeline {
	agent any

		stages {
    		stage("JMeter") {
    			steps {
    			    sh "/home/koksaramona/apache-jmeter-5.5/bin/jmeter.sh -n -t whoami.jmx -l test.jtl"
    			}
    			post {
                 always {
                 junit "target/surefire-reports/*.xml"
                 junit "target/jmeter/results/*.csv"
                 perfReport 'target/jmeter/results/*.csv'
                 }

    	    }

    }
}
