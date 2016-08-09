node {
    stage 'Build'
    deleteDir()
    checkout scm
    sh 'npm install'

    stage 'Test'
    sh 'npm test'
}