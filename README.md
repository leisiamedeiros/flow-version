# Flow Version

This react app is able to get and publish a `json flow` to the bucket's chatbot, as well as import resources from one chatbot to another using the [blip platform](https://portal.blip.ai/) and its [commands](https://docs.blip.ai/#commands).

## Backup flow

![flowversion](https://user-images.githubusercontent.com/10652534/122388081-e95fe100-cf45-11eb-9071-c068cf32d06b.gif)

## Import resources

![recursosFlowVersion](https://user-images.githubusercontent.com/10652534/122320605-e094ee00-cef8-11eb-93e3-c607f47da9d3.gif)

## Execute local

In the project directory, you can run:

`npm install && npm start`

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.\
The page will reload if you make edits. You will also see any lint errors in the console.

## Run on Docker

Just execute `docker-compose up -d` on project path or via [docker](https://hub.docker.com/repository/docker/leisiamedeiros/flowversion/general):

```bash
$ docker run --rm -d -p 3000:80/tcp leisiamedeiros/flowversion:tagname
```
