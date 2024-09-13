@Library('svs_jenkins-library@develop') _

withGitlab {
  if (deployEnv == "test") {
node('k8s-slave'){
            stage('build artifacts front'){
                checkoutRepository()
                installTools(tools: TOOLSFront)
                version = gitlabAfter.take(8).toString()
                dir("${WORKSPACE}/frontend"){
                    npmBuildEnv{  
                        sh "npm install --verbose"
                        sh "npm run build --verbose"
                        sh "zip -r web.zip build"
                    }

                }
                stashArtifacts(artifacts: APP_ARTIFACTS_F)
            }
        }
    node('k8s-slave') {
        stage('build artifacts'){
            checkoutRepository()
            installTools(tools: TOOLS)
            version = gitlabAfter.take(8).toString()         
            dir("${WORKSPACE}/Bivgroup.YagokSSR.SmartApp/Bivgroup.YagokSSR.SmartApp")
            {
                dotnetBuildEnv{
                    sh 'dotnet build ${BUILD_OPTS} Bivgroup.YagokSSR.SmartApp.csproj -c Release -o ./build'
                    sh 'dotnet publish ${BUILD_OPTS} Bivgroup.YagokSSR.SmartApp.csproj -c Release -o ./publish'
                    sh "zip -r yagok-ssr-mobile.zip publish"
                }
            }

            stashArtifacts(artifacts: APP_ARTIFACTS)
         
        }
    }
     node('docker-agent'){
        stage('build images'){
            cleanWs()
            checkoutRepository()

            dir("${WORKSPACE}/Bivgroup.YagokSSR.SmartApp/Bivgroup.YagokSSR.SmartApp/artifacts"){
                unstash 'yagok-ssr-mobile'
                sh "unzip *.zip"
                sh "rm -f *.zip"
            }
            //чистим папку static
            sh "rm -rf Bivgroup.YagokSSR.SmartApp/Bivgroup.YagokSSR.SmartApp/smartapp_files/static/*"
            dir("${WORKSPACE}/frontend/artifacts"){             
                unstash 'web'
                //распаковываем файл в путь app/smartapp_files/static
                sh "unzip *.zip -d ${WORKSPACE}/Bivgroup.YagokSSR.SmartApp/Bivgroup.YagokSSR.SmartApp/smartapp_files/static/"

                //копируем содержимое папки build на директорию выше
                sh "cp -r ${WORKSPACE}/Bivgroup.YagokSSR.SmartApp/Bivgroup.YagokSSR.SmartApp/smartapp_files/static/build/. ${WORKSPACE}/Bivgroup.YagokSSR.SmartApp/Bivgroup.YagokSSR.SmartApp/smartapp_files/static/"

                //удаляем папку build
                sh "rm -rf ${WORKSPACE}/Bivgroup.YagokSSR.SmartApp/Bivgroup.YagokSSR.SmartApp/smartapp_files/static/build"
                
                sh "rm -f *.zip"
            }

            dir("${WORKSPACE}/Bivgroup.YagokSSR.SmartApp/Bivgroup.YagokSSR.SmartApp"){ 
                dockerBuildEnv{
                    def appImg = docker.build("${REGISTRY}/${PROJECT_PATH}:${version}", "${env.BUILD_OPTS} .")
                    appImg.push()
                }
            }
        }
    }
}
  node('k8s-slave-min') {
    stage('deploy') {
      checkoutRepository()
      load "kubernetes/env/${deployEnv}/.kubernetesenv"
      deployToKubernetes(type: 'configmap', namespace: "${K8S_NAMESPACE}", credentialsId: "${K8S_CREDENTIALS}", file: 'kubernetes/tmpl/configmap.yml.j2', processType: 'jinja2', kubectlVersion: "${KUBECTL_VERSION}")
      deployToKubernetes(type: 'service', namespace: "${K8S_NAMESPACE}", credentialsId: "${K8S_CREDENTIALS}", file: 'kubernetes/tmpl/service.yml.j2', processType: 'jinja2', kubectlVersion: "${KUBECTL_VERSION}")
      deployToKubernetes(type: 'ingress', namespace: "${K8S_NAMESPACE}", credentialsId: "${K8S_CREDENTIALS}", file: 'kubernetes/tmpl/ingress.yml.j2', processType: 'jinja2', kubectlVersion: "${KUBECTL_VERSION}")
      deployToKubernetes(type: 'deployment', namespace: "${K8S_NAMESPACE}", credentialsId: "${K8S_CREDENTIALS}", file: 'kubernetes/tmpl/deployment.yml.j2', processType: 'jinja2', kubectlVersion: "${KUBECTL_VERSION}")
    }
  }
}
