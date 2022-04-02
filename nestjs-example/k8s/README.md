# k8s

k8s 를 위한 스크립트 파일을 저장합니다.

(학습용도로 간단히 실습한 내용입니다.)

### Environment

Docker Desktop 에서는 단일 노드 클러스터 환경을 무료로 제공하고 있습니다.

로컬에서 간단히 실습할 경우에는 이를 이용할 수 있습니다.

### Descriptions

- dev.app.yaml : Nestjs application 입니다.
- dev.mysql.yaml : mysql 입니다.
- dev.mysql-ip.yaml : mysql 을 위한 clusterIp 입니다.
- dev.tem-port.yaml : application 을 위한 nodePort 입니다.
- dev.redis.yaml : redis 입니다.
- dev.redis-ip.yaml : redis 를 위한 clusterIp 입니다.
- dev.config-map.yaml : configMap 입니다.

아래 과정을 통해 k8s 에 배포합니다.

1. Mysql, application 두 개의 deployment 생성합니다.

   - 한 pod 내에 여러 개의 이미지를 띄울 수 있습니다. 이 경우에는 localhost 를 통해 통신하게 됩니다.
     mysql 이미지를 application 과 같은 deployment 에서 실행시킬 경우 clusterIp 를 설정하지 않아도 됩니다.
     (https://coffeewhale.com/k8s/network/2019/04/19/k8s-network-01/)

2. application 에서 mysql 에 접근할 수 있도록 clusterIp 를 생성합니다.

3. 외부에서 application 으로 접근할 수 있도록 NodePort 를 생성합니다.

# RUN

### Settings

1. dockerfile 을 통해 이미지를 생성합니다.

```
docker build -t <docker-hub id>/<image name>:<tag> .

// ex
docker build -t gksrlfw/template:0.0.1 .
```

2. docker hub 에 push 합니다.

```
docker push gksrlfw/template:0.0.1
```

3. dev.app.yaml 에서 image 를 변경합니다.

### Run

아래 명령어를 통해 각 파일을 실행합니다.

```
kubectl apply -f <directory/file name> -n dev
```

## TODO

GCP 서비스를 이용하여 CI/CD 를 구축해봅니다.

(cloud build, cloud registry, compute engine...)
