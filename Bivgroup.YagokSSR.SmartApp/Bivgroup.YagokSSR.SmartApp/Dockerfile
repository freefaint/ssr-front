FROM docker.repo.severstal.severstalgroup.com/devops-public/corp-images/dotnet/aspnet:6.0.1-ubuntu

ENV TZ=Europe/Moscow \
    ASPNETCORE_URLS=http://+:5000

WORKDIR /app

COPY Bivgroup.YagokSSR.SmartApp/Bivgroup.YagokSSR.SmartApp/bin/Release/net6.0/ .
COPY ./frontend/build/ ./

EXPOSE 5000

CMD ["dotnet", "Bivgroup.YagokSSR.SmartApp.dll"]
